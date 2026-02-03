import jsPDF from "jspdf";
import { formatCurrency } from "@/lib/tuitionData";
import type { CalculatorState } from "@/lib/storage";

interface PDFData {
  state: CalculatorState;
  totalBill: number;
  totalAid: number;
  gap: number;
  creditBalance: number;
  costPerCredit: number;
  mandatoryFees: number;
}

export function generateSummaryPDF(data: PDFData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // VCU Gold color (RGB)
  const vcuGold = { r: 255, g: 179, b: 0 };
  
  // Header
  doc.setFillColor(vcuGold.r, vcuGold.g, vcuGold.b);
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text("VCU SFMC", 20, 20);
  doc.setFontSize(12);
  doc.text("Student Financial Gap Calculator", 20, 28);
  
  // Session info
  doc.setFontSize(10);
  doc.text(`Session ID: ${data.state.sessionId}`, pageWidth - 60, 20);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 60, 27);
  
  // Title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Financial Gap Summary", 20, 50);
  
  // Student Information Section
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Student Information", 20, 65);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const studentInfo = [
    ["Student Type:", data.state.studentType],
    ["School:", data.state.school],
    ["Credit Hours:", data.state.creditHours.toString()],
    ["Residency Status:", data.state.residencyStatus],
  ];
  
  let y = 75;
  studentInfo.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(label, 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(value, 80, y);
    y += 8;
  });
  
  // Tuition Breakdown Section
  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Tuition Breakdown", 20, y);
  
  y += 12;
  doc.setFontSize(10);
  const tuitionBreakdown = [
    ["Cost per Credit:", formatCurrency(data.costPerCredit)],
    ["Credits × Rate:", `${data.state.creditHours} × ${formatCurrency(data.costPerCredit)} = ${formatCurrency(data.state.creditHours * data.costPerCredit)}`],
    ["Mandatory Fees:", formatCurrency(data.mandatoryFees)],
    ["Total Tuition & Fees:", formatCurrency(data.totalBill)],
  ];
  
  tuitionBreakdown.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(label, 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(value, 80, y);
    y += 8;
  });
  
  // Financial Aid Section
  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Applied Financial Aid", 20, y);
  
  y += 12;
  doc.setFontSize(10);
  const aidBreakdown = [
    ["Grants & Scholarships:", formatCurrency(data.state.grantsScholarships)],
    ["Federal Student Loans:", formatCurrency(data.state.federalLoans)],
    ["Total Applied Aid:", formatCurrency(data.totalAid)],
  ];
  
  aidBreakdown.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(label, 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(value, 80, y);
    y += 8;
  });
  
  // Gap Summary Box
  y += 15;
  doc.setFillColor(0, 0, 0);
  doc.rect(20, y, pageWidth - 40, 40, "F");
  
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text("Your Estimated Semester Balance", 30, y + 12);
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  if (data.creditBalance > 0) {
    doc.setTextColor(100, 200, 100);
    doc.text(formatCurrency(data.creditBalance), 30, y + 28);
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("Credit Balance", 30, y + 36);
  } else {
    doc.text(formatCurrency(data.gap), 30, y + 28);
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("Estimated Balance Due", 30, y + 36);
  }
  
  // Footer
  y += 60;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("A VCU SFMC Project. Designed for student success.", 20, y);
  doc.text("This calculator provides estimates only. Actual charges may vary. Protected under FERPA.", 20, y + 6);
  doc.text("Tuition Table Version: 2026.01", 20, y + 12);
  
  // Save the PDF
  doc.save(`VCU_Financial_Gap_Summary_${data.state.sessionId}.pdf`);
}
