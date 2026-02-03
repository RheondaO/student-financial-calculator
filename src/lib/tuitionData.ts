// VCU 2026-2027 Tuition Rates (Hardcoded)

export interface TuitionRate {
  studentType: string;
  school: string;
  residencyStatus: string;
  costPerCredit: number;
  mandatoryFees: number;
}

export const STUDENT_TYPES = [
  "Full-Time Student Undergraduate",
  "Part-Time Student Undergraduate",
  "Full-Time Student Graduate",
  "Part-Time Student Graduate",
] as const;

export const SCHOOLS = [
  "School of Business",
  "School of Engineering",
  "College of Humanities & Sciences",
  "School of the Arts",
  "School of Education",
  "School of Social Work",
  "College of Health Professions",
] as const;

export const RESIDENCY_STATUSES = [
  "Off-Campus Resident In-State",
  "Off-Campus Resident Out-of-State",
  "On-Campus Resident In-State",
  "On-Campus Resident Out-of-State",
] as const;

// Base tuition rates per credit hour
const BASE_RATES = {
  undergraduate: {
    inState: 398,
    outOfState: 1125,
  },
  graduate: {
    inState: 615,
    outOfState: 1380,
  },
};

// School-specific premium (added to base rate)
const SCHOOL_PREMIUMS: Record<string, number> = {
  "School of Business": 50,
  "School of Engineering": 75,
  "College of Humanities & Sciences": 0,
  "School of the Arts": 25,
  "School of Education": 15,
  "School of Social Work": 20,
  "College of Health Professions": 60,
};

// Mandatory fees per semester
const MANDATORY_FEES = {
  fullTime: 2150, // 12+ credits
  partTime: 1075, // Less than 12 credits
};

export function getTuitionRate(
  studentType: string,
  school: string,
  residencyStatus: string
): { costPerCredit: number; mandatoryFees: number } {
  const isGraduate = studentType.toLowerCase().includes("graduate");
  const isFullTime = studentType.toLowerCase().includes("full-time");
  const isInState = residencyStatus.toLowerCase().includes("in-state");

  const baseRate = isGraduate
    ? isInState
      ? BASE_RATES.graduate.inState
      : BASE_RATES.graduate.outOfState
    : isInState
    ? BASE_RATES.undergraduate.inState
    : BASE_RATES.undergraduate.outOfState;

  const schoolPremium = SCHOOL_PREMIUMS[school] || 0;
  const costPerCredit = baseRate + schoolPremium;
  const mandatoryFees = isFullTime ? MANDATORY_FEES.fullTime : MANDATORY_FEES.partTime;

  return { costPerCredit, mandatoryFees };
}

export function calculateTotalBill(
  creditHours: number,
  costPerCredit: number,
  mandatoryFees: number
): number {
  return Math.round((creditHours * costPerCredit + mandatoryFees) * 100) / 100;
}

export function calculateGap(totalBill: number, totalAid: number): number {
  // Zero-floor logic: if aid exceeds bill, return 0
  const gap = totalBill - totalAid;
  return Math.max(0, Math.round(gap * 100) / 100);
}

export function calculateCreditBalance(totalBill: number, totalAid: number): number {
  // Returns positive credit balance if aid exceeds bill
  const surplus = totalAid - totalBill;
  return surplus > 0 ? Math.round(surplus * 100) / 100 : 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function generateSessionId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
