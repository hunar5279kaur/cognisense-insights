import { useLocation, useNavigate } from "react-router-dom";
import { 
  Users, 
  LogOut, 
  Mail, 
  Phone, 
  Building2,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { HealthStatusChart } from "@/components/HealthStatusChart";
import { StudentPerformanceChart } from "@/components/StudentPerformanceChart";

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: number;
  status: "healthy" | "average" | "unhealthy";
}

const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", grade: "A", attendance: 95, status: "healthy" },
  { id: "2", name: "Bob Smith", grade: "B+", attendance: 88, status: "healthy" },
  { id: "3", name: "Carol Williams", grade: "B", attendance: 82, status: "average" },
  { id: "4", name: "David Brown", grade: "C+", attendance: 75, status: "average" },
  { id: "5", name: "Eva Martinez", grade: "A-", attendance: 92, status: "healthy" },
  { id: "6", name: "Frank Lee", grade: "C", attendance: 68, status: "unhealthy" },
  { id: "7", name: "Grace Chen", grade: "B-", attendance: 78, status: "average" },
  { id: "8", name: "Henry Wilson", grade: "D+", attendance: 60, status: "unhealthy" },
];

const healthStats = {
  healthy: mockStudents.filter((s) => s.status === "healthy").length,
  average: mockStudents.filter((s) => s.status === "average").length,
  unhealthy: mockStudents.filter((s) => s.status === "unhealthy").length,
};

export default function TeacherDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = (location.state?.user as UserData) || {
    name: "Dr. Sarah Parker",
    email: "sarah.parker@university.edu",
    phone: "+1 234 567 8901",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusIcon = (status: Student["status"]) => {
    switch (status) {
      case "healthy":
        return <TrendingUp className="h-4 w-4 text-healthy" />;
      case "average":
        return <Minus className="h-4 w-4 text-average" />;
      case "unhealthy":
        return <TrendingDown className="h-4 w-4 text-unhealthy" />;
    }
  };

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-healthy/10 text-healthy border-healthy/30";
      case "average":
        return "bg-average/10 text-average border-average/30";
      case "unhealthy":
        return "bg-unhealthy/10 text-unhealthy border-unhealthy/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        {/* Teacher Profile Panel */}
        <Card className="mb-8 animate-fade-in overflow-hidden">
          <div className="gradient-primary h-2" />
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-4 border-secondary/20">
                  <AvatarFallback className="text-xl bg-secondary text-secondary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="gap-1">
                      <Building2 className="h-3 w-3" />
                      Computer Science Dept.
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <BookOpen className="h-3 w-3" />
                      Section A, B, C
                    </Badge>
                  </div>
                  <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {user.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {user.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Health Status Summary with Neon Glow */}
              <div className="flex gap-4">
                <div className="text-center p-4 rounded-xl border glow-healthy">
                  <div className="text-3xl font-bold text-healthy">{healthStats.healthy}</div>
                  <div className="text-xs text-muted-foreground">Healthy</div>
                </div>
                <div className="text-center p-4 rounded-xl border glow-average">
                  <div className="text-3xl font-bold text-average">{healthStats.average}</div>
                  <div className="text-xs text-muted-foreground">Average</div>
                </div>
                <div className="text-center p-4 rounded-xl border glow-unhealthy">
                  <div className="text-3xl font-bold text-unhealthy">{healthStats.unhealthy}</div>
                  <div className="text-xs text-muted-foreground">At Risk</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Student List */}
          <Card className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Students ({mockStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto">
              <div className="space-y-3">
                {mockStudents.map((student, index) => (
                  <div
                    key={student.id}
                    className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer animate-slide-in-left"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{student.name}</span>
                      </div>
                      {getStatusIcon(student.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Grade: <span className="font-semibold text-foreground">{student.grade}</span></span>
                      <Badge variant="outline" className={getStatusColor(student.status)}>
                        {student.attendance}%
                      </Badge>
                    </div>
                    <Progress 
                      value={student.attendance} 
                      className="h-1.5 mt-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Status Bar Chart */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Student Health Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <HealthStatusChart data={healthStats} />
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentPerformanceChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
