import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Tagline } from "@/components/Tagline";

interface SubjectGrade {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade: string;
  percentage: number;
  trend: "up" | "down" | "stable";
}

const mockGrades: SubjectGrade[] = [
  { id: "1", name: "Data Structures", code: "CS201", credits: 4, grade: "A", percentage: 92, trend: "up" },
  { id: "2", name: "OOPS", code: "CS202", credits: 3, grade: "B+", percentage: 85, trend: "stable" },
  { id: "3", name: "Software Engineering Lab", code: "CS203L", credits: 2, grade: "A-", percentage: 88, trend: "up" },
];

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

export default function StudentGrades() {
  const navigate = useNavigate();

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    mockGrades.forEach(subject => {
      totalPoints += (gradePoints[subject.grade] || 0) * subject.credits;
      totalCredits += subject.credits;
    });
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getTrendIcon = (trend: SubjectGrade["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-healthy" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-unhealthy" />;
      case "stable":
        return <Minus className="h-4 w-4 text-average" />;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-healthy/10 text-healthy border-healthy/30";
    if (grade.startsWith("B")) return "bg-primary/10 text-primary border-primary/30";
    if (grade.startsWith("C")) return "bg-average/10 text-average border-average/30";
    return "bg-unhealthy/10 text-unhealthy border-unhealthy/30";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar>
        <Button variant="ghost" size="sm" onClick={() => navigate("/student/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Grades</h1>
          <p className="text-muted-foreground">View your academic performance across all subjects</p>
        </div>

        {/* GPA Summary */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-muted-foreground">Current SGPA</h2>
                <p className="text-4xl font-bold text-primary">{calculateGPA()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-semibold">{mockGrades.reduce((acc, s) => acc + s.credits, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Cards */}
        <div className="grid gap-4">
          {mockGrades.map((subject, index) => (
            <Card 
              key={subject.id} 
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{subject.code} • {subject.credits} Credits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(subject.trend)}
                    <Badge variant="outline" className={getGradeColor(subject.grade)}>
                      {subject.grade}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium">{subject.percentage}%</span>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Tagline />
    </div>
  );
}
