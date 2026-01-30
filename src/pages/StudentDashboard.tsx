import { useLocation, useNavigate } from "react-router-dom";
import { 
  Bot, 
  GraduationCap, 
  Calendar, 
  Phone, 
  Clock, 
  CheckCircle2,
  XCircle,
  Mail,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Tagline } from "@/components/Tagline";

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface ClassSchedule {
  id: string;
  name: string;
  time: string;
  attended: boolean;
}

const mockSchedule: ClassSchedule[] = [
  { id: "1", name: "Data Structures", time: "9:50 - 10:40 AM", attended: true },
  { id: "2", name: "OOPS", time: "11:30 AM - 12:20 PM", attended: true },
  { id: "3", name: "Software Engineering Lab", time: "12:20 - 2:00 PM", attended: false },
];

const navItems = [
  { label: "AI Assistant", icon: Bot, path: "/student/chatbot" },
  { label: "Grades", icon: GraduationCap, path: "/student/grades" },
  { label: "Attendance", icon: Calendar, path: "/student/attendance" },
  { label: "Help", icon: Phone, path: "/student/help" },
];

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = (location.state?.user as UserData) || {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navigation */}
      <Navbar>
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick(item.path)}
              className="gap-2"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </Navbar>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-background border-t border-border z-40">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick(item.path)}
              className="flex-col h-auto py-2 px-3 gap-1"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <Badge variant="secondary" className="mx-auto mt-2">
                <GraduationCap className="h-3 w-3 mr-1" />
                Student
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary">85%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">3.8</div>
                  <div className="text-xs text-muted-foreground">GPA</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timetable & Schedule */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Today's Classes
                </CardTitle>
                <Badge variant="outline">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchedule.map((classItem, index) => (
                    <div
                      key={classItem.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                        classItem.attended
                          ? "attendance-present border-secondary"
                          : "attendance-absent"
                      }`}
                      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${
                            classItem.attended
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {classItem.attended ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{classItem.name}</h3>
                          <p className="text-sm text-muted-foreground">{classItem.time}</p>
                        </div>
                      </div>
                      <Badge
                        variant={classItem.attended ? "default" : "secondary"}
                        className={classItem.attended ? "bg-secondary hover:bg-secondary/90" : ""}
                      >
                        {classItem.attended ? "Present" : "Absent"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Tomorrow, 9:50 AM</div>
                    <div className="font-medium">Data Structures</div>
                    <div className="text-sm text-muted-foreground">Lab Session</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Tomorrow, 11:30 AM</div>
                    <div className="font-medium">OOPS</div>
                    <div className="text-sm text-muted-foreground">Lecture</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Tomorrow, 12:20 PM</div>
                    <div className="font-medium">Software Engineering Lab</div>
                    <div className="text-sm text-muted-foreground">Lab Session</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Tagline />
    </div>
  );
}
