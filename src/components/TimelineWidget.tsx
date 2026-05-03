"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Circle, Clock } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function TimelineWidget() {
  const { profile } = useUser();
  
  // Calculate days until Next General Elections (approx May 2029)
  const electionDate = new Date('2029-05-15T00:00:00');
  const today = new Date();
  const timeDiff = electionDate.getTime() - today.getTime();
  const daysUntilElection = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Download .ics calendar file
  const downloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ElectoGuide AI//EN
BEGIN:VEVENT
UID:election2029@electoguide.ai
DTSTAMP:20290101T000000Z
DTSTART;VALUE=DATE:20290515
DTEND;VALUE=DATE:20290516
SUMMARY:Lok Sabha Election Day 2029
DESCRIPTION:Remember to vote today! Don't forget to bring your Voter ID (EPIC) or Aadhaar Card.
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'lok_sabha_election.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic events based on user location state
  const events = [
    { id: 1, title: "Voter Roll Update Commences", date: "January 1, 2029", status: "completed" },
    { id: 2, title: `Form 6 Deadline (${profile.stateLocation})`, date: "March 30, 2029", status: "upcoming" },
    { id: 3, title: "Polling Booths Announced", date: "April 15, 2029", status: "upcoming" },
    { id: 4, title: "Lok Sabha Election Phase", date: "May 15, 2029", status: "upcoming", highlight: true },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 w-full flex flex-col h-full">
      {/* Countdown Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white mb-8 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-300 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Countdown
          </h3>
          <span className="text-xs bg-slate-700 px-2 py-1 rounded-md text-slate-300">{profile.stateLocation}</span>
        </div>
        <div className="flex items-end space-x-2">
          <span className="text-5xl font-extrabold tracking-tighter">{daysUntilElection > 0 ? daysUntilElection : 0}</span>
          <span className="text-xl font-medium text-slate-400 mb-1">Days</span>
        </div>
        <p className="text-sm text-slate-300 mt-2">Until Lok Sabha Election (May 15, 2029)</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Your Election Timeline</h3>
        </div>
        <button 
          onClick={downloadCalendar}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition-colors border border-slate-200 shadow-sm"
        >
          + Add to Calendar
        </button>
      </div>
      
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-6 flex-1">
        {events.map((event, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={event.id} 
            className="relative pl-6"
          >
            {event.status === "completed" ? (
              <CheckCircle2 className="absolute -left-[13px] top-1 w-6 h-6 text-emerald-500 bg-white" />
            ) : event.highlight ? (
              <Circle className="absolute -left-[13px] top-1 w-6 h-6 text-blue-600 fill-blue-100 bg-white" />
            ) : (
              <Circle className="absolute -left-[13px] top-1 w-6 h-6 text-slate-300 bg-white" />
            )}
            
            <div>
              <p className={`text-sm font-medium ${event.highlight ? 'text-blue-600' : 'text-slate-500'}`}>
                {event.date}
              </p>
              <p className={`text-base font-semibold ${event.highlight ? 'text-slate-900' : 'text-slate-700'}`}>
                {event.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
