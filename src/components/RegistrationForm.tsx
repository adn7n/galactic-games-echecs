import content from "../content/home.json";
import React, { useState, useEffect } from "react";
import { User, Mail, Phone, BarChart2, CheckCircle2, Ticket, ArrowLeft, Loader2, Receipt, Send, Sparkles, Copy, Check } from "lucide-react";
import { saveRegistration, loadRegistrations, INITIAL_CAPACITY, AGE_CATEGORIES } from "../utils/registrationData";
import { Registration } from "../types";

export default function RegistrationForm({ onNewRegistration }: { onNewRegistration: () => void }) {
  // Loading status
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<Registration | null>(null);

  // Copy status
  const [copiedIBAN, setCopiedIBAN] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText("${content.iban}");
    setCopiedIBAN(true);
    setTimeout(() => setCopiedIBAN(false), 2000);
  };

  const handleCopyAllPayments = (ticketNum: string, playerFirstName: string, playerLastName: string) => {
    const text = `Bénéficiaire : CCP Cercle d’Echecs de Nyon\nAdresse : ${content.ibanAdresse}\nIBAN : ${content.iban}\nMotif de versement : ${playerFirstName} ${playerLastName} - Numéro de joueur: ${ticketNum}\nMontant : CHF 30.00`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  useEffect(() => {
    setRegistrations(loadRegistrations());
  }, [successTicket]);

  const totalRegistered = registrations.length;
  const spotsLeft = INITIAL_CAPACITY - totalRegistered;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "Le prénom est requis.";
    if (!lastName.trim()) newErrors.lastName = "Le nom est requis.";
    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Adresse e-mail incomplète ou incorrecte.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    } else if (!/^[+0-9\s]{8,18}$/.test(phone)) {
      newErrors.phone = "Numéro de téléphone invalide.";
    }
    if (!level) newErrors.level = "Veuillez choisir une catégorie d'âge.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (spotsLeft <= 0) return;

    setIsSubmitting(true);

    // Simulate short network delay
    setTimeout(async () => {
      try {
        const savedDoc = await saveRegistration({
          firstName,
          lastName,
          email,
          phone,
          level
        });

        // Clear states
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setLevel("");
        setErrors({});
        setIsSubmitting(false);

        // Save to success ticket
        setSuccessTicket(savedDoc);
        // Reload parent states
        onNewRegistration();
        // Reload local spots counter
        setRegistrations(loadRegistrations());
      } catch (err) {
        console.error("Error submitting registration:", err);
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <section id="inscription" className="py-24 relative bg-slate-50 border-t border-slate-200/85">
      {/* Subtle chess grid pattern watermark background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "radial-gradient(#1e1b4b 1px, transparent 1px), radial-gradient(#1e1b4b 1px, transparent 1px)", backgroundSize: "40px 40px", backgroundPosition: "0 0, 20px 20px" }}></div>

      {/* Decorative large faint chess knight icon background */}
      <div className="absolute -left-12 bottom-12 w-64 h-64 text-slate-800/5 select-none pointer-events-none">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M19,22H5V20H19V22M13,2H11C9.9,2 9,2.9 9,4C9,4.4 9.1,4.7 9.4,5H6C4.9,5 4,5.9 4,7C4,10.5 5.5,13.5 8,15.5V18H16V14.5C18.5,12.5 20,9.5 20,7C20,5.9 19.1,5 18,5H14.6C14.9,4.7 15,4.4 15,4C15,2.9 14.1,2 13,2M13.5,13V15H10.5V13H13.5M15.5,9V11H8.5V9H15.5M17.5,7V8H6.5V7H17.5Z" />
        </svg>
      </div>

      <div className="max-w-xl mx-auto px-6 z-10 relative">
        {/* Category Header */}
        <p className="font-mono text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-3 text-center">
          // Inscription
        </p>

        {/* Section title */}
        <h2 className="font-serif italic text-4xl sm:text-5xl font-light text-slate-950 mb-3 tracking-tight text-center">
          Réserve ta place
        </h2>

        {/* Subtitle */}
        <p className="text-slate-500 text-xs sm:text-sm font-sans mb-10 text-center leading-relaxed font-medium">
          Frais d'inscription : <span className="text-slate-800 font-bold">CHF 30.-</span> &bull; ${content.date} &bull; Nyon
        </p>

        {/* Capacity Indicator Banner */}
        <div className="mb-8 p-4 rounded-xl bg-white border border-slate-200/85 shadow-2xs flex items-center justify-between text-left">
          <div className="space-y-1">
            <h5 className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest">
              Capacité du tournoi
            </h5>
            <p className="text-xs text-slate-600 font-sans font-medium">
              <span className="text-slate-800 font-bold font-mono">{totalRegistered}</span> d'inscrits sur <span className="text-slate-800 font-bold font-mono">{INITIAL_CAPACITY}</span> joueurs max
            </p>
          </div>
          <div className="text-right">
            {spotsLeft > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {spotsLeft} places dispo
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold uppercase tracking-wider">
                COMPLET
              </span>
            )}
          </div>
        </div>

        {/* Big form or sold out screen or success invoice representation */}
        {successTicket ? (
          /* Success Ticket & Invoice Layout - Clean & without QR code */
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {/* Visual confirmation badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-space text-slate-900">Place Réservée !</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Un e-mail contenant votre facture vous a été envoyé.</p>
            </div>

            {/* Email send toast simulated alert */}
            <div className="mb-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-150 text-indigo-900 flex items-center gap-3 text-left">
              <div className="p-2 rounded-lg bg-indigo-600 text-white animate-pulse">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider">Facture envoyée</h5>
                <p className="text-[11px] text-indigo-750 font-medium leading-relaxed mt-0.5">
                  La facture d'un montant de <strong>CHF 30.-</strong> a été transmise à l'adresse <strong>{successTicket.email}</strong>.
                </p>
              </div>
            </div>

            {/* Custom Galactic Invoice Box */}
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden mb-8 text-left">
              {/* Ticket Top Color Header banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-850 py-5 px-6 relative flex justify-between items-center text-white">
                <div>
                  <h4 className="font-serif italic text-lg tracking-wide font-bold">Galactic Games ${content.year}</h4>
                  <p className="text-[9px] font-mono tracking-widest uppercase text-indigo-150 font-bold">Reçu & Facture d'Adhésion</p>
                </div>
                <Receipt className="w-7 h-7 text-white/35 shrink-0" />
              </div>

              {/* Invoice Fields Detail */}
              <div className="p-6 md:p-8 space-y-6 relative bg-white">
                {/* Dotted border tear line */}
                <div className="absolute top-0 left-0 right-0 flex justify-between px-4 -translate-y-0.5">
                  <div className="w-4 h-4 rounded-full bg-slate-50 border-b border-l border-slate-200 -translate-x-6"></div>
                  <div className="w-full border-t border-dashed border-slate-200/80 my-2"></div>
                  <div className="w-4 h-4 rounded-full bg-slate-50 border-b border-r border-slate-200 translate-x-6"></div>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[9px] font-sans uppercase tracking-widest text-slate-400 font-bold">Participant</span>
                    <strong className="text-sm font-space text-slate-800 font-bold">{successTicket.firstName} {successTicket.lastName}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] font-sans uppercase tracking-widest text-indigo-600 font-bold">Numéro de joueur</span>
                    <strong className="text-sm font-mono text-indigo-650 font-bold">{successTicket.ticketNumber}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[9px] font-sans uppercase tracking-widest text-slate-400 font-bold">Catégorie d'Âge</span>
                    <strong className="text-xs font-sans text-slate-700 font-bold">{successTicket.level}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] font-sans uppercase tracking-widest text-slate-400 font-bold">Date de l'édition</span>
                    <strong className="text-xs font-sans text-slate-700 font-bold">${content.dateShort}</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider font-space mb-3 flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-indigo-500" />
                    Détail de la Facturation
                  </h4>
                  <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-4 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>Inscription individuelle (Tournoi)</span>
                      <span>CHF 30.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>Cadeau participant & goodies</span>
                      <span className="text-emerald-600 font-bold">Offert (CHF 0.00)</span>
                    </div>
                    <div className="border-t border-slate-200 my-2 pt-2 flex justify-between font-bold text-slate-800 text-sm">
                      <span>Total à régler :</span>
                      <span className="text-indigo-650">CHF 30.00</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-150 pt-5 space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Modalités de règlement</h5>
                  
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 text-xs space-y-2.5 text-slate-700 relative overflow-hidden">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-950">CCP Cercle d’Echecs de Nyon</p>
                      <p className="text-slate-600 font-medium text-[11px]">${content.ibanAdresse}</p>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-100 flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Identifiant IBAN</span>
                        <p className="font-mono text-xs text-indigo-900 font-bold select-all tracking-wide">
                          ${content.iban}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyIBAN}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${
                          copiedIBAN
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-white hover:bg-slate-50 text-indigo-600 border-indigo-200 hover:border-indigo-300"
                        }`}
                      >
                        {copiedIBAN ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier l'IBAN</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Complete copy section for paper-paste convenience */}
                  <div className="flex flex-col gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left">
                    <p className="font-bold text-slate-800 text-[11px] leading-snug">
                      👉 Gagnez du temps pour votre virement e-banking :
                    </p>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Vous pouvez copier toutes les informations de facturation (bénéficiaire, adresse, IBAN, montant et motif) en un seul clic !
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyAllPayments(successTicket.ticketNumber, successTicket.firstName, successTicket.lastName)}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg border shadow-3xs cursor-pointer transition-all duration-200 mt-1 ${
                        copiedAll
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-2xs border-indigo-600"
                      }`}
                    >
                      {copiedAll ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Toutes les infos ont été copiées !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copier toutes les infos en un clic</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1">
                    <p className="text-[10px] text-amber-900 font-bold">⚠️ Très important pour le motif :</p>
                    <p className="text-[10.5px] text-slate-650 leading-relaxed font-sans">
                      Indiquez votre prénom complet ou le numéro de joueur <strong className="text-indigo-650 font-bold font-mono">"{successTicket.ticketNumber}"</strong> comme motif lors de votre versement pour associer facilement votre paiement. Votre inscription sera définitivement validée à réception du versement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to form action */}
            <button
              onClick={() => setSuccessTicket(null)}
              className="px-6 py-2.5 rounded-full hover:bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-800 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              S'inscrire à nouveau
            </button>
          </div>
        ) : spotsLeft <= 0 ? (
          /* COMPLET / SOLD OUT Beautiful cool message */
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-md">
            {/* Top delicate yellow/amber style accents decoration bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-indigo-500 to-amber-400"></div>

            <div className="py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-500 mb-6 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>

              <h3 className="font-serif italic text-3xl font-light text-slate-900 mb-4">
                Toutes les places sont réservées !
              </h3>

              <div className="max-w-md mx-auto space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed font-medium">
                  🏆 Nos <strong>64 places</strong> d'échiquiers pour cette année sont désormais entièrement complètes. Le tournoi affiche sold-out !
                </p>
                <p className="text-slate-500 text-xs sm:text-xs leading-relaxed font-medium bg-slate-50 border border-slate-150 p-4 rounded-xl">
                  <strong>On se réjouit de vous retrouver l'année prochaine !</strong> Continuer de vous entraîner, préparez de superbes gambits intergalactiques et ne manquez pas le lancement des inscriptions pour la prochaine édition !
                </p>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 w-full text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">
                Galactic Games &bull; Nyon 2026/2027
              </div>
            </div>
          </div>
        ) : (
          /* Standard application Form */
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 text-left relative overflow-hidden group hover:border-slate-350 transition-all duration-300 shadow-xs"
          >
            {/* Top delicate decoration bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

            <div className="space-y-6">
              {/* Prénom & Nom row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Prénom */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-space">
                    Prénom
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      type="text"
                      className={`w-full bg-slate-50 text-slate-800 text-xs py-3.5 px-10 rounded-lg border focus:outline-none focus:ring-1 transition-all ${
                        errors.firstName
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100/50"
                          : "border-slate-250 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                  </div>
                  {errors.firstName && (
                    <p className="text-[10px] text-rose-600 font-sans font-semibold mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Nom */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-space">
                    Nom
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      type="text"
                      className={`w-full bg-slate-50 text-slate-800 text-xs py-3.5 px-10 rounded-lg border focus:outline-none focus:ring-1 transition-all ${
                        errors.lastName
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100/50"
                          : "border-slate-250 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                      placeholder="Nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                  </div>
                  {errors.lastName && (
                    <p className="text-[10px] text-rose-600 font-sans font-semibold mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Adresse e-mail */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-space">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className={`w-full bg-slate-50 text-slate-800 text-xs py-3.5 px-10 rounded-lg border focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100/50"
                        : "border-slate-250 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-rose-600 font-sans font-semibold mt-1">{errors.email}</p>
                )}
              </div>

              {/* Numéro de téléphone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-space">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full bg-slate-50 text-slate-800 text-xs py-3.5 px-10 rounded-lg border focus:outline-none focus:ring-1 transition-all ${
                      errors.phone
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100/50"
                        : "border-slate-250 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                    placeholder="+41 79 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                </div>
                {errors.phone && (
                  <p className="text-[10px] text-rose-600 font-sans font-semibold mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Catégorie d'Âge */}
              <div className="space-y-2">
                <label htmlFor="level" className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-space">
                  Catégorie d'Âge
                </label>
                <div className="relative">
                  <select
                    id="level"
                    className={`w-full bg-slate-50 text-slate-800 text-xs py-3.5 pl-10 pr-10 rounded-lg border focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
                      errors.level
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100/50"
                        : "border-slate-250 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                    style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")", backgroundPosition: "right 14px center", backgroundRepeat: "no-repeat", backgroundSize: "16px" }}
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value="" disabled className="text-slate-400">
                      Choisir une catégorie d'âge...
                    </option>
                    {AGE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <BarChart2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                </div>
                {errors.level && (
                  <p className="text-[10px] text-rose-600 font-sans font-semibold mt-1">{errors.level}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || spotsLeft <= 0}
                className={`w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  spotsLeft <= 0
                    ? "bg-slate-200 text-slate-400 border border-slate-300 pointer-events-none"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.99] shadow-md shadow-indigo-650/15"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  `Confirmer mon inscription — CHF 30.-`
                )}
              </button>
            </div>

            {/* Subtext */}
            <p className="text-[10px] text-slate-400 font-sans mt-6 text-center leading-relaxed font-semibold">
              En vous inscrivant vous acceptez les conditions du tournoi et la réception de votre facture d'adhésion par messagerie.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
