"use client";

import TimelineWidget from "@/components/TimelineWidget";
import AssistantChat from "@/components/AssistantChat";
import ActionCards from "@/components/ActionCards";
import { Flag, ShieldCheck, HelpCircle, Settings, Target, Download, Globe } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Main entry point for the ElectoGuide AI Dashboard
// Production-ready for Vercel deployment
export default function Home() {
  const { profile } = useUser();
  const journeyProgress = profile.journeyProgress || [];
  const progressPercent = Math.round((journeyProgress.length / 4) * 100);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-blue-600 to-indigo-800 -z-10 rounded-b-[40px] opacity-90 shadow-xl" />
      
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 flex-1 w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 text-white gap-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">ElectoGuide</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6 text-sm font-medium items-center">
              <li className="cursor-pointer transition-colors border-b-2 border-white pb-1">Home</li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors pb-1">
                <Link href="/journey">My Journey</Link>
              </li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors pb-1">
                <Link href="/ballot">My Ballot</Link>
              </li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors pb-1">
                <Link href="/vault">Documents</Link>
              </li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors pb-1">
                <Link href="/locator">Locator</Link>
              </li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors pb-1">
                <Link href="/quiz">Take Quiz</Link>
              </li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors pb-1">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors flex items-center space-x-2">
                <button title="Change Language" className="p-2 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <Globe className="w-4 h-4" />
                </button>
                <Link href="/settings" title="Settings" className="p-2 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <Settings className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Welcome back, {profile.name}! 👋
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl">
              Let's get you ready for Election Day in <span className="font-bold text-white">{profile.stateLocation}</span>. Here is your personalized civic dashboard with everything you need to know.
            </p>
          </div>
          <div className="mt-6 md:mt-0 whitespace-nowrap">
            <Link href="/quiz" className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 mr-2" /> Test Your Knowledge
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Progress Tracking Dashboard */}
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-0 border-none">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Your Voting Journey</h3>
                    <p className="text-sm text-slate-500">Track your path to Election Day</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{progressPercent}%</span>
                  <p className="text-xs text-slate-500 font-medium">COMPLETED</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-600">
                    {progressPercent === 100 
                      ? "You are fully prepared to vote! 🎉" 
                      : `You have completed ${journeyProgress.length} out of 4 essential steps.`}
                  </p>
                  <Link href="/journey">
                    <Button variant="outline" size="sm">
                      {progressPercent === 100 ? "Review Journey" : "Continue Journey"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <ActionCards />
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col gap-4 items-start h-full">
                <CardContent className="w-full flex flex-col h-full">
                  <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 inline-flex mb-4 w-fit">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">First Time Voter Guide</h3>
                  <p className="text-slate-600 mb-6 text-sm flex-1">
                    Voting for the first time? We have broken down the process into simple, easy-to-follow steps.
                  </p>
                  <div className="flex flex-col space-y-3 w-full mt-auto">
                    <Link href="/journey" className="w-full">
                      <Button variant="secondary" className="w-full">Start the Guide</Button>
                    </Link>
                    <Button variant="outline" className="w-full text-slate-600" leftIcon={<Download className="w-4 h-4" />}>
                      Download PDF Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl shadow-md text-white flex flex-col justify-between h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Are you ready to vote?</h3>
                  <p className="text-blue-100 mb-6 text-sm">
                    Take our quick, interactive quiz to test your civic knowledge and learn important voting facts!
                  </p>
                </div>
                <Link href="/quiz" className="w-full">
                  <Button variant="outline" className="w-full bg-white text-blue-700 border-transparent hover:bg-blue-50 hover:border-transparent">
                    Start Quiz Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <TimelineWidget />
          </div>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2029 ElectoGuide AI. An educational, non-partisan initiative.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

      <AssistantChat />
    </main>
  );
}
