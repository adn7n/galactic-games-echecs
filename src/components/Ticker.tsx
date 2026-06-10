import content from "../content/home.json";
import React from "react";

export default function Ticker() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Organisateur Badge */}
        <div className="inline-block mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-xs font-mono font-semibold text-indigo-650 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            {content.club}
          </div>
        </div>

        {/* Ticker Row */}
        <div className="relative w-full overflow-hidden flex items-center justify-center py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
            <span className="font-serif italic text-2xl md:text-3xl text-slate-400/80 hover:text-slate-800 transition-colors duration-300">
              Nyon
            </span>
            <span className="text-indigo-200 font-serif text-2xl md:text-3xl">&bull;</span>
            <span className="font-serif italic text-2xl md:text-3xl text-slate-400/80 hover:text-slate-800 transition-colors duration-300">
              Galactic
            </span>
            <span className="text-indigo-200 font-serif text-2xl md:text-3xl">&bull;</span>
            <span className="font-serif italic text-2xl md:text-3xl text-indigo-550 hover:text-indigo-700 transition-colors duration-300 animate-pulse-glow">
              Games
            </span>
            <span className="text-indigo-200 font-serif text-2xl md:text-3xl">&bull;</span>
            <span className="font-serif italic text-2xl md:text-3xl text-slate-400/80 hover:text-slate-800 transition-colors duration-300 font-mono">
              2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
