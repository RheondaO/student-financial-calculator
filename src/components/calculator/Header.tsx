import { Mail } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VCU SFMC Student Financial Gap Calculator</h1>
              <p className="text-sm text-muted-foreground">
                Student Financial Aid Gap Calculator
              </p>
            </div>
          </div>
         {/*     <div className="hidden md:block">
            <div className="bg-primary px-4 py-2 rounded-md">
            <span className="text-sm font-semibold text-primary-foreground">
                Financial Gap Calculator Mock Scenario
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
