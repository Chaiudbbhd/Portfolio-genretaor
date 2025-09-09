import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface AuthDialogProps {
  children: React.ReactNode;
}

export const AuthDialog = ({ children }: AuthDialogProps) => {
  const { user, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You are logged in." });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { firstName, lastName, phoneNumber, address, country, pincode },
          },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to confirm." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "github") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // ✅ if logged in → show profile + logout
  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.user_metadata?.avatar_url && (
          <img src={user.user_metadata.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
        )}
        <span className="text-sm font-medium">
          {user.user_metadata?.full_name || user.email}
        </span>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4 mr-1" /> Logout
        </Button>
      </div>
    );
  }

  // ✅ if logged out → show dialog
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={isLogin ? "sm:max-w-[425px]" : "sm:max-w-[600px] max-h-[90vh] overflow-y-auto"}>
        <DialogHeader>
          <DialogTitle>{isLogin ? "Welcome back" : "Create your account"}</DialogTitle>
          <DialogDescription>
            {isLogin ? "Enter your credentials" : "Join thousands of professionals"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => handleSocialAuth("google")} className="w-full">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialAuth("github")} className="w-full">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600" disabled={isLoading}>
              {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Switch */}
          <div className="text-center text-sm">
            <span>{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
