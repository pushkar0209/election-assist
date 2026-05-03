"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type UserProfile = {
  name: string;
  stateLocation: string;
  isFirstTimeVoter: boolean;
  highContrast: boolean;
  largeText: boolean;
  journeyProgress: number[];
};

type UserContextType = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
};

const defaultProfile: UserProfile = {
  name: "Arjun",
  stateLocation: "Maharashtra",
  isFirstTimeVoter: true,
  highContrast: false,
  largeText: false,
  journeyProgress: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage if available
    const saved = localStorage.getItem("electoguide_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse profile");
      }
    }
    setIsLoaded(true);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem("electoguide_profile", JSON.stringify(newProfile));
  };

  // Prevent hydration mismatch
  if (!isLoaded) return <div className="min-h-screen bg-slate-50" />;

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
