"use client";

import { motion } from "framer-motion";
import { UserCheck, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "./ui/Card";

const actions = [
  {
    title: "Check Eligibility",
    description: "Find out if you are eligible to vote in the upcoming election.",
    icon: UserCheck,
    color: "bg-teal-50 text-teal-600 border-teal-100",
    href: "/journey",
  },
  {
    title: "Voter Registration (Form 6)",
    description: "Start your voter registration process online via the ECI portal.",
    icon: FileText,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/journey",
  },
  {
    title: "Find Polling Booth",
    description: "Locate your nearest designated voting booth and get directions.",
    icon: MapPin,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/locator",
  }
];

export default function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link href={action.href} key={index} className="block h-full">
            <Card hoverable className="h-full flex flex-col items-start border border-slate-100">
              <div className="p-6">
                <div className={`p-3 rounded-xl mb-4 inline-block ${action.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{action.title}</h3>
                <p className="text-slate-500 text-sm">{action.description}</p>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
