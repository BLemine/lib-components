"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LogIn, 
  UserPlus, 
  User, 
  LayoutDashboard, 
  Users, 
  Calendar,
  DollarSign,
  CalendarCheck,
  Wallet,
  BookOpen,
  Sparkles,
  MessageSquare,
  Columns3,
  LifeBuoy,
  Landmark,
} from "lucide-react"

import { SignInSimple } from "@/components/auth/sign-in-simple"
import { SignInAnimated } from "@/components/auth/sign-in-animated"
import { SignUpSimple } from "@/components/auth/sign-up-simple"
import { SignUpAnimated } from "@/components/auth/sign-up-animated"
import { SignUpMultistep } from "@/components/auth/sign-up-multistep"
import { ProfileUI } from "@/components/profile/profile-ui"
import { FinanceDashboard } from "@/components/dashboard/finance-dashboard"
import { UsersDashboard } from "@/components/dashboard/users-dashboard"
import { AdvancedCalendar } from "@/components/calendar/advanced-calendar"
import { PayrollDashboard } from "@/components/payroll/payroll-dashboard"
import { BookingUI } from "@/components/booking/booking-ui"
import { WalletUI } from "@/components/wallet/wallet-ui"
import { ChatUI } from "@/components/chat/chat-ui"
import { KanbanUI } from "@/components/kanban/kanban-ui"
import { SupportUI } from "@/components/support/support-ui"
import { BankingDashboard } from "@/components/banking/banking-dashboard"

const components = [
  {
    id: "signin-simple",
    name: "Sign In (Simple)",
    category: "Auth",
    icon: LogIn,
  },
  {
    id: "signin-animated",
    name: "Sign In (Animated)",
    category: "Auth",
    icon: Sparkles,
  },
  {
    id: "signup-simple",
    name: "Sign Up (Simple)",
    category: "Auth",
    icon: UserPlus,
  },
  {
    id: "signup-animated",
    name: "Sign Up (Animated)",
    category: "Auth",
    icon: Sparkles,
  },
  {
    id: "signup-multistep",
    name: "Sign Up (Multi-Step)",
    category: "Auth",
    icon: UserPlus,
  },
  {
    id: "profile",
    name: "Profile UI",
    category: "Profile",
    icon: User,
  },
  {
    id: "finance-dashboard",
    name: "Finance Dashboard",
    category: "Dashboard",
    icon: DollarSign,
  },
  {
    id: "users-dashboard",
    name: "Users Dashboard",
    category: "Dashboard",
    icon: Users,
  },
  {
    id: "calendar",
    name: "Advanced Calendar",
    category: "Calendar",
    icon: Calendar,
  },
  {
    id: "payroll",
    name: "Payroll Dashboard",
    category: "Payroll",
    icon: DollarSign,
  },
  {
    id: "booking",
    name: "Booking UI",
    category: "Booking",
    icon: CalendarCheck,
  },
  {
    id: "wallet",
    name: "Wallet UI",
    category: "Wallet",
    icon: Wallet,
  },
  {
    id: "chat",
    name: "Chat UI",
    category: "Chat",
    icon: MessageSquare,
  },
  {
    id: "kanban",
    name: "Kanban Board",
    category: "Kanban",
    icon: Columns3,
  },
  {
    id: "support",
    name: "Customer Support",
    category: "Support",
    icon: LifeBuoy,
  },
  {
    id: "banking",
    name: "Banking Dashboard",
    category: "Banking",
    icon: Landmark,
  },
]

export default function ComponentsShowcase() {
  const [activeComponent, setActiveComponent] = useState("signin-simple")

  const renderComponent = () => {
    switch (activeComponent) {
      case "signin-simple":
        return <SignInSimple />
      case "signin-animated":
        return <SignInAnimated />
      case "signup-simple":
        return <SignUpSimple />
      case "signup-animated":
        return <SignUpAnimated />
      case "signup-multistep":
        return <SignUpMultistep />
      case "profile":
        return <ProfileUI />
      case "finance-dashboard":
        return <FinanceDashboard />
      case "users-dashboard":
        return <UsersDashboard />
      case "calendar":
        return <AdvancedCalendar />
      case "payroll":
        return <PayrollDashboard />
      case "booking":
        return <BookingUI />
      case "wallet":
        return <WalletUI />
      case "chat":
        return <ChatUI />
      case "kanban":
        return <KanbanUI />
      case "support":
        return <SupportUI />
      case "banking":
        return <BankingDashboard />
      default:
        return <SignInSimple />
    }
  }

  const categories = [...new Set(components.map(c => c.category))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Component Library</h1>
              <p className="text-xs text-muted-foreground">Storybook Preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{components.length} Components</Badge>
            <Button variant="outline" size="sm">
              <code className="text-xs">npm run storybook</code>
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex">
        {/* Sidebar */}
        <aside className="w-64 border-r min-h-[calc(100vh-4rem)] sticky top-16 self-start">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4 space-y-6">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {components
                      .filter(c => c.category === category)
                      .map(component => (
                        <button
                          key={component.id}
                          onClick={() => setActiveComponent(component.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeComponent === component.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <component.icon className="h-4 w-4" />
                          <span className="truncate">{component.name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {components.find(c => c.id === activeComponent)?.name}
              </h2>
              <p className="text-muted-foreground">
                Category: {components.find(c => c.id === activeComponent)?.category}
              </p>
            </div>
            
            <div className="rounded-xl border bg-card/50 p-8 min-h-[600px] flex items-start justify-center overflow-auto">
              {renderComponent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
