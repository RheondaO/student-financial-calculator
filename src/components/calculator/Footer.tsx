interface FooterProps {
  sessionId: string;
}

export function Footer({ sessionId }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Session ID: {sessionId}</span>
            <span>Tuition Table Version: 2026.01</span>
          </div>
          <div className="text-center md:text-right">
            <p>A VCU SFMC Project. Designed for student success.</p>
            <p className="text-xs mt-1">
              This calculator provides estimates only. Actual charges may vary.
              Protected under FERPA.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
