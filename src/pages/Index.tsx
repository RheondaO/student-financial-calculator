import { Header } from "@/components/calculator/Header";
import { Stepper } from "@/components/calculator/Stepper";
import { GapCard } from "@/components/calculator/GapCard";
import { InstitutionalParameters } from "@/components/calculator/InstitutionalParameters";
import { FinancialAid } from "@/components/calculator/FinancialAid";
import { ActionButtons } from "@/components/calculator/ActionButtons";
import { TakeAction } from "@/components/calculator/TakeAction";
import { DataIntegrity } from "@/components/calculator/DataIntegrity";
import { Footer } from "@/components/calculator/Footer";
import { useCalculator } from "@/hooks/useCalculator";
import { generateSummaryPDF } from "@/lib/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const {
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
    setStudentType,
    setSchool,
    setCreditHours,
    setResidencyStatus,
    setGrantsScholarships,
    setFederalLoans,
    setCurrentStep,
    handleCalculate,
    handleStartOver,
    calculateResults,
    getState,
  } = useCalculator();

  const results = calculateResults();

  const handleGeneratePDF = () => {
    generateSummaryPDF({
      state: getState(),
      totalBill: results.totalBill,
      totalAid: results.totalAid,
      gap: results.gap,
      creditBalance: results.creditBalance,
      costPerCredit: results.costPerCredit,
      mandatoryFees: results.mandatoryFees,
    });
    toast({
      title: "PDF Generated",
      description: "Your financial gap summary has been downloaded.",
    });
  };

  const handleMeetAdvisor = () => {
    window.open("https://sfmc.vcu.edu/appointments", "_blank");
  };

  const handleEmailAdvisor = () => {
    const subject = encodeURIComponent(
      `Financial Gap Inquiry - Session ${sessionId}`
    );
    const body = encodeURIComponent(
      `Hello SFMC Advisor,\n\nI am writing regarding my financial gap calculation.\n\nSession ID: ${sessionId}\nEstimated Gap: $${results.gap.toFixed(2)}\n\nPlease advise on payment options.\n\nThank you.`
    );
    window.location.href = `mailto:sfmc@vcu.edu?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Stepper currentStep={currentStep} onStepClick={setCurrentStep} />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            <InstitutionalParameters
              studentType={studentType}
              school={school}
              creditHours={creditHours}
              onStudentTypeChange={setStudentType}
              onSchoolChange={setSchool}
              onCreditHoursChange={setCreditHours}
            />

            <FinancialAid
              residencyStatus={residencyStatus}
              creditHours={creditHours}
              grantsScholarships={grantsScholarships}
              federalLoans={federalLoans}
              onResidencyStatusChange={setResidencyStatus}
              onGrantsScholarshipsChange={setGrantsScholarships}
              onFederalLoansChange={setFederalLoans}
            />

            <ActionButtons
              onStartOver={handleStartOver}
              onCalculate={handleCalculate}
              isValid={isValid}
            />
          </div>

          {/* Right Column - Results Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <GapCard
              estimatedBalance={results.gap}
              totalTuitionFees={results.totalBill}
              totalAppliedAid={results.totalAid}
              creditBalance={results.creditBalance}
              isHighRisk={results.isHighRisk}
            />

            <TakeAction
              onGeneratePDF={handleGeneratePDF}
              onMeetAdvisor={handleMeetAdvisor}
              onEmailAdvisor={handleEmailAdvisor}
              isCalculated={isCalculated}
            />

            <DataIntegrity sessionId={sessionId} lastUpdated={lastUpdated} />
          </div>
        </div>
      </main>

      <Footer sessionId={sessionId} />
    </div>
  );
};

export default Index;
