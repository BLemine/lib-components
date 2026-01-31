"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  Shield,
  CreditCard,
  PartyPopper,
  Zap,
  Crown,
  Building2,
  Lock
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface SignUpMultistepProps {
  onComplete?: (data: FormData) => void
  defaultStep?: number
}

interface FormData {
  email: string
  otp: string
  plan: "starter" | "pro" | "enterprise"
  cardNumber: string
  expiryDate: string
  cvc: string
  cardName: string
}

const steps = [
  { id: 1, title: "Email", icon: Mail },
  { id: 2, title: "Verify", icon: Shield },
  { id: 3, title: "Plan", icon: Sparkles },
  { id: 4, title: "Payment", icon: CreditCard },
  { id: 5, title: "Done", icon: PartyPopper },
]

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals",
    icon: Zap,
    features: ["5 projects", "Basic analytics", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing teams",
    icon: Crown,
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "API access"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations",
    icon: Building2,
    features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"],
  },
]

export function SignUpMultistep({ onComplete, defaultStep = 1 }: SignUpMultistepProps) {
  const [currentStep, setCurrentStep] = useState(defaultStep)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: "",
    plan: "pro",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardName: "",
  })

  const handleNext = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
    
    if (currentStep === 4) {
      onComplete?.(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.email.includes("@") && formData.email.includes(".")
      case 2:
        return formData.otp.length === 6
      case 3:
        return !!formData.plan
      case 4:
        return (
          formData.cardNumber.length >= 16 &&
          formData.expiryDate.length >= 4 &&
          formData.cvc.length >= 3 &&
          formData.cardName.length > 0
        )
      default:
        return true
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="w-full max-w-xl">
      <Card className="border-border/50 shadow-xl">
        {/* Progress header */}
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                      currentStep > step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep === step.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted bg-muted/50 text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 transition-colors duration-300",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {/* Step 1: Email */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl">Get started</CardTitle>
                <CardDescription>Enter your email to create your account</CardDescription>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12 h-12 text-base"
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  We will send a verification code to this email
                </p>
              </div>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl">Verify your email</CardTitle>
                <CardDescription>
                  Enter the 6-digit code sent to <span className="font-medium text-foreground">{formData.email}</span>
                </CardDescription>
              </div>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={formData.otp}
                  onChange={(value) => setFormData({ ...formData, otp: value })}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Did not receive the code?{" "}
                <Button variant="link" className="px-0 h-auto text-sm">
                  Resend
                </Button>
              </p>
            </div>
          )}

          {/* Step 3: Plan Selection */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl">Choose your plan</CardTitle>
                <CardDescription>Select the plan that best fits your needs</CardDescription>
              </div>

              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, plan: plan.id as FormData["plan"] })}
                    className={cn(
                      "relative flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all duration-200 hover:bg-muted/50",
                      formData.plan === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2.5 right-4 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                        Popular
                      </div>
                    )}
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        formData.plan === plan.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <plan.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-semibold">{plan.name}</h3>
                        <div className="text-right">
                          <span className="text-xl font-bold">{plan.price}</span>
                          <span className="text-sm text-muted-foreground">{plan.period}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        formData.plan === plan.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {formData.plan === plan.id && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl">Payment details</CardTitle>
                <CardDescription>
                  You selected the <span className="font-medium text-foreground capitalize">{formData.plan}</span> plan
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      maxLength={19}
                      className="pl-12 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expiryDate: formatExpiry(e.target.value),
                        })
                      }
                      maxLength={5}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        maxLength={4}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Congratulations */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in zoom-in-95 fade-in duration-500">
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <PartyPopper className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Welcome aboard!</CardTitle>
                <CardDescription className="text-base">
                  Your account has been created successfully. You are now on the{" "}
                  <span className="font-medium text-foreground capitalize">{formData.plan}</span> plan.
                </CardDescription>
              </div>

              <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                <h4 className="font-medium">What is next?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Explore your dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Set up your first project
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Invite your team members
                  </li>
                </ul>
              </div>

              <Button className="w-full h-12 text-base font-medium">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Navigation buttons */}
          {currentStep < 5 && (
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 px-6 bg-transparent"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button
                className="flex-1 h-12 text-base font-medium"
                onClick={handleNext}
                disabled={!canProceed() || isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    {currentStep === 4 ? "Complete Setup" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
