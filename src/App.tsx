import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Programme from "./components/Programme";
import Rewards from "./components/Rewards";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleNewRegistration = () => {
    // Increment tracker to trigger reload in Dashboard counter and state
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600/20 selection:text-indigo-900 font-sans overflow-x-hidden">
      {/* Decorative master vertical grid line styled in the margin */}
      <div className="absolute top-0 left-10 bottom-0 w-[1px] bg-slate-200/60 pointer-events-none hidden md:block animate-fade-in"></div>
      
      {/* Top ambient dust and stars wrapper */}
      <div className="relative">
        <Navbar />
        <Hero />
      </div>

      {/* Organizer description banner / marquee ticker */}
      <Ticker />

      {/* Timeline schedules of the tournament */}
      <Programme />

      {/* Rewards Grid */}
      <Rewards />

      {/* Interactive registrations list & analytics stats dashboard */}
      <Dashboard refreshTrigger={refreshTrigger} />

      {/* Standard Swiss styled registration form */}
      <RegistrationForm onNewRegistration={handleNewRegistration} />

      {/* Footer and addresses details */}
      <ContactSection />
    </div>
  );
}
