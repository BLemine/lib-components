"use client"

import { useState } from "react"
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  CreditCard,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Check,
  Clock,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"

export interface BankingDashboardProps {
  title?: string
  subtitle?: string
  showQuickTransfer?: boolean
  showExpenseCategories?: boolean
  showTransactions?: boolean
  showContacts?: boolean
  showInviteCard?: boolean
}

const balanceData = [
  { name: "Page A", income: 25, expense: 15 },
  { name: "Page B", income: 35, expense: 20 },
  { name: "Page C", income: 45, expense: 30 },
  { name: "Page D", income: 55, expense: 40 },
  { name: "Page E", income: 65, expense: 45 },
  { name: "Page F", income: 85, expense: 55 },
  { name: "Page G", income: 75, expense: 50 },
]

const incomeSparkline = [
  { value: 20 },
  { value: 25 },
  { value: 22 },
  { value: 30 },
  { value: 28 },
  { value: 35 },
  { value: 40 },
  { value: 38 },
  { value: 45 },
]

const expenseSparkline = [
  { value: 30 },
  { value: 25 },
  { value: 28 },
  { value: 22 },
  { value: 26 },
  { value: 20 },
  { value: 18 },
  { value: 22 },
  { value: 19 },
]

const expenseCategories = [
  { name: "Category 1", value: 25, color: "#22c55e" },
  { name: "Category 2", value: 18, color: "#3b82f6" },
  { name: "Category 3", value: 15, color: "#f59e0b" },
  { name: "Category 4", value: 12, color: "#ef4444" },
  { name: "Category 5", value: 10, color: "#8b5cf6" },
  { name: "Category 6", value: 8, color: "#06b6d4" },
  { name: "Category 7", value: 5, color: "#ec4899" },
  { name: "Category 8", value: 4, color: "#14b8a6" },
  { name: "Category 9", value: 3, color: "#f97316" },
]

const recentContacts = [
  { id: 1, name: "Esperanza", avatar: "/placeholder-user.jpg" },
  { id: 2, name: "Jayvion", avatar: "/placeholder-user.jpg" },
  { id: 3, name: "Hudson", avatar: "/placeholder-user.jpg" },
  { id: 4, name: "Izayah", avatar: "/placeholder-user.jpg" },
  { id: 5, name: "Ariana", avatar: "/placeholder-user.jpg" },
]

const contacts = [
  { id: 1, name: "Esperanza Mcintyre", email: "aditya_greenfelder31@gm...", avatar: "/placeholder-user.jpg" },
  { id: 2, name: "Jayvion Simon", email: "vergie_block82@hotmail.com", avatar: "/placeholder-user.jpg" },
  { id: 3, name: "Hudson Alvarez", email: "constantin91@yahoo.com", avatar: "/placeholder-user.jpg" },
  { id: 4, name: "Izayah Pope", email: "joana.simonis84@gmail.com", avatar: "/placeholder-user.jpg" },
  { id: 5, name: "Ariana Lang", email: "luella.ryan33@gmail.com", avatar: "/placeholder-user.jpg" },
]

const transactions = [
  { id: 1, type: "Received", name: "Melanie Noble", date: "07 Aug 2022", time: "4:00 PM", amount: "$87.55", status: "completed" },
  { id: 2, type: "Received", name: "Giana Brandt", date: "22 Oct 2022", time: "4:00 PM", amount: "$55.69", status: "progress" },
  { id: 3, type: "Payment", name: "Jace Bush", date: "04 Jan 2022", time: "4:00 PM", amount: "$55.47", status: "failed" },
  { id: 4, type: "Payment", name: "Reece Chung", date: "10 Sep 2022", time: "4:00 PM", amount: "$94.75", status: "completed" },
  { id: 5, type: "Payment", name: "Jace Bush", date: "07 Aug 2022", time: "4:00 PM", amount: "$12.45", status: "completed" },
]

