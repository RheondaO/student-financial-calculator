import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { RESIDENCY_STATUSES } from "@/lib/tuitionData";

interface FinancialAidProps {
  residencyStatus: string;
  creditHours: number;
  grantsScholarships: number;
  federalLoans: number;
  onResidencyStatusChange: (value: string) => void;
  onGrantsScholarshipsChange: (value: number) => void;
  onFederalLoansChange: (value: number) => void;
}

export function FinancialAid({
  residencyStatus,
  creditHours,
  grantsScholarships,
  federalLoans,
  onResidencyStatusChange,
  onGrantsScholarshipsChange,
  onFederalLoansChange,
}: FinancialAidProps) {
  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setter(Math.max(0, Math.round(value * 100) / 100));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Applied Financial Aid</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="residencyStatus">Residency Status</Label>
          <Select value={residencyStatus} onValueChange={onResidencyStatusChange}>
            <SelectTrigger id="residencyStatus">
              <SelectValue placeholder="Select residency status" />
            </SelectTrigger>
            <SelectContent>
              {RESIDENCY_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="creditHoursDisplay">Credit Hours</Label>
          <Input
            id="creditHoursDisplay"
            type="number"
            value={creditHours}
            disabled
            className="w-24 bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Auto-synced from Enrollment
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="grantsScholarships">Grants & Scholarships</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Include Pell Grant, VCU scholarships, and any other gift aid
                  that does not need to be repaid.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="grantsScholarships"
              type="number"
              min={0}
              step={0.01}
              value={grantsScholarships || ""}
              onChange={(e) => handleCurrencyChange(e, onGrantsScholarshipsChange)}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="federalLoans">Federal Student Loans</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Include subsidized and unsubsidized federal loans you plan to
                  accept this semester.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="federalLoans"
              type="number"
              min={0}
              step={0.01}
              value={federalLoans || ""}
              onChange={(e) => handleCurrencyChange(e, onFederalLoansChange)}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
