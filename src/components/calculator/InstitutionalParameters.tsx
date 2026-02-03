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
import { STUDENT_TYPES, SCHOOLS } from "@/lib/tuitionData";

interface InstitutionalParametersProps {
  studentType: string;
  school: string;
  creditHours: number;
  onStudentTypeChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
  onCreditHoursChange: (value: number) => void;
}

export function InstitutionalParameters({
  studentType,
  school,
  creditHours,
  onStudentTypeChange,
  onSchoolChange,
  onCreditHoursChange,
}: InstitutionalParametersProps) {
  const handleCreditHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(1, Math.min(21, value));
    onCreditHoursChange(clampedValue);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Institutional Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentType">Student Type</Label>
          <Select value={studentType} onValueChange={onStudentTypeChange}>
            <SelectTrigger id="studentType">
              <SelectValue placeholder="Select student type" />
            </SelectTrigger>
            <SelectContent>
              {STUDENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="school">School</Label>
          <Select value={school} onValueChange={onSchoolChange}>
            <SelectTrigger id="school">
              <SelectValue placeholder="Select school" />
            </SelectTrigger>
            <SelectContent>
              {SCHOOLS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="creditHours">Credit Hours</Label>
          <div className="flex items-center gap-2">
            <Input
              id="creditHours"
              type="number"
              min={1}
              max={21}
              value={creditHours}
              onChange={handleCreditHoursChange}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">
              Min: 1, Max: 21
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
