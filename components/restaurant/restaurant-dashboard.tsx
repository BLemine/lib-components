"use client"

import { useState } from "react"
import {
  ChefHat,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Utensils,
  ShoppingBag,
  Star,
  MoreHorizontal,
  Plus,
  Search,
  Bell,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Types
interface Order {
  id: string
  tableNumber: number
  items: { name: string; quantity: number; price: number }[]
  status: "pending" | "preparing" | "ready" | "served" | "cancelled"
  time: string
  total: number
  server: string
}

interface Table {
  id: number
  capacity: number
  status: "available" | "occupied" | "reserved" | "cleaning"
  guests?: number
  server?: string
  orderTotal?: number
}

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  ordersToday: number
  rating: number
  image?: string
}

interface StaffMember {
  id: string
  name: string
  role: string
  status: "active" | "break" | "off"
  avatar?: string
  ordersServed: number
  rating: number
}

interface RestaurantDashboardProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showTableMap?: boolean
  showLiveOrders?: boolean
  showMenuPerformance?: boolean
  showStaffOverview?: boolean
}

// Sample data
const revenueData = [
  { time: "10AM", revenue: 1200, orders: 15 },
  { time: "11AM", revenue: 2100, orders: 28 },
  { time: "12PM", revenue: 4500, orders: 52 },
  { time: "1PM", revenue: 5200, orders: 61 },
  { time: "2PM", revenue: 3800, orders: 45 },
  { time: "3PM", revenue: 2200, orders: 26 },
  { time: "4PM", revenue: 1800, orders: 22 },
  { time: "5PM", revenue: 2600, orders: 32 },
  { time: "6PM", revenue: 4800, orders: 58 },
  { time: "7PM", revenue: 5800, orders: 72 },
  { time: "8PM", revenue: 6200, orders: 78 },
  { time: "9PM", revenue: 4100, orders: 48 },
]

const categoryData = [
  { name: "Main Course", value: 42, color: "#10b981" },
  { name: "Appetizers", value: 28, color: "#3b82f6" },
  { name: "Desserts", value: 15, color: "#f59e0b" },
  { name: "Beverages", value: 15, color: "#8b5cf6" },
]

const defaultOrders: Order[] = [
  {
    id: "ORD-001",
    tableNumber: 5,
    items: [
      { name: "Grilled Salmon", quantity: 2, price: 28 },
      { name: "Caesar Salad", quantity: 1, price: 12 },
    ],
    status: "preparing",
    time: "12 min ago",
    total: 68,
    server: "Sarah M.",
  },
  {
    id: "ORD-002",
    tableNumber: 12,
    items: [
      { name: "Ribeye Steak", quantity: 1, price: 42 },
      { name: "Truffle Fries", quantity: 1, price: 14 },
    ],
    status: "ready",
    time: "8 min ago",
    total: 56,
    server: "John D.",
  },
  {
    id: "ORD-003",
    tableNumber: 3,
    items: [
      { name: "Pasta Carbonara", quantity: 3, price: 18 },
      { name: "Tiramisu", quantity: 2, price: 10 },
    ],
    status: "pending",
    time: "2 min ago",
    total: 74,
    server: "Emily R.",
  },
  {
    id: "ORD-004",
    tableNumber: 8,
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 16 },
    ],
    status: "served",
    time: "25 min ago",
    total: 16,
    server: "Mike T.",
  },
]

const defaultTables: Table[] = [
  { id: 1, capacity: 2, status: "available" },
  { id: 2, capacity: 2, status: "occupied", guests: 2, server: "Sarah M.", orderTotal: 45 },
  { id: 3, capacity: 4, status: "occupied", guests: 3, server: "Emily R.", orderTotal: 74 },
  { id: 4, capacity: 4, status: "reserved" },
  { id: 5, capacity: 4, status: "occupied", guests: 4, server: "Sarah M.", orderTotal: 68 },
  { id: 6, capacity: 6, status: "available" },
  { id: 7, capacity: 6, status: "cleaning" },
  { id: 8, capacity: 4, status: "occupied", guests: 2, server: "Mike T.", orderTotal: 16 },
  { id: 9, capacity: 2, status: "available" },
  { id: 10, capacity: 8, status: "reserved" },
  { id: 11, capacity: 4, status: "available" },
  { id: 12, capacity: 4, status: "occupied", guests: 4, server: "John D.", orderTotal: 56 },
]

