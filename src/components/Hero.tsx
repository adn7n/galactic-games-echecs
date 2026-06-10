import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, MapPin, Trophy, ChevronRight } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: Sunday, November 15, 2026 at 10:00:00 AM Europe/Zurich (UTC+1 in Nov)
    const targetDate = new Date("2026-11-15T10:00:00+01:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToRegistration = () => {
    const element = document.getElementById("inscription");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden star-bg w-full"
    >
      {/* Decorative colored glow spheres in background (Professional Polish theme) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-slate-300/40 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Chess Pieces in Background (Suited for kids and teens) */}
      <div className="absolute left-6 md:left-20 top-24 w-12 h-12 sm:w-20 sm:h-20 text-indigo-600/5 select-none pointer-events-none animate-[bounce_6s_infinite] rotate-12">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12.6,5.8c.8,.4 1.4,1.2 1.4,2.2a2,2 0 0,1-1.4,1.9v2.1h2.4C16.1,12 17,12.9 17,14v2h-10v-2c0-1.1 .9-2 2-2h2.4v-2.1A2,2 0 0,1 10,8a2,2 0 0,1 1.4-2.2A2,2 0 0,1 12,2M17,17v2h-10v-2h10M19,20v2H5V20H19Z" />
        </svg>
      </div>

      <div className="absolute right-6 md:right-24 top-40 w-16 h-16 sm:w-24 sm:h-24 text-indigo-600/5 select-none pointer-events-none animate-[pulse_4s_infinite] -rotate-12">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M19,22H5V20H19V22M13,2H11C9.9,2 9,2.9 9,4C9,4.4 9.1,4.7 9.4,5H6C4.9,5 4,5.9 4,7C4,10.5 5.5,13.5 8,15.5V18H16V14.5C18.5,12.5 20,9.5 20,7C20,5.9 19.1,5 18,5H14.6C14.9,4.7 15,4.4 15,4C15,2.9 14.1,2 13,2Z" />
        </svg>
      </div>

      <div className="absolute left-10 md:left-32 bottom-20 w-12 h-12 sm:w-20 sm:h-20 text-indigo-600/5 select-none pointer-events-none animate-[pulse_5s_infinite] rotate-45">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M5,2H7V5H9V2H11V5H13V2H15V5H17V2H19V8H5V2M5,9H19V11H5V9M5,12h14v2h-1.5c-0.8 0-1.5 0.7-1.5 1.5V18H7v-2.5C7 14.7 6.3 14 5.5 14H5V12m14,8v2H5V20H19Z" />
        </svg>
      </div>

      <div className="absolute right-10 md:right-36 bottom-16 w-16 h-16 sm:w-24 sm:h-24 text-indigo-600/5 select-none pointer-events-none animate-[bounce_7s_infinite] -rotate-45">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M18,3.5c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5S15.7,2,16.5,2S18,2.7,18,3.5 M8,3.5C8,4.3,7.3,5,6.5,5S5,4.3,5,3.5 S5.7,2,6.5,2S8,2.7,8,3.5 M12.5,2C11.7,2,11,2.7,11,3.5S11.7,5,12.5,5S14,4.3,14,3.5S13.3,2,12.5,2 M16.5,6 c-0.5,0-1,0.2-1.3,0.5L13,5.1V9h-1V5.1l-2.2,1.4C9.5,6.2,9,6,8.5,6C7.3,6,6.3,6.8,6,7.9l-1.8,6.8C4.1,15,4,15.2,4,15.5 C4,16.9,5.1,18,6.5,18h12c1.4,0,2.5-1.1,2.5-2.5c0-0.3-0.1-0.5-0.2-0.8L19,7.9C18.7,6.8,17.7,6,16.5,6 M19,19v1H5v-1H19 M19,21v1H5 v-1H19Z" />
        </svg>
      </div>

      {/* Subtle chessboard checker pattern background accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 opacity-[0.012] pointer-events-none hidden lg:block" style={{ backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)", backgroundSize: "30px 30px", backgroundPosition: "0 0, 0 15px, 15px -15px, -15px 0" }}></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 opacity-[0.012] pointer-events-none hidden lg:block" style={{ backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)", backgroundSize: "30px 30px", backgroundPosition: "0 0, 0 15px, 15px -15px, -15px 0" }}></div>

      <div className="w-full max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center justify-center">
        {/* Badge Header: Nouveau - Tournoi... */}
        <div className="inline-flex items-center justify-center p-1 px-4 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md mb-8 hover:border-slate-300 transition-all duration-300 shadow-xs max-w-full">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-indigo-650 text-white shrink-0">
              Nouveau
            </span>
            <span className="text-[10px] sm:text-[11px] font-space tracking-wide text-slate-600 flex flex-wrap items-center justify-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Tournoi d'Échecs</span>
              <span className="text-slate-300">&bull;</span>
              <span>Dimanche 15 novembre 2026</span>
              <span className="text-slate-300">&bull;</span>
              <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Nyon</span>
            </span>
          </div>
        </div>

        {/* Big Light Premium Title */}
        <div className="mb-6 flex flex-col items-center justify-center select-none w-full text-center">
          <h1 className="font-serif italic text-6xl sm:text-7xl md:text-8xl font-light tracking-tight text-slate-800 leading-[0.9] text-glow text-center w-full">
            Galactic
          </h1>
          <h1 className="font-serif italic text-6xl sm:text-7xl md:text-8xl font-light tracking-tight text-slate-800 leading-[0.9] mb-4 text-glow text-center w-full">
            Games
          </h1>
        </div>

        {/* Paragraph description */}
        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed mb-10 font-sans tracking-wide text-center">
          Affrontez les meilleurs joueurs de la région dans un tournoi épique. Des
          récompenses exceptionnelles attendent les champions — et tous les
          participants repartent avec un prix. Le tournoi réunit professionnels et amateurs passionnés.
        </p>

        {/* Primary CTA and Subtext */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 w-full">
          <button
            onClick={scrollToRegistration}
            className="group px-8 py-3.5 bg-indigo-600 text-white font-space text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20 relative overflow-hidden h-12 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Réserver ma place <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          
          <div className="flex items-center justify-center gap-2 font-space text-xs text-slate-500 tracking-wider font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>CHF 30.-</span>
            <span className="text-slate-300">&bull;</span>
            <span>Places limitées</span>
          </div>
        </div>

        {/* Countdown Overlay with stellar borders */}
        <div className="w-full max-w-lg mx-auto mb-16 rounded-xl">
          <div className="bg-white border border-slate-200/80 shadow-xs rounded-xl p-4.5 flex justify-around items-center">
            <div className="text-center flex flex-col items-center">
              <div className="font-serif italic text-2xl sm:text-3xl text-slate-800 font-bold font-mono">{timeLeft.days}</div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-slate-400 font-semibold mt-1">Jours</div>
            </div>
            <div className="text-slate-300 font-light text-xl sm:text-2xl select-none">:</div>
            <div className="text-center flex flex-col items-center">
              <div className="font-serif italic text-2xl sm:text-3xl text-slate-800 font-bold font-mono">{timeLeft.hours}</div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-slate-400 font-semibold mt-1">Heures</div>
            </div>
            <div className="text-slate-300 font-light text-xl sm:text-2xl select-none">:</div>
            <div className="text-center flex flex-col items-center">
              <div className="font-serif italic text-2xl sm:text-3xl text-slate-800 font-bold font-mono">{timeLeft.minutes}</div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-slate-400 font-semibold mt-1">Minutes</div>
            </div>
            <div className="text-slate-300 font-light text-xl sm:text-2xl select-none">:</div>
            <div className="text-center relative flex flex-col items-center">
              <div className="font-serif italic text-2xl sm:text-3xl text-indigo-600 font-bold w-10 font-mono text-center">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-indigo-400 font-semibold mt-1">Secs</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xl mx-auto">
          {/* Stat 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs text-center transition-all duration-300 hover:border-indigo-100 flex flex-col items-center justify-center">
            <h3 className="font-serif italic text-4xl font-bold text-slate-800 mb-2 text-center w-full">
              10h00
            </h3>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold font-mono text-center">
              Début du tournoi
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs text-center transition-all duration-300 hover:border-indigo-100 flex flex-col items-center justify-center">
            <h3 className="font-serif italic text-4xl font-bold text-slate-800 mb-2 text-center w-full">
              24+
            </h3>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold font-mono text-center">
              Prix à gagner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
