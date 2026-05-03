"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import AssistantChat from "@/components/AssistantChat";
import { useUser } from "@/context/UserContext";

const steps = [
  { id: 1, title: "Eligibility", description: "Are you eligible to vote?" },
  { id: 2, title: "Registration", description: "Get registered in your state." },
  { id: 3, title: "Documents", description: "Prepare your ID and docs." },
  { id: 4, title: "Vote", description: "Cast your ballot!" },
];

export default function JourneyPage() {
  const { profile, updateProfile } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const completed = profile.journeyProgress || [];

  const handleNext = () => {
    if (!completed.includes(currentStep)) {
      updateProfile({ journeyProgress: [...completed, currentStep] });
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    
    // If transitioning to the last step (success screen)
    if (currentStep === steps.length - 1) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#1d4ed8', '#0ea5e9', '#10b981']
        });
      }, 300);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Eligibility Checklist</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                <span>I am an Indian citizen.</span>
              </label>
              <label className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                <span>I will be at least 18 years old by the qualifying date.</span>
              </label>
              <label className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                <span>I am an ordinary resident of the polling area.</span>
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Voter Registration (Form 6)</h3>
            <p className="text-slate-600">You must register your name in the Electoral Roll. You can do this online through the Voter Service Portal (voters.eci.gov.in) by filling out Form 6.</p>
            <div className="p-6 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
              <p className="font-semibold mb-2">Registration Deadline: Differs by phase</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Visit Voter Service Portal
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Required Documents for Voting</h3>
            <p className="text-slate-600">To cast your vote at the polling booth, you need your Voter Slip and an approved Photo ID.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl border-emerald-200 bg-emerald-50">
                <h4 className="font-bold text-emerald-800 mb-2">Primary ID (Recommended)</h4>
                <ul className="list-disc pl-5 text-emerald-700 space-y-1">
                  <li>Voter ID Card (EPIC)</li>
                </ul>
              </div>
              <div className="p-4 border rounded-xl border-amber-200 bg-amber-50">
                <h4 className="font-bold text-amber-800 mb-2">Alternative IDs</h4>
                <ul className="list-disc pl-5 text-amber-700 space-y-1">
                  <li>Aadhaar Card</li>
                  <li>PAN Card</li>
                  <li>Driving License</li>
                  <li>Indian Passport</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold">You're Ready to Vote!</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              You have completed all the necessary preparation steps. Verify your name in the electoral roll, find your polling booth, and make your voice heard!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="flex items-center text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Your Voting Journey</h1>
        
        {/* Progress Tracker */}
        <div className="flex flex-col md:flex-row justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 hidden md:block rounded-full transform -translate-y-1/2"></div>
          {steps.map((step) => {
            const isCompleted = completed.includes(step.id);
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center mb-4 md:mb-0 relative bg-slate-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                  isCompleted ? "bg-emerald-500 text-white" :
                  isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-slate-200 text-slate-500"
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : step.id}
                </div>
                <span className={`font-semibold ${isCurrent ? "text-slate-900" : "text-slate-500"}`}>{step.title}</span>
              </div>
            );
          })}
        </div>

        {/* Step Content Area */}
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col justify-between"
        >
          <div className="flex-1">
            {renderStepContent()}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <p className="text-slate-500 text-sm">Step {currentStep} of {steps.length}</p>
            {currentStep < steps.length ? (
              <button 
                onClick={handleNext}
                className="flex items-center bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <Link href="/" className="flex items-center bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                Finish Journey <CheckCircle2 className="w-5 h-5 ml-2" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <AssistantChat />
    </main>
  );
}
