"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UploadCloud, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import AssistantChat from "@/components/AssistantChat";
import toast from "react-hot-toast";

export default function VaultPage() {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const simulateUpload = (docType: string) => {
    setIsUploading(docType);
    setTimeout(() => {
      setUploadedDocs([...uploadedDocs, docType]);
      setIsUploading(null);
      toast.success(docType === 'id' ? "Photo ID secured!" : "Proof of Residency secured!");
    }, 1500);
  };

  const isComplete = uploadedDocs.includes("epic") && uploadedDocs.includes("aadhaar");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Document Vault</h1>
        <p className="text-lg text-slate-600 mb-8">
          Securely organize the documents you need for Registration and Election Day.
        </p>

        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center shadow-sm"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mr-4" />
            <div>
              <h3 className="text-lg font-bold text-emerald-900">You are fully prepared!</h3>
              <p className="text-emerald-700">All necessary documents are gathered. You are ready to vote.</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Photo ID */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                <FileText className="w-8 h-8" />
              </div>
              {uploadedDocs.includes("epic") ? (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> Missing
                </span>
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Voter ID (EPIC)</h3>
            <p className="text-slate-600 mb-6 flex-1 text-sm">
              Required for in-person voting. Upload a clear photo of your Electoral Photo Identity Card.
            </p>

            <button 
              disabled={uploadedDocs.includes("epic") || isUploading === "epic"}
              onClick={() => simulateUpload("epic")}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${
                uploadedDocs.includes("epic") 
                  ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-200 cursor-default"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
              }`}
            >
              {uploadedDocs.includes("epic") ? (
                "Document Secured"
              ) : isUploading === "epic" ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <><UploadCloud className="w-5 h-5 mr-2" /> Mark as Gathered</>
              )}
            </button>
          </div>

          {/* Proof of Residency */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                <FileText className="w-8 h-8" />
              </div>
              {uploadedDocs.includes("aadhaar") ? (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> Missing
                </span>
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Aadhaar Card</h3>
            <p className="text-slate-600 mb-6 flex-1 text-sm">
              Upload your Aadhaar as an alternative ID or proof of residence.
            </p>

            <button 
              disabled={uploadedDocs.includes("aadhaar") || isUploading === "aadhaar"}
              onClick={() => simulateUpload("aadhaar")}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${
                uploadedDocs.includes("aadhaar") 
                  ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-200 cursor-default"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
              }`}
            >
              {uploadedDocs.includes("aadhaar") ? (
                "Document Secured"
              ) : isUploading === "aadhaar" ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <><UploadCloud className="w-5 h-5 mr-2" /> Mark as Gathered</>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <AssistantChat />
    </main>
  );
}
