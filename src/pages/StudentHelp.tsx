import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Tagline } from "@/components/Tagline";

export default function StudentHelp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar>
        <Button variant="ghost" size="sm" onClick={() => navigate("/student/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Navbar>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Get in touch with our support team</p>
        </div>

        {/* Contact Card */}
        <Card className="animate-fade-in mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
              <Phone className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
            <CardDescription>We're here to help you succeed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-xl font-semibold">+91 XXXXXXXXXX</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Mail className="h-6 w-6 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">support@cognisense.edu</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Clock className="h-6 w-6 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Working Hours</p>
                <p className="font-medium">Mon - Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-6 w-6 text-coral" />
              <div>
                <p className="text-sm text-muted-foreground">Office</p>
                <p className="font-medium">Student Services Building, Room 101</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              For immediate assistance with:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Academic queries and grade disputes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Attendance corrections
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Technical support for the platform
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                General student welfare concerns
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Tagline />
    </div>
  );
}
