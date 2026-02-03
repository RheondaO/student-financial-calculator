import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

const steps: Step[] = [
  { id: 1, label: "Start" },
  { id: 2, label: "Enrollment" },
  { id: 3, label: "Funding" },
  { id: 4, label: "Payment Planner" },
  { id: 5, label: "Gap Summary" },
  { id: 6, label: "Final Overview" },
];

interface StepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <div className="bg-card border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center flex-shrink-0"
            >
              <button
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "bg-primary/20 text-foreground"
                    : "bg-muted text-muted-foreground",
                  onStepClick && "hover:opacity-80 cursor-pointer"
                )}
                disabled={!onStepClick}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                    currentStep === step.id
                      ? "bg-primary-foreground text-primary"
                      : currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
