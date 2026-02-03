import { formatCurrency } from "@/lib/tuitionData";
import { AlertTriangle } from "lucide-react";

interface GapCardProps {
  estimatedBalance: number;
  totalTuitionFees: number;
  totalAppliedAid: number;
  creditBalance: number;
  isHighRisk?: boolean;
}

export function GapCard({
  estimatedBalance,
  totalTuitionFees,
  totalAppliedAid,
  creditBalance,
  isHighRisk = false,
}: GapCardProps) {
  const hasCredit = creditBalance > 0;

  return (
    <div className="space-y-4">
      <div className="bg-gap-card text-gap-card-foreground rounded-lg p-6">
        <h2 className="text-sm font-medium text-gap-card-foreground/70 mb-2">
          Your Estimated Semester Balance
        </h2>
        <div className="text-4xl font-bold mb-4">
          {hasCredit ? (
            <span className="text-green-400">
              {formatCurrency(creditBalance)}
            </span>
          ) : (
            formatCurrency(estimatedBalance)
          )}
        </div>
        <p className="text-sm text-gap-card-foreground/70 mb-4">
          {hasCredit ? "Credit Balance" : "Estimated Balance Due"}
        </p>
        
        <div className="space-y-2 pt-4 border-t border-gap-card-foreground/20">
          <div className="flex justify-between text-sm">
            <span className="text-gap-card-foreground/70">Total Tuition & Fees</span>
            <span>{formatCurrency(totalTuitionFees)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gap-card-foreground/70">Total Applied Aid</span>
            <span>({formatCurrency(totalAppliedAid)})</span>
          </div>
        </div>
      </div>

      {isHighRisk && !hasCredit && (
        <div className="bg-vcu-warning/20 border border-vcu-warning rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-vcu-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                High Balance Alert
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your estimated gap exceeds $1,000. We recommend speaking with an
                SFMC advisor to discuss payment options.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
