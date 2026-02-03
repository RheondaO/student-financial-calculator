// Local storage utilities for persisting calculator state

export interface CalculatorState {
  studentType: string;
  school: string;
  creditHours: number;
  residencyStatus: string;
  grantsScholarships: number;
  federalLoans: number;
  sessionId: string;
  lastUpdated: string;
}

const STORAGE_KEY = "vcu_sfmc_calculator_state";
const HISTORY_KEY = "vcu_sfmc_calculation_history";

export function saveCalculatorState(state: CalculatorState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save calculator state:", error);
  }
}

export function loadCalculatorState(): CalculatorState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as CalculatorState;
    }
  } catch (error) {
    console.error("Failed to load calculator state:", error);
  }
  return null;
}

export function clearCalculatorState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear calculator state:", error);
  }
}

export interface CalculationHistoryEntry {
  id: string;
  state: CalculatorState;
  totalBill: number;
  totalAid: number;
  gap: number;
  creditBalance: number;
  timestamp: string;
}

export function saveToHistory(entry: CalculationHistoryEntry): void {
  try {
    const history = getCalculationHistory();
    history.unshift(entry);
    // Keep only last 10 calculations
    const trimmedHistory = history.slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getCalculationHistory(): CalculationHistoryEntry[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      return JSON.parse(saved) as CalculationHistoryEntry[];
    }
  } catch (error) {
    console.error("Failed to load history:", error);
  }
  return [];
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}
