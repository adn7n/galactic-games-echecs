import React, { useState, useEffect } from "react";
import { Menu, X, Trophy } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo "G" in elegant circle */}
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-2.5 cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-md border border-slate-200 bg-white shadow-xs flex items-center justify-center transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-50/30">
            <span className="font-serif italic text-xl font-bold tracking-tight text-slate-800 group-hover:text-indigo-600">
              G
            </span>
          </div>
          <span className="font-space text-sm tracking-wider uppercase text-slate-800 font-bold group-hover:text-indigo-600 transition-colors duration-200">
            Galactic
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollToSection("home")}
            className="px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium"
          >
            Accueil
          </button>
          <button
            onClick={() => scrollToSection("programme")}
            className="px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium"
          >
            Programme
          </button>
          <button
            onClick={() => scrollToSection("prix")}
            className="px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium"
          >
            Prix
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium"
          >
            Contact
          </button>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("inscription")}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm shadow-indigo-600/10"
          >
            S'inscrire &rarr;
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-600 hover:text-indigo-600 p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-200 py-6 px-8 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-md">
          <button
            onClick={() => scrollToSection("home")}
            className="text-left py-2 text-base text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium border-b border-slate-100"
          >
            Accueil
          </button>
          <button
            onClick={() => scrollToSection("programme")}
            className="text-left py-2 text-base text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium border-b border-slate-100"
          >
            Programme
          </button>
          <button
            onClick={() => scrollToSection("prix")}
            className="text-left py-2 text-base text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium border-b border-slate-100"
          >
            Prix
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-left py-2 text-base text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer font-sans font-medium border-b border-slate-100"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("inscription")}
            className="mt-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 cursor-pointer shadow-sm"
          >
            S'inscrire &rarr;
          </button>
        </div>
      )}
    </nav>
  );
}
