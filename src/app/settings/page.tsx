"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { profile, updateProfile } = useUser();
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success("Profile settings saved successfully!");
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
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">Personalization Settings</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">State / Location</label>
              <select 
                value={formData.stateLocation}
                onChange={(e) => setFormData({ ...formData, stateLocation: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <p className="text-xs text-slate-500 mt-2">Your location helps us provide accurate voting deadlines and rules.</p>
            </div>

              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                <input 
                  type="checkbox" 
                  id="firstTime"
                  checked={formData.isFirstTimeVoter}
                  onChange={(e) => setFormData({ ...formData, isFirstTimeVoter: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="firstTime" className="text-sm font-medium text-slate-800">
                  I am a first-time voter
                </label>
              </div>

              <h3 className="text-lg font-bold text-slate-800 pt-6 pb-2 border-b border-slate-100">Accessibility Preferences</h3>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-2">
                <div>
                  <label htmlFor="highContrast" className="text-sm font-medium text-slate-800 block">High Contrast Mode</label>
                  <span className="text-xs text-slate-500">Increases color saturation and contrast for better visibility.</span>
                </div>
                <input 
                  type="checkbox" 
                  id="highContrast"
                  checked={formData.highContrast}
                  onChange={(e) => setFormData({ ...formData, highContrast: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                <div>
                  <label htmlFor="largeText" className="text-sm font-medium text-slate-800 block">Large Text</label>
                  <span className="text-xs text-slate-500">Increases the global font size of the application.</span>
                </div>
                <input 
                  type="checkbox" 
                  id="largeText"
                  checked={formData.largeText}
                  onChange={(e) => setFormData({ ...formData, largeText: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </div>

            <div className="pt-4 flex items-center space-x-4">
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center shadow-md"
              >
                <Save className="w-5 h-5 mr-2" /> Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
