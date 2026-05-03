"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Search, Navigation } from "lucide-react";
import Link from "next/link";
import AssistantChat from "@/components/AssistantChat";

export default function LocatorPage() {
  const [zipcode, setZipcode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipcode) return;
    
    setIsSearching(true);
    setResults(null);
    
    try {
      const response = await fetch(`/api/locator?zipcode=${encodeURIComponent(zipcode)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching locations:", error);
      // Fallback
      setResults([]);
    } finally {
      setIsSearching(false);
    }
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

      <div className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Search Section */}
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Polling Booth Locator</h1>
          <p className="text-lg text-slate-600 mb-8">
            Enter your Pincode or Locality to find your designated polling booth.
          </p>

          <form onSubmit={handleSearch} className="mb-10">
            <div className="relative">
              <input 
                type="text" 
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter Pincode or Locality..." 
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-blue-500 text-lg shadow-sm pl-14"
              />
              <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
              <button 
                type="submit"
                disabled={isSearching}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-slate-800 text-xl mb-4">Results near {zipcode}</h3>
              {results.map((station, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-blue-900">{station.name}</h4>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {station.wait} wait
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">{station.address}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="text-sm text-slate-500">
                      <span className="block font-medium">Hours: {station.hours}</span>
                      <span className="block">{station.distance}</span>
                    </div>
                    <button className="flex items-center text-blue-600 font-medium hover:text-blue-800">
                      <Navigation className="w-4 h-4 mr-1" /> Directions
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Interactive Map Visual (Simulated) */}
        <div className="bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner min-h-[400px] flex items-center justify-center">
          {/* We simulate a map using a styled div */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30"></div>
          
          {isSearching ? (
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-16 h-16 bg-blue-500 rounded-full opacity-50 flex items-center justify-center"
            >
              <Search className="w-8 h-8 text-white" />
            </motion.div>
          ) : results ? (
            <div className="relative w-full h-full">
              {/* Map Pins */}
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute top-1/3 left-1/4">
                <MapPin className="w-10 h-10 text-rose-500 drop-shadow-md" fill="#f43f5e" />
              </motion.div>
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-1/2 left-2/3">
                <MapPin className="w-10 h-10 text-rose-500 drop-shadow-md" fill="#f43f5e" />
              </motion.div>
            </div>
          ) : (
            <div className="text-slate-500 font-medium text-lg z-10 bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm">
              Enter zip code to load map
            </div>
          )}
        </div>
      </div>
      
      <AssistantChat />
    </main>
  );
}

// Inline Icon component since we need it in the results
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
