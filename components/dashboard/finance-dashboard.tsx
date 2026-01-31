"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  PiggyBank,
  MoreHorizontal,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 3800, expenses: 2200 },
  { month: "Mar", revenue: 5100, expenses: 2800 },
  { month: "Apr", revenue: 4600, expenses: 2500 },
  { month: "May", revenue: 5800, expenses: 3000 },
  { month: "Jun", revenue: 6200, expenses: 3200 },
  { month: "Jul", revenue: 5900, expenses: 3100 },
  { month: "Aug", revenue: 6800, expenses: 3400 },
  { month: "Sep", revenue: 7200, expenses: 3600 },
  { month: "Oct", revenue: 6900, expenses: 3500 },
  { month: "Nov", revenue: 7800, expenses: 3800 },
  { month: "Dec", revenue: 8400, expenses: 4000 },
]

const expenseCategories = [
  { name: "Marketing", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Operations", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Payroll", value: 30, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 10, color: "hsl(var(--chart-4))" },
]

const weeklyRevenue = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 1800 },
  { day: "Wed", amount: 1400 },
  { day: "Thu", amount: 2200 },
  { day: "Fri", amount: 1900 },
  { day: "Sat", amount: 800 },
  { day: "Sun", amount: 600 },
]

const transactions = [
  { id: 1, name: "Stripe Payment", amount: "+$2,450.00", type: "income", date: "Today" },
  { id: 2, name: "AWS Services", amount: "-$349.00", type: "expense", date: "Today" },
  { id: 3, name: "Invoice #1234", amount: "+$1,200.00", type: "income", date: "Yesterday" },
  { id: 4, name: "Office Supplies", amount: "-$89.50", type: "expense", date: "Yesterday" },
  { id: 5, name: "Client Payment", amount: "+$5,000.00", type: "income", date: "2 days ago" },
]

export interface FinanceDashboardProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showExpenseChart?: boolean
  showWeeklyChart?: boolean
  showTransactions?: boolean
  defaultTimeRange?: "weekly" | "monthly" | "yearly"
}

export function FinanceDashboard({
  title = "Finance Dashboard",
  subtitle = "Track your revenue, expenses, and financial health",
  showHeader = true,
  showExpenseChart = true,
  showWeeklyChart = true,
  showTransactions = true,
  defaultTimeRange = "monthly",
}: FinanceDashboardProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: "$84,232",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Total Expenses",
      value: "$23,456",
      change: "+5.2%",
      trend: "up",
      icon: CreditCard,
      description: "vs last month",
    },
    {
      title: "Net Profit",
      value: "$60,776",
      change: "+18.2%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      title: "Savings",
      value: "$12,340",
      change: "+8.1%",
      trend: "up",
      icon: PiggyBank,
      description: "vs last month",
    },
  ]

  return (
    <div className="w-full max-w-7xl space-y-6 p-6">
      {/* Header */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue={defaultTimeRange} className="w-auto">
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>Download Report</Button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-success" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-destructive" />
                )}
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className={showExpenseChart ? "lg:col-span-4" : "lg:col-span-7"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly comparison for 2025</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        {showExpenseChart && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>By category this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                    <span className="text-sm font-medium ml-auto">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Row */}
      {(showWeeklyChart || showTransactions) && (
        <div className="grid gap-4 lg:grid-cols-7">
          {/* Weekly Revenue */}
          {showWeeklyChart && (
            <Card className={showTransactions ? "lg:col-span-3" : "lg:col-span-7"}>
              <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
                <CardDescription>Daily breakdown this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                      <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Transactions */}
          {showTransactions && (
            <Card className={showWeeklyChart ? "lg:col-span-4" : "lg:col-span-7"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activities</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "income" 
                            ? "bg-success/10 text-success" 
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.name}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${
                        transaction.type === "income" ? "text-success" : "text-destructive"
                      }`}>
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
