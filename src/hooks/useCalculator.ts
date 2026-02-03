import { useState, useEffect, useCallback } from "react";
import {
  getTuitionRate,
  calculateTotalBill,
  calculateGap,
  calculateCreditBalance,
  generateSessionId,
  STUDENT_TYPES,
  SCHOOLS,
  RESIDENCY_STATUSES,
} from "@/lib/tuitionData";
import {
  saveCalculatorState,
  loadCalculatorState,
  clearCalculatorState,
  saveToHistory,
  type CalculatorState,
} from "@/lib/storage";

export interface CalculationResult {
  costPerCredit: number;
  mandatoryFees: number;
  totalBill: number;
  totalAid: number;
  gap: number;
  creditBalance: number;
  isHighRisk: boolean;
}

export function useCalculator() {
  const [studentType, setStudentType] = useState<string>(STUDENT_TYPES[0]);
  const [school, setSchool] = useState<string>(SCHOOLS[0]);
  const [creditHours, setCreditHours] = useState(12);
  const [residencyStatus, setResidencyStatus] = useState<string>(RESIDENCY_STATUSES[0]);
  const [grantsScholarships, setGrantsScholarships] = useState(0);
  const [federalLoans, setFederalLoans] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize session and load saved state
  useEffect(() => {
    const saved = loadCalculatorState();
    if (saved) {
      setStudentType(saved.studentType);
      setSchool(saved.school);
      setCreditHours(saved.creditHours);
      setResidencyStatus(saved.residencyStatus);
      setGrantsScholarships(saved.grantsScholarships);
      setFederalLoans(saved.federalLoans);
      setSessionId(saved.sessionId);
      setLastUpdated(saved.lastUpdated);
    } else {
      setSessionId(generateSessionId());
      setLastUpdated(new Date().toLocaleString());
    }
  }, []);

  // Calculate results
  const calculateResults = useCallback((): CalculationResult => {
    const { costPerCredit, mandatoryFees } = getTuitionRate(
      studentType,
      school,
      residencyStatus
    );
    const totalBill = calculateTotalBill(creditHours, costPerCredit, mandatoryFees);
    const totalAid = grantsScholarships + federalLoans;
    const gap = calculateGap(totalBill, totalAid);
    const creditBalance = calculateCreditBalance(totalBill, totalAid);
    const isHighRisk = gap > 1000;

    return {
      costPerCredit,
      mandatoryFees,
      totalBill,
      totalAid,
      gap,
      creditBalance,
      isHighRisk,
    };
  }, [studentType, school, residencyStatus, creditHours, grantsScholarships, federalLoans]);

  // Get current state
  const getState = useCallback((): CalculatorState => ({
    studentType,
    school,
    creditHours,
    residencyStatus,
    grantsScholarships,
    federalLoans,
    sessionId,
    lastUpdated,
  }), [studentType, school, creditHours, residencyStatus, grantsScholarships, federalLoans, sessionId, lastUpdated]);

  // Validate form
  const isValid = Boolean(studentType && school && creditHours >= 1 && creditHours <= 21 && residencyStatus);

  // Handle calculate
  const handleCalculate = useCallback(() => {
    if (!isValid) return;

    const now = new Date().toLocaleString();
    setLastUpdated(now);
    setIsCalculated(true);
    setCurrentStep(5); // Jump to Gap Summary

    const state = { ...getState(), lastUpdated: now };
    saveCalculatorState(state);

    const results = calculateResults();
    saveToHistory({
      id: crypto.randomUUID(),
      state,
      totalBill: results.totalBill,
      totalAid: results.totalAid,
      gap: results.gap,
      creditBalance: results.creditBalance,
      timestamp: now,
    });
  }, [isValid, getState, calculateResults]);

  // Handle start over
  const handleStartOver = useCallback(() => {
    setStudentType(STUDENT_TYPES[0] as string);
    setSchool(SCHOOLS[0] as string);
    setCreditHours(12);
    setResidencyStatus(RESIDENCY_STATUSES[0] as string);
    setGrantsScholarships(0);
    setFederalLoans(0);
    setSessionId(generateSessionId());
    setLastUpdated(new Date().toLocaleString());
    setIsCalculated(false);
    setCurrentStep(1);
    clearCalculatorState();
  }, []);

  return {
    // State
    studentType,
    school,
    creditHours,
    residencyStatus,
    grantsScholarships,
    federalLoans,
    sessionId,
    lastUpdated,
    isCalculated,
    currentStep,
    isValid,

    // Setters
    setStudentType,
    setSchool,
    setCreditHours,
    setResidencyStatus,
    setGrantsScholarships,
    setFederalLoans,
    setCurrentStep,

    // Actions
    handleCalculate,
    handleStartOver,
    calculateResults,
    getState,
  };
}
