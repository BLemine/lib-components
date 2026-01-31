"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Activity,
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
  Cell,
} from "recharts"

const userGrowthData = [
  { month: "Jan", users: 1200, active: 980 },
  { month: "Feb", users: 1400, active: 1100 },
  { month: "Mar", users: 1650, active: 1350 },
  { month: "Apr", users: 1900, active: 1520 },
  { month: "May", users: 2200, active: 1800 },
  { month: "Jun", users: 2600, active: 2100 },
  { month: "Jul", users: 3000, active: 2450 },
  { month: "Aug", users: 3400, active: 2800 },
  { month: "Sep", users: 3900, active: 3200 },
  { month: "Oct", users: 4300, active: 3600 },
  { month: "Nov", users: 4800, active: 4000 },
  { month: "Dec", users: 5200, active: 4400 },
]

const usersByCountry = [
  { country: "United States", users: 2400, flag: "🇺🇸" },
  { country: "United Kingdom", users: 1200, flag: "🇬🇧" },
  { country: "Germany", users: 800, flag: "🇩🇪" },
  { country: "France", users: 600, flag: "🇫🇷" },
  { country: "Japan", users: 500, flag: "🇯🇵" },
]

const activityByHour = [
  { hour: "00", active: 120 },
  { hour: "04", active: 80 },
  { hour: "08", active: 340 },
  { hour: "12", active: 580 },
  { hour: "16", active: 620 },
  { hour: "20", active: 450 },
]

const recentUsers = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    status: "active",
    role: "Admin",
    joined: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    status: "active",
    role: "User",
    joined: "5 hours ago",
  },
  {
    id: 3,
    name: "Emma Thompson",
    email: "emma@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    status: "pending",
    role: "User",
    joined: "1 day ago",
  },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    status: "inactive",
    role: "User",
    joined: "2 days ago",
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
    status: "active",
    role: "Moderator",
    joined: "3 days ago",
  },
]

export interface UsersDashboardProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showGrowthChart?: boolean
  showLocationChart?: boolean
  showActivityChart?: boolean
  showRecentUsers?: boolean
}

export function UsersDashboard({
  title = "Users Dashboard",
  subtitle = "Monitor user growth, engagement, and activity",
  showHeader = true,
  showGrowthChart = true,
  showLocationChart = true,
  showActivityChart = true,
  showRecentUsers = true,
}: UsersDashboardProps) {
  const stats = [
    {
      title: "Total Users",
      value: "5,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Active Users",
      value: "4,420",
      change: "+8.2%",
      trend: "up",
      icon: UserCheck,
      description: "vs last month",
    },
    {
      title: "New Signups",
      value: "432",
      change: "+23.1%",
      trend: "up",
      icon: UserPlus,
      description: "this month",
    },
    {
      title: "Churn Rate",
      value: "2.4%",
      change: "-0.5%",
      trend: "down",
      icon: UserX,
      description: "vs last month",
    },
  ]

  const statusColors = {
    active: "bg-success text-success-foreground",
    pending: "bg-warning text-warning-foreground",
    inactive: "bg-muted text-muted-foreground",
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9 w-[200px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
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
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-success" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-success" />
                )}
                <span className="text-success">{stat.change}</span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* User Growth Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Total vs active users over time</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="users"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorActive)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Users by Country */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Users by Location
                </CardTitle>
                <CardDescription>Geographic distribution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersByCountry.map((country) => (
                <div key={country.country} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.country}</span>
                    </div>
                    <span className="font-medium">{country.users.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={(country.users / 2400) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Activity by Hour */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity by Hour
            </CardTitle>
            <CardDescription>Peak usage times today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityByHour}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                  <XAxis dataKey="hour" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="active" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">{user.role}</Badge>
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                      {user.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline">{user.joined}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
