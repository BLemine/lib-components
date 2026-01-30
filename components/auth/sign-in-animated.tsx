"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function SignInAnimated() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Background glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-75 animate-pulse" />
      
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
        {/* Animated header gradient */}
        <div className="relative h-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary)/0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--accent)/0.2),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Floating particles */}
          <div className="absolute top-4 left-8 w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0s", animationDuration: "2s" }} />
          <div className="absolute top-8 right-12 w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
          <div className="absolute bottom-8 left-1/3 w-1 h-1 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-center text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-animated" className="text-sm font-medium">
                Email address
              </Label>
              <div className={cn(
                "relative group transition-all duration-300",
                focusedField === "email" && "scale-[1.02]"
              )}>
                <div className={cn(
                  "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 blur transition-opacity duration-300",
                  focusedField === "email" && "opacity-100"
                )} />
                <div className="relative">
                  <Mail className={cn(
                    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300",
                    focusedField === "email" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <Input
                    id="email-animated"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="pl-10 bg-background/50 border-border/50 transition-all duration-300 focus:bg-background"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-animated" className="text-sm font-medium">
                Password
              </Label>
              <div className={cn(
                "relative group transition-all duration-300",
                focusedField === "password" && "scale-[1.02]"
              )}>
                <div className={cn(
                  "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 blur transition-opacity duration-300",
                  focusedField === "password" && "opacity-100"
                )} />
                <div className="relative">
                  <Lock className={cn(
                    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300",
                    focusedField === "password" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <Input
                    id="password-animated"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="pl-10 pr-10 bg-background/50 border-border/50 transition-all duration-300 focus:bg-background"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground transition-transform hover:scale-110" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground transition-transform hover:scale-110" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-animated"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="transition-transform duration-200 hover:scale-110"
                />
                <Label htmlFor="remember-animated" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Button variant="link" className="px-0 text-sm text-primary hover:text-primary/80">
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full group relative overflow-hidden"
              disabled={isLoading}
            >
              <span className={cn(
                "flex items-center justify-center gap-2 transition-all duration-300",
                isLoading && "opacity-0"
              )}>
                Sign in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="group relative overflow-hidden border-border/50 bg-background/50 hover:bg-background transition-all duration-300 hover:scale-[1.02]"
            >
              <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="group relative overflow-hidden border-border/50 bg-background/50 hover:bg-background transition-all duration-300 hover:scale-[1.02]"
            >
              <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {"Don't have an account?"}{" "}
            <Button variant="link" className="px-0 text-primary hover:text-primary/80">
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
