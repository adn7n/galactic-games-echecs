import { Registration } from "../types";

export const AGE_CATEGORIES = [
  "U6",
  "U8",
  "U10",
  "U12",
  "U14",
  "U18"
];

export const MOCK_PLAYERS: Registration[] = [];

export const INITIAL_CAPACITY = 64;

// Retrieve sheet script WebApp URL
export const getGoogleSheetsUrl = (): string => {
  // @ts-ignore
  const envUrl = (import.meta.env && import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL) || "";
  return envUrl || "https://script.google.com/macros/s/AKfycbysd115Yju095CVx3bit1q3lioFpWhjTTJ2MmrJXfG9wG1zW1l1NQnA1DikasSpYigG/exec";
};

export const isGoogleSheetsConfigured = (): boolean => {
  return !!getGoogleSheetsUrl();
};

export const loadRegistrations = (): Registration[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("galactic_registrations");
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      // Filter out any mock players (ids starting with 'p' or matching mock names)
      return parsed.filter(p => p && p.id && !p.id.startsWith("p") && !["Léo", "Elena", "Marc-Antoine", "Aline", "Sébastien"].includes(p.firstName));
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const clearAllRegistrations = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("galactic_registrations");
  }
};

// Async fetch for real-time google sheet sync
export const fetchGoogleSheetsRegistrations = async (): Promise<Registration[] | null> => {
  const url = getGoogleSheetsUrl();
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("CORS or WebApp error");
    const data = await res.json();
    if (Array.isArray(data)) {
      localStorage.setItem("galactic_registrations", JSON.stringify(data));
      return data;
    }
    return null;
  } catch (err) {
    console.warn("Using cached offline player lists as Google Sheets loading was bypassed / not deployed.", err);
    return null;
  }
};

export const saveRegistration = async (
  reg: Omit<Registration, "id" | "createdAt" | "ticketNumber">
): Promise<Registration> => {
  const current = loadRegistrations();
  const index = current.length + 1;
  const ticketNumber = `GAL-2026-${String(index).padStart(4, "0")}`;
  
  const newReg: Registration = {
    ...reg,
    id: `reg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    ticketNumber
  };
  
  const updated = [newReg, ...current];
  localStorage.setItem("galactic_registrations", JSON.stringify(updated));

  const url = getGoogleSheetsUrl();
  if (url) {
    try {
      // Standard POST to Google Apps Script
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newReg)
      });
    } catch (e) {
      console.error("Sheet Sync Error:", e);
    }
  }
  
  return newReg;
};
