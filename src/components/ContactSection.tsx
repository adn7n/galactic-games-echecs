import React from "react";
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative py-20 bg-slate-100 border-t border-slate-200/80 overflow-hidden">
      {/* Footer Glow spheres */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Col 1: Brand & Org */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center bg-slate-200">
                <span className="font-serif italic text-base font-bold text-slate-800">G</span>
              </div>
              <span className="font-space text-xs tracking-wider uppercase text-slate-800 font-bold">
                Galactic Games
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm font-sans pt-2 font-medium">
              L'arène suprême des passionnés d'échecs de la Côte. Rejoignez-nous pour une journée mémorable mêlant compétition tactique intense et festivités galactiques.
            </p>
          </div>

          {/* Col 2: Info & Contact details */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-space">
              Contact & Support
            </h4>
            <div className="space-y-3 font-sans text-xs text-slate-500 font-medium">
              <a
                href="mailto:spiderpawn.academy@gmail.com"
                className="flex items-center gap-3.5 hover:text-indigo-600 transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>spiderpawn.academy@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 3: Useful Links / Partners */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-space">
              Liens utiles
            </h4>
            <div className="space-y-2.5 font-sans text-xs text-slate-500 font-medium">
              <a
                href="https://www.swisschess.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors duration-200"
              >
                Fédération Suisse des Échecs
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Homologué FSE & Rulebook officiel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright message */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase text-left font-semibold">
            &copy; {currentYear} Club d'Échecs de Nyon. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-[10px] text-slate-400 font-mono tracking-widest uppercase font-semibold">
            <span className="hover:text-indigo-600 cursor-pointer">Règlement</span>
            <span className="hover:text-indigo-600 cursor-pointer">Mentions Légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
