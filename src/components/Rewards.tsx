import React, { useState } from "react";
import { Gamepad2, Shuffle, Zap, Trophy, Award, Gift, ChevronRight, Layers } from "lucide-react";
import rewardsData from "../content/rewards.json";

interface PrizeItem {
  id: string;
  name: string;
  availability: string;
  description: string;
  icon: React.ElementType;
  specs: string[];
  color: string;
}

const iconMap: Record<string, React.ElementType> = { ps5: Gamepad2, switch2: Layers, drones: Zap, fc27: Trophy };
const colorMap: Record<string, string> = { ps5: "from-blue-50/50 to-white", switch2: "from-rose-50/50 to-white", drones: "from-emerald-50/50 to-white", fc27: "from-amber-50/50 to-white" };
const PRIZE_ITEMS: PrizeItem[] = rewardsData.prizes.map(p => ({ ...p, icon: iconMap[p.id], color: colorMap[p.id] }));
const UNUSED = [
  {
    id: "ps5",
    name: "PS5 Slim",
    availability: "x2 disponibles",
    description: "Pour les grands gagnants",
    icon: Gamepad2,
    specs: ["Édition Standard Châssis D", "1 To SSD Ultra-rapide", "Vient avec 2 manettes DualSense", "Inclus 3 mois de PS Plus extra"],
    color: "from-blue-50/50 to-white"
  },
  {
    id: "switch2",
    name: "Nintendo Switch 2",
    availability: "x2 disponibles",
    description: "La nouvelle console portable",
    icon: Layers,
    specs: ["Nouvel Écran OLED 8 pouces", "Support natif DLSS Nvidia", "Mémoire interne doublée à 128 Go", "Inclus le jeu de lancement"],
    color: "from-rose-50/50 to-white"
  },
  {
    id: "drones",
    name: "Drones GPS",
    availability: "x10 disponibles",
    description: "Explorez les cieux",
    icon: Zap,
    specs: ["Caméra 4K stabilisée 3 axes", "Portée de transmission de 4 km", "Autonomie de vol de 31 minutes", "Retour automatique intelligent au point de départ"],
    color: "from-emerald-50/50 to-white"
  },
  {
    id: "fc27",
    name: "FC27",
    availability: "x10 disponibles",
    description: "Le jeu de foot incontournable",
    icon: Trophy,
    specs: ["Nouveau moteur HyperMotion V", "Mode carrière retravaillé", "Compatible PS5 / Xbox / PC", "Édition Standard Physique"],
    color: "from-amber-50/50 to-white"
  }
];

export default function Rewards() {
  const [activePrize, setActivePrize] = useState<string | null>(null);

  return (
    <section id="prix" className="py-24 relative border-t border-slate-200/80 bg-slate-50">
      {/* Dynamic ambient background glow */}
      <div className="absolute right-10 bottom-1/4 w-[350px] h-[350px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Monospace Category Tag */}
        <p className="font-mono text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-3">
          // Récompenses
        </p>

        {/* Section Title */}
        <h2 className="font-serif italic text-4xl sm:text-5xl font-light text-slate-950 mb-12 tracking-tight">
          Des prix exceptionnels
        </h2>

        {/* Prize Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PRIZE_ITEMS.map((prize) => {
            const IconComponent = prize.icon;
            const isSelected = activePrize === prize.id;
            
            return (
              <div
                key={prize.id}
                onMouseEnter={() => setActivePrize(prize.id)}
                onMouseLeave={() => setActivePrize(null)}
                className={`relative p-8 rounded-xl bg-white border transition-all duration-300 bg-gradient-to-b ${prize.color} ${
                  isSelected
                    ? "border-indigo-300 -translate-y-1 shadow-md shadow-indigo-600/5"
                    : "border-slate-200/85 shadow-2xs"
                } text-left flex flex-col justify-between`}
              >
                <div>
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide bg-slate-100 text-slate-600 border border-slate-200/60">
                      {prize.availability}
                    </span>
                    <IconComponent className={`w-6 h-6 transition-transform duration-300 ${isSelected ? "text-indigo-600 rotate-6" : "text-slate-400"}`} />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-sans text-xl font-bold text-slate-800 mb-2 tracking-tight">
                    {prize.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-sans leading-relaxed mb-6 font-medium">
                    {prize.description}
                  </p>
                </div>

                {/* Specs section (dynamic reveal on hover) */}
                <div className={`mt-4 pt-4 border-t border-slate-200/85 space-y-1.5 transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-80"}`}>
                  {prize.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center text-[10px] text-slate-600 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Universal participant award block */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto transition-all duration-300 hover:border-indigo-200 text-left shadow-2xs">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/10 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-space flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Prix pour tous les participants
            </h4>
            <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed font-medium">
              Chez Galactic Games, aucun joueur ne part les mains vides. Chaque joueur repart avec un cadeau exclusif du tournoi (incluant l'insigne d'honneur, un carnet tactique, et d'autres goodies), quels que soient ses résultats physiques dans le classement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
