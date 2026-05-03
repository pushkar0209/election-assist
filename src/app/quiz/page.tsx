"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import AssistantChat from "@/components/AssistantChat";

const questions = [
  {
    id: 1,
    question: "What is the minimum voting age in India?",
    options: [
      "21 years old",
      "16 years old",
      "18 years old",
      "25 years old"
    ],
    answer: 2,
    explanation: "Under the 61st Amendment Act of 1988, the voting age in India was lowered from 21 to 18 years."
  },
  {
    id: 2,
    question: "Which of the following machines is used to cast votes in Indian elections?",
    options: ["ATM", "EVM", "VVPAT", "Both EVM and VVPAT"],
    answer: 3,
    explanation: "Votes are cast on an Electronic Voting Machine (EVM), and a VVPAT (Voter Verifiable Paper Audit Trail) is attached to verify that your vote went to the correct candidate."
  },
  {
    id: 3,
    question: "Which document is primarily required to vote at the polling booth?",
    options: [
      "Aadhar Card only",
      "Voter ID (EPIC)",
      "Ration Card",
      "Birth Certificate"
    ],
    answer: 1,
    explanation: "While other IDs might be accepted as alternatives, the Electoral Photo Identity Card (EPIC) is the primary document issued by the ECI for voting."
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1d4ed8', '#0ea5e9', '#f59e0b', '#10b981']
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Civic Knowledge Quiz</h1>
          <p className="text-lg text-slate-600">Are you ready for Election Day? Let's test your knowledge!</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-12"
              >
                <div className="mb-8">
                  <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 block">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-800 leading-snug">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === questions[currentQuestion].answer;
                    const isSelected = selectedOption === index;
                    
                    let buttonClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300";
                    
                    if (isAnswered) {
                      if (isCorrect) buttonClass = "bg-emerald-50 border-emerald-500 text-emerald-800";
                      else if (isSelected && !isCorrect) buttonClass = "bg-rose-50 border-rose-500 text-rose-800";
                      else buttonClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectOption(index)}
                        disabled={isAnswered}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-medium text-lg flex items-center justify-between ${buttonClass}`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl"
                  >
                    <p className="text-blue-800 font-medium">
                      <span className="font-bold">Fact:</span> {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}

                {isAnswered && (
                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={handleNext}
                      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md"
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-6">
                  <Trophy className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Quiz Completed!</h2>
                <p className="text-xl text-slate-600 mb-8">
                  You scored <span className="font-bold text-slate-900">{score}</span> out of <span className="font-bold text-slate-900">{questions.length}</span>.
                </p>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={resetQuiz}
                    className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Try Again
                  </button>
                  <Link href="/journey" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">
                    Start Voting Journey
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <AssistantChat />
    </main>
  );
}
