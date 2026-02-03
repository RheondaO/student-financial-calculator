import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface DataIntegrityProps {
  sessionId: string;
  lastUpdated: string;
}

export function DataIntegrity({ sessionId, lastUpdated }: DataIntegrityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Integrity Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <a
          href="https://admissions.vcu.edu/cost-aid/tuition-fees/#:~:text=the%20academic%20year.-,Undergraduate,-Graduate"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          View VCU 2026-2027 Tuition Tables
        </a>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Session ID:</span>
            <span className="font-mono">{sessionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span>{lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
