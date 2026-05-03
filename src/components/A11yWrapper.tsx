"use client";

import { useUser } from "@/context/UserContext";

export default function A11yWrapper({ children }: { children: React.ReactNode }) {
  const { profile } = useUser();
  
  return (
    <div className={`
      flex-1 flex flex-col
      ${profile.highContrast ? "contrast-150 saturate-200" : ""}
      ${profile.largeText ? "text-lg md:text-xl" : ""}
    `}>
      {children}
    </div>
  );
}
