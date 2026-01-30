import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Tagline } from "@/components/Tagline";

type AttendanceStatus = "present" | "absent" | "holiday" | "none";

interface DayData {
  date: number;
  status: AttendanceStatus;
  subject?: string;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock attendance data
const generateMockAttendance = (year: number, month: number): Record<number, AttendanceStatus> => {
  const attendance: Record<number, AttendanceStatus> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    
    // Weekends are holidays
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      attendance[day] = "holiday";
    } else {
      // Random attendance for past dates
      if (date <= new Date()) {
        const rand = Math.random();
        attendance[day] = rand > 0.15 ? "present" : "absent";
      } else {
        attendance[day] = "none";
      }
    }
  }
  return attendance;
};

export default function StudentAttendance() {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const attendance = generateMockAttendance(currentYear, currentMonth);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-3 w-3 text-healthy" />;
      case "absent":
        return <XCircle className="h-3 w-3 text-unhealthy" />;
      case "holiday":
        return <Circle className="h-3 w-3 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "bg-healthy/10 border-healthy/30 text-healthy";
      case "absent":
        return "bg-unhealthy/10 border-unhealthy/30 text-unhealthy";
      case "holiday":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-background";
    }
  };

  // Calculate statistics
  const presentDays = Object.values(attendance).filter(s => s === "present").length;
  const absentDays = Object.values(attendance).filter(s => s === "absent").length;
  const totalClassDays = presentDays + absentDays;
  const attendancePercentage = totalClassDays > 0 ? Math.round((presentDays / totalClassDays) * 100) : 0;

  // Generate calendar grid
  const calendarDays: DayData[] = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ date: 0, status: "none" });
  }
  
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ date: day, status: attendance[day] || "none" });
  }

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
          <h1 className="text-3xl font-bold mb-2">Attendance</h1>
          <p className="text-muted-foreground">Track your class attendance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-healthy">{presentDays}</p>
              <p className="text-sm text-muted-foreground">Present</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-unhealthy">{absentDays}</p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">{attendancePercentage}%</p>
              <p className="text-sm text-muted-foreground">Overall</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <CardTitle>{months[currentMonth]} {currentYear}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-sm transition-colors ${
                    day.date === 0 
                      ? "border-transparent" 
                      : `${getStatusClass(day.status)} ${day.date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? "ring-2 ring-primary" : ""}`
                  }`}
                >
                  {day.date > 0 && (
                    <>
                      <span className="font-medium">{day.date}</span>
                      {getStatusIcon(day.status)}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-healthy" />
                <span className="text-sm text-muted-foreground">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-unhealthy" />
                <span className="text-sm text-muted-foreground">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Holiday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Tagline />
    </div>
  );
}
