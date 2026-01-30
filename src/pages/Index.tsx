import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";

type UserRole = "student" | "teacher" | null;

interface LoginFormData {
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    phone: "",
  });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "student") {
      navigate("/student/dashboard", { state: { user: formData } });
    } else if (selectedRole === "teacher") {
      navigate("/teacher/dashboard", { state: { user: formData } });
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Smart Learning Analytics
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering educators and students with AI-driven insights for better academic outcomes.
          </p>
        </div>

        {/* Login Selection / Form */}
        <div className="max-w-4xl mx-auto">
          {!selectedRole ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Student Card */}
              <Card 
                className="group cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
                onClick={() => handleRoleSelect("student")}
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Student</CardTitle>
                  <CardDescription>
                    Access your timetable, attendance, grades, and AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full" size="lg">
                    Continue as Student
                  </Button>
                </CardContent>
              </Card>

              {/* Teacher Card */}
              <Card 
                className="group cursor-pointer hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
                onClick={() => handleRoleSelect("teacher")}
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Users className="h-12 w-12 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Teacher</CardTitle>
                  <CardDescription>
                    Monitor student performance with AI-powered analytics
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="secondary" className="w-full" size="lg">
                    Continue as Teacher
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="max-w-md mx-auto animate-scale-in">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                  {selectedRole === "student" ? (
                    <GraduationCap className="h-10 w-10 text-primary" />
                  ) : (
                    <Users className="h-10 w-10 text-secondary" />
                  )}
                </div>
                <CardTitle className="text-2xl capitalize">{selectedRole} Login</CardTitle>
                <CardDescription>
                  Enter your details to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Features Section */}
        {!selectedRole && (
          <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-healthy/20 flex items-center justify-center glow-healthy">
                <div className="w-4 h-4 rounded-full bg-healthy" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">Track student health and performance with live data</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-average/20 flex items-center justify-center glow-average">
                <div className="w-4 h-4 rounded-full bg-average" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">Get intelligent recommendations and predictions</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-coral/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-coral" />
              </div>
              <h3 className="font-semibold mb-2">Easy Communication</h3>
              <p className="text-sm text-muted-foreground">Connect students and teachers seamlessly</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
