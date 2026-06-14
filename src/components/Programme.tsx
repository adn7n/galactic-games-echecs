import programmeData from "../content/programme.json";
import React, { useState } from "react";
import { Clock, Info, ShieldAlert, Award, Coffee } from "lucide-react";

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  details: string[];
}

const PROGRAMME_ITEMS: TimelineItem[] = programmeData.items;
const UNUSED = [
  {
    id: "p1",
    time: "9h00",
    title: "Accueil",
    description: "Confirmation des présences et enregistrement des participants",
    details: [
      "Émargement obligatoire des inscrits",
      "Remise du pass d'accès galactic et du pack cadeau d'accueil",
      "Vérification finale des niveaux et affectation des tables",
      "Boisson chaude et viennoiseries de bienvenue offertes"
    ]
  },
  {
    id: "p2",
    time: "10h00",
    title: "Début du tournoi",
    description: "Ouverture officielle et début des rondes",
    details: [
      "Discours d'inauguration par le président du Club d'Échecs de Nyon",
      "Système Suisse en 7 rondes cadencées",
      "Contrôle du temps : 10 minutes + 5 secondes par coup",
      "Pause déjeuner libre entre la ronde 3 et 4 (12h30 - 13h30)"
    ]
  },
  {
    id: "p3",
    time: "17h00",
    title: "Remise des prix",
    description: "Cérémonie de remise des récompenses aux vainqueurs",
    details: [
      "Classement officiel par points et critères de départage (Buchholz)",
      "Attribution des grands prix galactiques (PS5, Switch 2, Drones, FC27)",
      "Remise du lot universel pour chaque joueur restant",
      "Apéritif de clôture et photo officielle"
    ]
  }
];

export default function Programme() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="programme" className="py-24 relative border-t border-slate-200/80 bg-slate-50">
      {/* Tiny background ambient gradient */}
      <div className="absolute top-1/2 left-10 w-[200px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Monospace Category Tag */}
        <p className="font-mono text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-3">
          // Programme
        </p>

        {/* Section Title */}
        <h2 className="font-serif italic text-4xl sm:text-5xl font-light text-slate-950 mb-12 tracking-tight">
          Déroulement de la journée
        </h2>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PROGRAMME_ITEMS.map((item) => {
            const isExpanded = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(isExpanded ? null : item.id)}
                className={`relative p-8 rounded-xl cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between ${
                  isExpanded
                    ? "bg-indigo-50/50 border-indigo-200 shadow-xs scale-[1.01]"
                    : "bg-white border-slate-200/80 hover:border-slate-350 hover:bg-slate-50 shadow-xs"
                }`}
              >
                <div>
                  {/* Event Time */}
                  <div className="font-serif italic text-4xl font-bold text-indigo-650 mb-6 font-mono">
                    {item.time}
                  </div>

                  {/* Event Title */}
                  <h3 className="font-sans text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    {item.title}
                    <Info className={`w-4.5 h-4.5 text-slate-400 transition-colors duration-200 ${isExpanded ? "text-indigo-600" : "group-hover:text-slate-500"}`} />
                  </h3>

                  {/* Event Muted Desc */}
                  <p className="text-slate-500 text-xs leading-relaxed font-sans mb-4 font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Technical details revealed on click */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-slate-200/85 space-y-2.5">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-2 text-[11px] text-slate-600 font-sans leading-relaxed">
                        <span className="text-indigo-600 select-none">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile action callout instruction */}
                <div className="mt-4 flex items-center justify-end">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors font-semibold">
                    {isExpanded ? "Réduire ↑" : "Détails ronds · cliquer"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info panel on system */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 ml-1 rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-space">
                Cadence de jeu Homologuée FSE
              </h4>
              <p className="text-[11px] text-slate-500 font-medium font-sans mt-0.5">
                {programmeData.cadenceDescription}
              </p>
            </div>
          </div>
          <div className="text-[11px] font-mono py-1.5 px-3 rounded bg-slate-50 text-slate-600 border border-slate-200/80 self-stretch sm:self-auto flex items-center justify-center font-bold">
            {programmeData.cadence}
          </div>
        </div>
      </div>
    </section>
  );
}
