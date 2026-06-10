import React, { useState, useEffect } from "react";
import { Users, Search, Award, TrendingUp, Filter, Sparkles, RefreshCw, Layers, Download } from "lucide-react";
import { loadRegistrations, INITIAL_CAPACITY, AGE_CATEGORIES, isGoogleSheetsConfigured, fetchGoogleSheetsRegistrations } from "../utils/registrationData";
import { Registration } from "../types";

export default function Dashboard({ refreshTrigger }: { refreshTrigger: number }) {
  const [players, setPlayers] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const googleSheetsActive = isGoogleSheetsConfigured();

  const exportToCSV = () => {
    // Generate CSV content with UTF-8 BOM for accurate accent displays in French Excel
    const headers = ["ID", "N° Ticket", "Prénom", "Nom", "E-mail", "Téléphone", "Catégorie d'Âge", "Date d'Inscription"];
    const rows = players.map(p => [
      p.id,
      p.ticketNumber,
      p.firstName,
      p.lastName,
      p.email,
      p.phone,
      p.level,
      p.createdAt
    ]);
    
    const csvContent = "\uFEFF" + [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
      
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tournoi_galactic_games_participants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadAllPlayers = async () => {
    setLoading(true);
    // Try to fetch from google sheet first if configured
    if (googleSheetsActive) {
      const livePlayers = await fetchGoogleSheetsRegistrations();
      if (livePlayers) {
        setPlayers(livePlayers);
        setLoading(false);
        return;
      }
    }
    // Fallback to local storage
    setPlayers(loadRegistrations());
    setLoading(false);
  };

  useEffect(() => {
    loadAllPlayers();
  }, [refreshTrigger]);

  // Filter players
  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      player.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = levelFilter === "All" || player.level === levelFilter;

    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalRoster = players.length;
  const spotsLeft = INITIAL_CAPACITY - totalRoster;

  const levelCounts = players.reduce((acc, current) => {
    acc[current.level] = (acc[current.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Compute category details for younger/older divisions
  const enfantsCount = players.filter(p => p.level.includes("U6") || p.level.includes("U8") || p.level.includes("U10")).length;
  const adosCount = players.filter(p => p.level.includes("U12") || p.level.includes("U14") || p.level.includes("U18")).length;

  const levelLabels = AGE_CATEGORIES;

  return (
    <section id="dashboard" className="py-24 relative border-t border-slate-200/80 bg-slate-50">
      {/* Subtle chess background watermark */}
      <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)", backgroundSize: "30x 30px", backgroundPosition: "0 0, 0 15px, 15px -15px, -15px 0" }}></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            {/* Tag info with live indicator */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-indigo-600 text-xs font-semibold tracking-widest uppercase">
                // Suivi Live
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] text-indigo-700 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Mise à jour en temps réel
              </div>
            </div>
            {/* Main title */}
            <h2 className="font-serif italic text-4xl sm:text-5xl font-light text-slate-950 tracking-tight">
              Liste des inscrits ({totalRoster})
            </h2>
          </div>
          <div className="text-left md:text-right max-w-md flex flex-col justify-end items-start md:items-end gap-2">
            <p className="text-xs text-slate-500 font-sans leading-relaxed font-medium">
              Consultez les inscrits du tournoi junior en temps réel. La limite de capacité est strictement fixée à <strong>{INITIAL_CAPACITY} participants</strong>.
            </p>
            <div className="flex gap-4 items-center flex-wrap pt-1 justify-start md:justify-end">
              <button
                onClick={() => loadAllPlayers()}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold hover:text-indigo-800 transition-colors pointer-events-auto cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                Rafraîchir la liste
              </button>
            </div>
          </div>
        </div>

        {/* Live Overview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Total Patients */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="text-left">
              <span className="block text-[10px] font-sans text-slate-400 uppercase tracking-widest font-bold mb-1">
                Joueurs enregistrés
              </span>
              <strong className="text-3xl font-mono text-slate-800 font-bold">
                {totalRoster} / {INITIAL_CAPACITY}
              </strong>
            </div>
            <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Places libres */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="text-left">
              <span className="block text-[10px] font-sans text-slate-400 uppercase tracking-widest font-bold mb-1">
                Places encore disponibles
              </span>
              <strong className={`text-3xl font-mono font-bold ${spotsLeft <= 0 ? "text-rose-600" : "text-indigo-650"}`}>
                {spotsLeft <= 0 ? "Fermé (Complet)" : `${spotsLeft} Places`}
              </strong>
            </div>
            <div className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 ${spotsLeft <= 0 ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-teal-50 border-teal-100 text-teal-600"}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Jeunes & Enfants audience focus */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="text-left">
              <span className="block text-[10px] font-sans text-slate-400 uppercase tracking-widest font-bold mb-1">
                Cadets (U12 à U18)
              </span>
              <strong className="text-3xl font-mono text-slate-800 font-bold">
                {adosCount}
              </strong>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Level Distribution Bar Chart Grid */}
        <div className="p-6 rounded-xl bg-white border border-slate-200/80 mb-8 text-left shadow-2xs">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-space mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Nombre d'inscrits par catégorie d'âge
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {levelLabels.map((lbl) => {
              const count = levelCounts[lbl] || 0;
              const percent = totalRoster > 0 ? (count / totalRoster) * 100 : 0;
              return (
                <div key={lbl} className="space-y-2 p-3.5 rounded-lg bg-slate-50 border border-slate-150">
                  <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-sans">
                    <span className="text-slate-700 font-bold truncate">{lbl.split(" : ")[0]}</span>
                    <span className="text-slate-800 font-mono font-bold">{count} {count > 1 ? 'joueurs' : 'joueur'}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(percent, totalRoster > 0 ? 5 : 0)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



        {/* Table & Filtering */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          {/* Controls bar */}
          <div className="p-6 border-b border-slate-200/80 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
            {/* Custom Search bar */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Rechercher un participant, e-mail..."
                className="w-full bg-slate-50 text-slate-800 text-xs py-2.5 pl-10 pr-4 rounded-lg border border-slate-250 hover:border-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 font-sans font-medium transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                className="bg-slate-50 text-slate-800 text-xs py-2.5 pl-4 pr-10 rounded-lg border border-slate-250 hover:border-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 cursor-pointer appearance-none shrink-0 font-sans font-medium transition-colors select-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")", backgroundPosition: "right 10px center", backgroundRepeat: "no-repeat", backgroundSize: "16px" }}
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="All">Toutes les catégories</option>
                {levelLabels.map((lbl) => (
                  <option key={lbl} value={lbl}>
                    {lbl.split(" : ")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50 text-[10px] font-mono uppercase tracking-widest text-slate-400 select-none">
                  <th className="py-4 px-6 font-bold">Ticket ID</th>
                  <th className="py-4 px-6 font-bold">Joueur</th>
                  <th className="py-4 px-6 font-bold">Groupe d'âge</th>
                  <th className="py-4 px-6 text-right font-bold">Enregistré le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <tr
                      key={player.id}
                      className="hover:bg-slate-50 transition-colors duration-150 text-slate-650"
                    >
                      {/* Ticket tag */}
                      <td className="py-4 px-6 font-mono text-indigo-650 font-bold">
                        {player.ticketNumber}
                      </td>

                      {/* Name & contact */}
                      <td className="py-4 px-6 text-left">
                        <div className="font-space font-bold text-slate-800 text-sm">
                          {player.firstName} {player.lastName}
                        </div>
                        <div className="text-[10px] text-slate-450 mt-0.5 max-w-xs truncate font-sans">
                          {player.email}
                        </div>
                      </td>

                      {/* Age group badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold font-sans border ${
                            player.level.includes("U18")
                              ? "bg-amber-50 border-amber-200 text-amber-800"
                              : player.level.includes("U14")
                              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                              : player.level.includes("U12")
                              ? "bg-blue-50 border-blue-200 text-blue-800"
                              : "bg-emerald-50 border-emerald-200 text-emerald-800"
                          }`}
                        >
                          {player.level.split(" : ")[0]}
                        </span>
                      </td>

                      {/* Register stamp */}
                      <td className="py-4 px-6 text-right text-slate-400 font-mono text-[10px]">
                        {new Date(player.createdAt).toLocaleDateString("fr-CH", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 px-6 text-center text-slate-400 font-sans font-medium">
                      Aucun participant inscrit trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
