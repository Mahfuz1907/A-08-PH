"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const handleSubmit = async(e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData) as Record<string, string>
    
    const { data, error } = await signIn.email({
    email: userData.email, 
    password: userData.password, 
    rememberMe: true, 
    });

    if(data){
        toast.success(`Logged in successfully`, { position: "top-center" })
        router.push('/')
    }else if(error){
        toast.error(`Login failed`, {position: 'top-center'})
    }
  }

  const handleGoogleSignIn = async() => {
    const {data, error} = await signIn.social({
      provider: 'google'
    })

    if(data){
      toast.success('User registered successfully', {position: 'top-center'})
      router.push('/')
    }else if(error){
      toast.error('Registration failed', {position: 'top-center'})
    }
   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full px-4 max-w-md border-border bg-card text-foreground shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="you@example.com"
                className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-indigo-500"
              />
            </div>

            {/* Password Field with Eye Icon & Forgot Password Link */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium mt-2"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground/70">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Google Button (Google Only) */}
          <Button 
            variant="outline" 
            onClick={handleGoogleSignIn}
            type="button" 
            className="w-full border-border bg-muted/40 text-foreground/90 hover:bg-muted hover:text-foreground"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </Button>

          {/* Register Link */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sky-600 dark:text-sky-400 underline hover:text-sky-700 dark:hover:text-sky-300">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}