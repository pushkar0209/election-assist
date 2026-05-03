import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
// Make sure to add GEMINI_API_KEY to your .env.local file
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Define the system instructions for the model
const SYSTEM_PROMPT = `
You are ElectoGuide AI, a helpful, friendly, and strictly non-partisan civic assistant. 
Your ONLY goal is to educate users on the process of voting and civic participation in India.

CRITICAL RULES:
1. NEVER express a political opinion, endorse a candidate, or discuss political parties like BJP, Congress, AAP, etc.
2. If asked about a specific candidate or party, politely redirect the user to the Election Commission of India (ECI) official resources.
3. Keep answers simple, concise, and easy to understand for an 8th-grade reading level.
4. Base all factual information (dates, rules, Form 6, EPIC, Aadhaar) on the Election Commission of India guidelines.
5. Adopt a supportive, encouraging tone. Welcome first-time voters warmly.
6. Keep your responses under 3 paragraphs. Use bullet points for readability when listing items.
`;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    // Check if API key is configured
    if (!apiKey) {
      return NextResponse.json({ 
        role: 'assistant', 
        content: "I'm currently running in demo mode without my Gemini API key. Please add your `GEMINI_API_KEY` to the `.env.local` file to activate my AI brain!" 
      });
    }

    // Dynamic System Prompt based on user context
    let dynamicPrompt = SYSTEM_PROMPT;
    if (context) {
      dynamicPrompt += `\n\nUSER CONTEXT:\n- Name: ${context.name}\n- Location (State): ${context.stateLocation}\n- First Time Voter: ${context.isFirstTimeVoter ? 'Yes' : 'No'}\n\nTailor your advice specifically to the laws of their state if relevant.`;
    }

    // Format previous messages for Gemini Chat History
    // Gemini requires the history to start with a 'user' message, so we filter out
    // any 'model' messages that occur before the first 'user' message.
    let historyMessages = messages.slice(0, -1);
    
    // Find first user message index
    const firstUserIdx = historyMessages.findIndex((msg: any) => msg.role === 'user');
    
    if (firstUserIdx !== -1) {
      historyMessages = historyMessages.slice(firstUserIdx);
    } else {
      // If there are no user messages in history, start empty
      historyMessages = [];
    }

    const history = historyMessages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Ensure the history starts with our system prompt injected into the first user message
    // This makes it compatible with gemini-pro which doesn't support the systemInstruction param
    const injectedHistory = [
      {
        role: "user",
        parts: [{ text: "SYSTEM INSTRUCTION (Read and acknowledge but do not reply to this specifically):\n" + dynamicPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will strictly act as ElectoGuide AI following the Indian Election Commission rules." }]
      },
      ...history
    ];

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
    });

    // Start chat session with history
    const chat = model.startChat({
      history: injectedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.3, // Low temperature for more factual/consistent answers
      },
    });

    const lastMessage = messages[messages.length - 1]?.content || "";

    // Send the user's message to Gemini
    const result = await chat.sendMessage(lastMessage);
    const aiResponse = result.response.text();

    return NextResponse.json({ 
      role: 'assistant', 
      content: aiResponse 
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: 'Failed to process request with Gemini API' },
      { status: 500 }
    );
  }
}
