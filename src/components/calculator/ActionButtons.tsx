import { Button } from "@/components/ui/button";
import { RotateCcw, Calculator } from "lucide-react";

interface ActionButtonsProps {
  onStartOver: () => void;
  onCalculate: () => void;
  isValid: boolean;
}

export function ActionButtons({
  onStartOver,
  onCalculate,
  isValid,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        onClick={onStartOver}
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Start Over
      </Button>
      <Button
       onClick={onCalculate}
        disabled={true}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Calculator className="w-4 h-4" />
        Calculate My Gap!
      </Button>
    </div>
  );
}
