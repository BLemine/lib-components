"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  CreditCard,
  Send,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  Copy,
  Eye,
  EyeOff,
  QrCode,
  RefreshCw,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"

const balanceHistory = [
  { date: "Jan 1", balance: 8500 },
  { date: "Jan 5", balance: 9200 },
  { date: "Jan 10", balance: 8800 },
  { date: "Jan 15", balance: 10500 },
  { date: "Jan 20", balance: 11200 },
  { date: "Jan 25", balance: 12450 },
  { date: "Jan 30", balance: 12847 },
]

const cards = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    name: "Alex Johnson",
    expiry: "12/28",
    balance: "$5,234.00",
    color: "from-chart-1 to-chart-2",
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    name: "Alex Johnson",
    expiry: "08/27",
    balance: "$2,847.50",
    color: "from-chart-3 to-chart-4",
  },
]

const transactions = [
  {
    id: 1,
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: "-$15.99",
    type: "expense",
    date: "Today",
    icon: "play",
  },
  {
    id: 2,
    name: "Salary Deposit",
    category: "Income",
    amount: "+$4,500.00",
    type: "income",
    date: "Yesterday",
    icon: "dollar",
  },
  {
    id: 3,
    name: "Amazon Purchase",
    category: "Shopping",
    amount: "-$89.99",
    type: "expense",
    date: "Jan 28",
    icon: "shopping",
  },
  {
    id: 4,
    name: "Transfer to Sarah",
    category: "Transfer",
    amount: "-$200.00",
    type: "expense",
    date: "Jan 27",
    icon: "send",
  },
  {
    id: 5,
    name: "Freelance Payment",
    category: "Income",
    amount: "+$850.00",
    type: "income",
    date: "Jan 25",
    icon: "dollar",
  },
]

const quickActions = [
  { icon: Send, label: "Send", color: "bg-chart-1" },
  { icon: Download, label: "Request", color: "bg-chart-2" },
  { icon: CreditCard, label: "Pay", color: "bg-chart-3" },
  { icon: RefreshCw, label: "Exchange", color: "bg-chart-4" },
]

const contacts = [
  { name: "Sarah W.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" },
  { name: "Michael C.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
  { name: "Emma T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
  { name: "James R.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face" },
]

export interface WalletUIProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showCards?: boolean
  showQuickSend?: boolean
  showSecurity?: boolean
  showQuickActions?: boolean
  showTransactions?: boolean
}

export function WalletUI({
  title = "My Wallet",
  subtitle = "Manage your money and cards",
  showHeader = true,
  showCards = true,
  showQuickSend = true,
  showSecurity = true,
  showQuickActions = true,
  showTransactions = true,
}: WalletUIProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [activeCard, setActiveCard] = useState(0)

  const totalBalance = 12847.52
  const monthlyIncome = 5350.00
  const monthlyExpenses = 2456.78

  return (
    <div className="w-full max-w-6xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <QrCode className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Money
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Balance Card */}
          <Card className="overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">Total Balance</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold">
                    {showBalance ? `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "$••••••"}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success">+12.5%</span>
                    <span className="text-muted-foreground">this month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowDownRight className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">Income</span>
                    </div>
                    <p className="font-semibold text-success">
                      +${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowUpRight className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">Expenses</span>
                    </div>
                    <p className="font-semibold text-destructive">
                      -${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={balanceHistory}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#colorBalance)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="flex-col h-auto py-4 gap-2 bg-transparent"
              >
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-foreground", action.color)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        transaction.type === "income" ? "bg-success/10 text-success" : "bg-muted"
                      )}>
                        {transaction.type === "income" ? (
                          <ArrowDownRight className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-semibold",
                        transaction.type === "income" ? "text-success" : "text-foreground"
                      )}>
                        {transaction.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cards */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">My Cards</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => setActiveCard(index)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left text-foreground transition-all",
                    `bg-gradient-to-br ${card.color}`,
                    activeCard === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-bold">{card.type}</span>
                    <Sparkles className="h-5 w-5 opacity-60" />
                  </div>
                  <p className="text-lg font-mono tracking-wider mb-4">•••• •••• •••• {card.last4}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">{card.name}</span>
                    <span className="opacity-80">{card.expiry}</span>
                  </div>
                </button>
              ))}
              
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Card Balance</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <p className="text-xl font-bold">{cards[activeCard].balance}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Send */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Send</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {contacts.map((contact) => (
                  <button key={contact.name} className="flex flex-col items-center gap-2 flex-shrink-0">
                    <Avatar className="h-12 w-12 ring-2 ring-background hover:ring-primary transition-all">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{contact.name}</span>
                  </button>
                ))}
                <button className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="h-12 w-12 rounded-full border-2 border-dashed flex items-center justify-center hover:border-primary transition-colors">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">Add</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-sm font-medium">2FA Enabled</span>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last login</span>
                <span className="text-sm">Today, 10:45 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Device</span>
                <span className="text-sm">MacBook Pro</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                Manage Security
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
