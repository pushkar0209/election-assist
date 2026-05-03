"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";
import AssistantChat from "@/components/AssistantChat";

const faqs = [
  {
    question: "Do I need to re-register if I moved recently?",
    answer: "Yes. You must update your voter registration (Form 8) with your new address to ensure your name appears on the electoral roll at your new polling booth."
  },
  {
    question: "What is an EVM and VVPAT?",
    answer: "An Electronic Voting Machine (EVM) is used to record your vote securely. VVPAT (Voter Verifiable Paper Audit Trail) is a printer attached to the EVM that prints a slip showing the symbol and candidate you voted for, allowing you to verify your vote for 7 seconds."
  },
  {
    question: "Can I bring my phone into the voting booth?",
    answer: "No. Mobile phones, smartwatches, and cameras are strictly prohibited inside the polling booth to maintain the secrecy of your vote."
  },
  {
    question: "What does the NOTA button mean?",
    answer: "NOTA stands for 'None Of The Above'. It is the last button on the EVM. You can press it if you do not wish to vote for any of the candidates listed."
  },
  {
    question: "What if my name is not on the voter list but I have my EPIC?",
    answer: "If your name is missing from the official Electoral Roll at the polling station, you cannot vote, even if you hold a valid Voter ID (EPIC). Always verify your name on the list before Election Day."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 flex-1 w-full">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600 mb-8">
          Clear answers to common voting misconceptions. If you don't see your question here, ask the AI assistant!
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-blue-300 shadow-md ring-1 ring-blue-100" : "border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <h3 className={`font-bold text-lg pr-8 ${isOpen ? "text-blue-900" : "text-slate-800"}`}>
                    {faq.question}
                  </h3>
                  <div className={`p-2 rounded-full flex-shrink-0 ${isOpen ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <div 
                  className={`px-6 pb-5 text-slate-600 leading-relaxed transition-all duration-300 ${
                    isOpen ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <AssistantChat />
    </main>
  );
}