export function BankingDashboard({
  title = "Banking Dashboard",
  subtitle = "Manage your finances",
  showQuickTransfer = true,
  showExpenseCategories = true,
  showTransactions = true,
  showContacts = true,
  showInviteCard = true,
}: BankingDashboardProps) {
  const [transferAmount, setTransferAmount] = useState([20])
  const [selectedContact, setSelectedContact] = useState<number | null>(1)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            <Check className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "progress":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <Clock className="mr-1 h-3 w-3" />
            Progress
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <X className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Income Card */}
              <Card className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-100">Income</p>
                      <p className="text-2xl font-bold mt-1">$9,990</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-emerald-100">
                        <TrendingUp className="h-3 w-3" />
                        <span>+8.2% than last month</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-white/20 p-2">
                      <ArrowDownLeft className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={incomeSparkline}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="rgba(255,255,255,0.8)"
                          fill="rgba(255,255,255,0.2)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Expenses Card */}
              <Card className="bg-gradient-to-br from-orange-300 to-orange-400 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-100">Expenses</p>
                      <p className="text-2xl font-bold mt-1">$1,989</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-orange-100">
                        <TrendingDown className="h-3 w-3" />
                        <span>-6.6% than last month</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-white/20 p-2">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={expenseSparkline}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="rgba(255,255,255,0.8)"
                          fill="rgba(255,255,255,0.2)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Current Balance Card */}
              <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0 overflow-hidden relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-teal-200">Current Balance</p>
                      <p className="text-2xl font-bold mt-1">$23,994.72</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-8 w-12 items-center justify-center rounded bg-gradient-to-r from-red-500 to-orange-500">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-teal-200">**** **** **** 6789</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-teal-300">Card Holder</p>
                      <p className="font-medium">Carlota Monteiro</p>
                    </div>
                    <div>
                      <p className="text-teal-300">Valid dates</p>
                      <p className="font-medium">11/22</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Balance Statistics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold">Balance Statistics</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    (+43% Income | +12% Expense) than last year
                  </p>
                </div>
                <Select defaultValue="year">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-muted-foreground">Income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                    <span className="text-sm text-muted-foreground">Expense</span>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={balanceData} barGap={4}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expenses Categories */}
            {showExpenseCategories && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Expenses Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="h-48 w-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={expenseCategories}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {expenseCategories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
                      {expenseCategories.map((category) => (
                        <div key={category.name} className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm text-muted-foreground">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Categories</p>
                      <p className="text-2xl font-bold">9</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total expenses</p>
                      <p className="text-2xl font-bold text-emerald-600">$18,765</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Transactions */}
            {showTransactions && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent Transitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{transaction.type}</p>
                                <p className="text-sm text-muted-foreground">{transaction.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{transaction.date}</p>
                              <p className="text-sm text-muted-foreground">{transaction.time}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{transaction.amount}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-center">
                    <Button variant="ghost" className="text-muted-foreground">
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Transfer */}
            {showQuickTransfer && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Quick Transfer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">RECENT</span>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      View All
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex justify-center gap-2">
                    {recentContacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContact(contact.id)}
                        className={`relative rounded-full p-0.5 transition-all ${
                          selectedContact === contact.id
                            ? "ring-2 ring-emerald-500 ring-offset-2"
                            : ""
                        }`}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{contact.name[0]}</AvatarFallback>
                        </Avatar>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">INSERT AMOUNT</span>
                    <div className="text-center">
                      <span className="text-4xl font-bold">
                        <span className="text-lg align-top">$</span>
                        {(transferAmount[0] * 49.95).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="relative pt-2">
                    <Slider
                      value={transferAmount}
                      onValueChange={setTransferAmount}
                      max={100}
                      step={1}
                      className="[&>span:first-child]:bg-emerald-100 [&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500 [&>span:first-child>span]:bg-emerald-500"
                    />
                    <div
                      className="absolute -top-1 flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs text-white"
                      style={{ left: `calc(${transferAmount[0]}% - 12px)` }}
                    >
                      {transferAmount[0]}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your Balance</span>
                    <span className="font-semibold">$34,212.00</span>
                  </div>
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    Transfer Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Contacts */}
            {showContacts && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">Contacts</CardTitle>
                      <p className="text-sm text-muted-foreground">You have 122 contacts</p>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      View All
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{contact.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Invite Friends */}
            {showInviteCard && (
              <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-semibold">Invite friends</p>
                      <p className="text-lg font-semibold">and earn</p>
                    </div>
                    <span className="text-4xl font-bold text-emerald-300">$50</span>
                  </div>
                  <p className="mt-3 text-sm text-teal-200">
                    Praesent egestas tristique nibh. Duis lobortis massa imperdiet quam.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Input
                      placeholder="Email"
                      className="bg-white/10 border-0 text-white placeholder:text-teal-200"
                    />
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      Invite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