const defaultMenuItems: MenuItem[] = [
  { id: "1", name: "Grilled Salmon", category: "Main Course", price: 28, ordersToday: 48, rating: 4.8 },
  { id: "2", name: "Ribeye Steak", category: "Main Course", price: 42, ordersToday: 36, rating: 4.9 },
  { id: "3", name: "Pasta Carbonara", category: "Main Course", price: 18, ordersToday: 52, rating: 4.7 },
  { id: "4", name: "Caesar Salad", category: "Appetizers", price: 12, ordersToday: 41, rating: 4.5 },
  { id: "5", name: "Tiramisu", category: "Desserts", price: 10, ordersToday: 28, rating: 4.9 },
]

const defaultStaff: StaffMember[] = [
  { id: "1", name: "Sarah Martinez", role: "Server", status: "active", ordersServed: 24, rating: 4.9 },
  { id: "2", name: "John Davis", role: "Server", status: "active", ordersServed: 18, rating: 4.7 },
  { id: "3", name: "Emily Rodriguez", role: "Server", status: "active", ordersServed: 21, rating: 4.8 },
  { id: "4", name: "Mike Thompson", role: "Server", status: "break", ordersServed: 15, rating: 4.6 },
  { id: "5", name: "Chef Antonio", role: "Head Chef", status: "active", ordersServed: 0, rating: 5.0 },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-amber-500/20 text-amber-600", icon: AlertCircle },
  preparing: { label: "Preparing", color: "bg-blue-500/20 text-blue-600", icon: Timer },
  ready: { label: "Ready", color: "bg-emerald-500/20 text-emerald-600", icon: CheckCircle2 },
  served: { label: "Served", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-600", icon: XCircle },
}

const tableStatusConfig = {
  available: { label: "Available", color: "bg-emerald-500/20 border-emerald-500 text-emerald-600" },
  occupied: { label: "Occupied", color: "bg-blue-500/20 border-blue-500 text-blue-600" },
  reserved: { label: "Reserved", color: "bg-amber-500/20 border-amber-500 text-amber-600" },
  cleaning: { label: "Cleaning", color: "bg-muted border-muted-foreground/30 text-muted-foreground" },
}

export function RestaurantDashboard({
  title = "Restaurant Dashboard",
  subtitle = "Real-time overview",
  showHeader = true,
  showTableMap = true,
  showLiveOrders = true,
  showMenuPerformance = true,
  showStaffOverview = true,
}: RestaurantDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [orders] = useState<Order[]>(defaultOrders)
  const [tables] = useState<Table[]>(defaultTables)
  const [menuItems] = useState<MenuItem[]>(defaultMenuItems)
  const [staff] = useState<StaffMember[]>(defaultStaff)

  const stats = {
    revenue: 42850,
    revenueChange: 12.5,
    orders: 387,
    ordersChange: 8.2,
    avgOrderValue: 110.72,
    avgOrderChange: 3.8,
    guests: 542,
    guestsChange: -2.1,
  }

  const occupiedTables = tables.filter(t => t.status === "occupied").length
  const totalTables = tables.length
  const occupancyRate = Math.round((occupiedTables / totalTables) * 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {showHeader && (
        <div className="border-b border-border bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders, tables..." className="pl-9 w-64" />
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="py-0 gap-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1">${stats.revenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-500">+{stats.revenueChange}%</span>
                    <span className="text-xs text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="py-0 gap-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold mt-1">{stats.orders}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-500">+{stats.ordersChange}%</span>
                    <span className="text-xs text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="py-0 gap-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-2xl font-bold mt-1">${stats.avgOrderValue.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-500">+{stats.avgOrderChange}%</span>
                    <span className="text-xs text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="py-0 gap-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Guests</p>
                  <p className="text-2xl font-bold mt-1">{stats.guests}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                    <span className="text-xs text-red-500">{stats.guestsChange}%</span>
                    <span className="text-xs text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-violet-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Revenue Chart */}
          <div className="col-span-8">
            <Card className="py-0 gap-0">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Revenue & Orders</CardTitle>
                    <p className="text-sm text-muted-foreground">Hourly breakdown</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Orders</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#colorRevenue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table Occupancy */}
          <div className="col-span-4">
            <Card className="py-0 gap-0 h-full">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Table Occupancy</CardTitle>
                  <Badge variant="outline">{occupancyRate}% full</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative h-32 w-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { value: occupiedTables, fill: "#3b82f6" },
                            { value: tables.filter(t => t.status === "available").length, fill: "#10b981" },
                            { value: tables.filter(t => t.status === "reserved").length, fill: "#f59e0b" },
                            { value: tables.filter(t => t.status === "cleaning").length, fill: "#6b7280" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={55}
                          dataKey="value"
                          strokeWidth={0}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">{occupiedTables}</span>
                      <span className="text-xs text-muted-foreground">/ {totalTables}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(tableStatusConfig).map(([key, config]) => {
                    const count = tables.filter(t => t.status === key).length
                    return (
                      <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                        <div className={cn("h-3 w-3 rounded-full", config.color.split(" ")[0])} />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">{config.label}</p>
                          <p className="text-sm font-medium">{count}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table Map */}
          {showTableMap && (
            <div className="col-span-8">
              <Card className="py-0 gap-0">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Floor Plan</CardTitle>
                      <p className="text-sm text-muted-foreground">Real-time table status</p>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      New Reservation
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-6 gap-3">
                    {tables.map((table) => {
                      const config = tableStatusConfig[table.status]
                      return (
                        <div
                          key={table.id}
                          className={cn(
                            "relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105",
                            config.color
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">T{table.id}</span>
                            <Utensils className="h-3 w-3" />
                          </div>
                          <p className="text-xs text-muted-foreground">{table.capacity} seats</p>
                          {table.status === "occupied" && (
                            <>
                              <p className="text-xs mt-1">{table.guests} guests</p>
                              <p className="text-xs font-medium text-emerald-600">${table.orderTotal}</p>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Live Orders */}
          {showLiveOrders && (
            <div className="col-span-4">
              <Card className="py-0 gap-0 h-full">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Live Orders</CardTitle>
                      <p className="text-sm text-muted-foreground">{orders.filter(o => o.status !== "served").length} active</p>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-[280px]">
                    <div className="space-y-3">
                      {orders.map((order) => {
                        const config = statusConfig[order.status]
                        const StatusIcon = config.icon
                        return (
                          <div key={order.id} className="p-3 rounded-lg border border-border bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{order.id}</span>
                                <Badge variant="outline" className="text-xs">Table {order.tableNumber}</Badge>
                              </div>
                              <Badge className={cn("text-xs", config.color)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {config.label}
                              </Badge>
                            </div>
                            <div className="space-y-1 mb-2">
                              {order.items.slice(0, 2).map((item, idx) => (
                                <p key={idx} className="text-xs text-muted-foreground">
                                  {item.quantity}x {item.name}
                                </p>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-xs text-muted-foreground">+{order.items.length - 2} more</p>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{order.time}</span>
                              <span className="font-medium">${order.total}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Menu Performance */}
          {showMenuPerformance && (
            <div className="col-span-6">
              <Card className="py-0 gap-0">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Top Menu Items</CardTitle>
                      <p className="text-sm text-muted-foreground">By orders today</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View full menu</DropdownMenuItem>
                        <DropdownMenuItem>Export report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {menuItems.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Utensils className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.ordersToday} orders</p>
                          <div className="flex items-center gap-1 justify-end">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs text-muted-foreground">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Category Breakdown */}
          <div className="col-span-3">
            <Card className="py-0 gap-0 h-full">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-base">Order Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[140px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-xs">{cat.name}</span>
                      </div>
                      <span className="text-xs font-medium">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Overview */}
          {showStaffOverview && (
            <div className="col-span-3">
              <Card className="py-0 gap-0 h-full">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Staff On Duty</CardTitle>
                    <Badge variant="outline">{staff.filter(s => s.status === "active").length} active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {staff.slice(0, 4).map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs">{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          member.status === "active" ? "bg-emerald-500" : member.status === "break" ? "bg-amber-500" : "bg-muted"
                        )} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
