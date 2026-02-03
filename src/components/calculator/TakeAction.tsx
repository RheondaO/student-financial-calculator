import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Mail } from "lucide-react";

interface TakeActionProps {
  onGeneratePDF: () => void;
  onMeetAdvisor: () => void;
  onEmailAdvisor: () => void;
  isCalculated: boolean;
}

export function TakeAction({
  onGeneratePDF,
  onMeetAdvisor,
  onEmailAdvisor,
  isCalculated,
}: TakeActionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Take Action</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onGeneratePDF}
          disabled={!isCalculated}
        >
          <FileText className="w-4 h-4" />
          Generate Summary PDF
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onMeetAdvisor}
        >
          <Calendar className="w-4 h-4" />
          Meet with Advisor
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onEmailAdvisor}
        >
          <Mail className="w-4 h-4" />
          Email SFMC Advisor
        </Button>
      </CardContent>
    </Card>
  );
}
