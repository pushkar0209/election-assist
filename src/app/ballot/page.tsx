"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import AssistantChat from "@/components/AssistantChat";

// Mock data for sample ballot based on state
const mockBallots: Record<string, any> = {
  "Maharashtra": {
    electionName: "2029 Lok Sabha Elections",
    measures: [
      { id: "prop1", title: "Local Infrastructure Bill", description: "Bonds for public school infrastructure and technology upgrades.", category: "Education" },
      { id: "prop2", title: "Renewable Energy Act", description: "Increases funding for renewable energy initiatives state-wide.", category: "Environment" }
    ],
    races: [
      { office: "Member of Parliament (Lok Sabha)", candidates: ["Candidate A (Incumbent)", "Candidate B", "Candidate C"] },
      { office: "Member of Legislative Assembly (Vidhan Sabha)", candidates: ["Candidate X", "Candidate Y"] }
    ]
  },
  "Uttar Pradesh": {
    electionName: "2029 Lok Sabha Elections",
    measures: [
      { id: "propA", title: "Agricultural Subsidies", description: "Authorizes the state to increase subsidies for farmers.", category: "Agriculture" }
    ],
    races: [
      { office: "Member of Parliament (Lok Sabha)", candidates: ["Candidate D", "Candidate E"] },
      { office: "Member of Legislative Assembly (Vidhan Sabha)", candidates: ["Candidate F", "Candidate G"] }
    ]
  },
  "Delhi": {
    electionName: "2029 Lok Sabha Elections",
    measures: [
      { id: "prop1", title: "Clean Air Initiative", description: "Funding to protect clean water and air rights in the state.", category: "Environment" }
    ],
    races: [
      { office: "Member of Parliament (Lok Sabha)", candidates: ["Candidate H", "Candidate I"] },
      { office: "Member of Legislative Assembly (Vidhan Sabha)", candidates: ["Candidate J", "Candidate K"] }
    ]
  }
};

const defaultBallot = {
  electionName: "2029 Lok Sabha Elections",
  measures: [
    { id: "m1", title: "Measure 1", description: "Local infrastructure funding for highway repair.", category: "Infrastructure" }
  ],
  races: [
    { office: "Local Mayor", candidates: ["Candidate 1", "Candidate 2"] }
  ]
};

export default function BallotPage() {
  const { profile } = useUser();
  const [selections, setSelections] = useState<Record<string, string>>({});
  
  const ballotData = mockBallots[profile.stateLocation] || defaultBallot;

  const toggleSelection = (categoryId: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === value ? "" : value
    }));
  };

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
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">Your Sample Ballot</h1>
            <p className="text-lg text-slate-600 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Viewing ballot for {profile.stateLocation} • {ballotData.electionName}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 flex items-start shadow-sm">
          <Info className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
          <p className="text-blue-900 text-sm leading-relaxed">
            <strong>This is an educational sample ballot.</strong> You cannot cast an official vote online. 
            Use this tool to research the measures and candidates on your local ballot before Election Day. 
            Selections made here are saved privately to your browser so you can refer to them at the voting booth.
          </p>
        </div>

        <div className="space-y-10">
          {/* Candidates Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-slate-200">Offices & Candidates</h2>
            <div className="space-y-6">
              {ballotData.races.map((race: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">{race.office}</h3>
                  <div className="space-y-3">
                    {race.candidates.map((candidate: string, cIdx: number) => {
                      const isSelected = selections[race.office] === candidate;
                      return (
                        <button
                          key={cIdx}
                          onClick={() => toggleSelection(race.office, candidate)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                            isSelected 
                              ? "bg-blue-50 border-blue-500 text-blue-900" 
                              : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <span className="font-medium">{candidate}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Measures / Propositions Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-slate-200">State Measures & Propositions</h2>
            <div className="space-y-6">
              {ballotData.measures.map((measure: any) => (
                <div key={measure.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{measure.title}</h3>
                    <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                      {measure.category}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-6 text-sm">{measure.description}</p>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleSelection(measure.id, "Yes")}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                        selections[measure.id] === "Yes"
                          ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                          : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      Vote YES
                    </button>
                    <button
                      onClick={() => toggleSelection(measure.id, "No")}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                        selections[measure.id] === "No"
                          ? "bg-rose-50 border-rose-500 text-rose-700"
                          : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      Vote NO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
      
      <AssistantChat />
    </main>
  );
}
