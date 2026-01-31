"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DollarSign,
  Users,
  Calendar,
  Clock,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Banknote,
  CreditCard,
  FileText,
  Building2,
  TrendingUp,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

const payrollHistory = [
  { month: "Jul", amount: 142000 },
  { month: "Aug", amount: 148000 },
  { month: "Sep", amount: 145000 },
  { month: "Oct", amount: 152000 },
  { month: "Nov", amount: 156000 },
  { month: "Dec", amount: 168000 },
]

const departmentPayroll = [
  { department: "Engineering", amount: 85000, employees: 24 },
  { department: "Design", amount: 32000, employees: 8 },
  { department: "Marketing", amount: 28000, employees: 7 },
  { department: "Sales", amount: 45000, employees: 12 },
  { department: "Operations", amount: 22000, employees: 6 },
]

const employees = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Senior Engineer",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    salary: 9500,
    status: "paid",
    payDate: "Jan 25, 2026",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Designer",
    department: "Design",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    salary: 7800,
    status: "pending",
    payDate: "Jan 31, 2026",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Marketing Lead",
    department: "Marketing",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    salary: 8200,
    status: "paid",
    payDate: "Jan 25, 2026",
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "Sales Manager",
    department: "Sales",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    salary: 8800,
    status: "processing",
    payDate: "Jan 30, 2026",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "DevOps Engineer",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
    salary: 9200,
    status: "paid",
    payDate: "Jan 25, 2026",
  },
]

const recentPayments = [
  { id: 1, type: "Payroll", description: "January 2026 Payroll", amount: "$168,000", date: "Jan 25", status: "completed" },
  { id: 2, type: "Bonus", description: "Q4 Performance Bonus", amount: "$24,500", date: "Jan 15", status: "completed" },
  { id: 3, type: "Tax", description: "Federal Tax Payment", amount: "$42,000", date: "Jan 10", status: "completed" },
  { id: 4, type: "Benefits", description: "Health Insurance", amount: "$18,200", date: "Jan 5", status: "completed" },
]

export interface PayrollDashboardProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  defaultTab?: "overview" | "employees" | "history"
}

export function PayrollDashboard({
  title = "Payroll Management",
  subtitle = "Manage employee compensation and payments",
  showHeader = true,
  defaultTab = "overview",
}: PayrollDashboardProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const stats = [
    {
      title: "Total Payroll",
      value: "$168,000",
      change: "+8.2%",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Total Employees",
      value: "57",
      change: "+3",
      icon: Users,
      description: "Active payees",
    },
    {
      title: "Next Pay Date",
      value: "Jan 31",
      change: "5 days",
      icon: Calendar,
      description: "Upcoming",
    },
    {
      title: "Pending Payments",
      value: "12",
      change: "$42,800",
      icon: Clock,
      description: "To process",
    },
  ]

  const statusColors = {
    paid: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    processing: "bg-chart-1/10 text-chart-1",
  }

  const statusIcons = {
    paid: CheckCircle2,
    pending: AlertCircle,
    processing: Clock,
  }

  return (
    <div className="w-full max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Banknote className="h-4 w-4 mr-2" />
            Run Payroll
          </Button>
        </div>
      </div>

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
                <ArrowUpRight className="h-3 w-3 text-success" />
                <span className="text-success">{stat.change}</span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 lg:grid-cols-7">
            {/* Payroll Trend */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payroll Trend</CardTitle>
                    <CardDescription>Monthly payroll expenses</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={payrollHistory}>
                      <defs>
                        <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Payroll"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="hsl(var(--chart-1))"
                        fillOpacity={1}
                        fill="url(#colorPayroll)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* By Department */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  By Department
                </CardTitle>
                <CardDescription>Payroll distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPayroll.map((dept) => (
                    <div key={dept.department} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{dept.department}</span>
                          <Badge variant="secondary" className="text-xs">{dept.employees}</Badge>
                        </div>
                        <span className="text-muted-foreground">${dept.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={(dept.amount / 85000) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest payroll transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {payment.type === "Payroll" && <Banknote className="h-5 w-5 text-muted-foreground" />}
                        {payment.type === "Bonus" && <TrendingUp className="h-5 w-5 text-muted-foreground" />}
                        {payment.type === "Tax" && <FileText className="h-5 w-5 text-muted-foreground" />}
                        {payment.type === "Benefits" && <CreditCard className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{payment.amount}</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Employee Payroll</CardTitle>
                  <CardDescription>Manage individual compensation</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search employees..." className="pl-9 w-[200px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => {
                  const StatusIcon = statusIcons[employee.status as keyof typeof statusIcons]
                  return (
                    <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback>{employee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                          <Badge variant="secondary" className="text-xs mt-1">{employee.department}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold">${employee.salary.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Pay date: {employee.payDate}</p>
                        </div>
                        <Badge className={statusColors[employee.status as keyof typeof statusColors]}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll History</CardTitle>
              <CardDescription>Past payroll runs and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payrollHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Payroll"]}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
