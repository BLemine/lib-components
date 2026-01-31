"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Send,
  Paperclip,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  User,
  Mail,
  Phone,
  MoreVertical,
  Star,
  Tag,
  ArrowRight,
  Inbox,
  Archive,
  Trash2,
  RefreshCw,
  ChevronDown,
  Filter,
  HelpCircle,
  Book,
  Zap,
  LifeBuoy,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TicketStatus = "open" | "pending" | "resolved" | "closed"
type TicketPriority = "low" | "medium" | "high" | "urgent"

interface Ticket {
  id: string
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  customer: {
    name: string
    email: string
    avatar?: string
  }
  assignee?: {
    name: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
  tags: string[]
  messages: number
}

const tickets: Ticket[] = [
  {
    id: "TK-1234",
    subject: "Unable to access dashboard after update",
    description: "After the latest update, I'm getting a 403 error when trying to access the dashboard. This is blocking my work.",
    status: "open",
    priority: "urgent",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    assignee: {
      name: "Sarah W.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    },
    createdAt: "2 hours ago",
    updatedAt: "30 min ago",
    tags: ["Bug", "Dashboard"],
    messages: 5,
  },
  {
    id: "TK-1233",
    subject: "How to export data to CSV?",
    description: "I need to export my analytics data to CSV format for a report. Can you help me find this feature?",
    status: "pending",
    priority: "medium",
    customer: {
      name: "Emily Chen",
      email: "emily.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
    assignee: {
      name: "Michael C.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    createdAt: "5 hours ago",
    updatedAt: "1 hour ago",
    tags: ["Question", "Export"],
    messages: 3,
  },
  {
    id: "TK-1232",
    subject: "Request for custom integration",
    description: "We need a custom integration with Salesforce for our team. Is this possible with the Enterprise plan?",
    status: "open",
    priority: "high",
    customer: {
      name: "David Miller",
      email: "david.m@company.com",
    },
    createdAt: "Yesterday",
    updatedAt: "3 hours ago",
    tags: ["Feature Request", "Integration"],
    messages: 8,
  },
  {
    id: "TK-1231",
    subject: "Billing question about annual plan",
    description: "I was charged twice for the annual subscription. Please help resolve this.",
    status: "resolved",
    priority: "high",
    customer: {
      name: "Lisa Johnson",
      email: "lisa.j@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
    },
    assignee: {
      name: "Emma T.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
    createdAt: "2 days ago",
    updatedAt: "Yesterday",
    tags: ["Billing"],
    messages: 6,
  },
  {
    id: "TK-1230",
    subject: "Performance issues on mobile app",
    description: "The mobile app is very slow when loading large datasets. Takes over 10 seconds.",
    status: "open",
    priority: "medium",
    customer: {
      name: "Robert Wilson",
      email: "robert.w@startup.io",
    },
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
    tags: ["Bug", "Mobile", "Performance"],
    messages: 2,
  },
]

const statusConfig: Record<TicketStatus, { label: string; color: string; bgColor: string }> = {
  open: { label: "Open", color: "text-chart-1", bgColor: "bg-chart-1/10" },
  pending: { label: "Pending", color: "text-chart-2", bgColor: "bg-chart-2/10" },
  resolved: { label: "Resolved", color: "text-success", bgColor: "bg-success/10" },
  closed: { label: "Closed", color: "text-muted-foreground", bgColor: "bg-muted" },
}

const priorityConfig: Record<TicketPriority, { label: string; color: string }> = {
  low: { label: "Low", color: "text-muted-foreground" },
  medium: { label: "Medium", color: "text-chart-2" },
  high: { label: "High", color: "text-chart-3" },
  urgent: { label: "Urgent", color: "text-destructive" },
}

const quickReplies = [
  "Thank you for contacting support. I'm looking into this now.",
  "Could you please provide more details about the issue?",
  "I've escalated this to our technical team. You'll hear back within 24 hours.",
  "This issue has been resolved. Please let me know if you need anything else.",
]

export interface SupportUIProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showStats?: boolean
  showQuickReplies?: boolean
  defaultTab?: "inbox" | "assigned" | "resolved"
}

export function SupportUI({
  title = "Support Center",
  subtitle = "Manage customer inquiries and tickets",
  showHeader = true,
  showStats = true,
  showQuickReplies = true,
  defaultTab = "inbox",
}: SupportUIProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [reply, setReply] = useState("")
  const [activeTab, setActiveTab] = useState(defaultTab)

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openTickets = tickets.filter(t => t.status === "open").length
  const pendingTickets = tickets.filter(t => t.status === "pending").length
  const resolvedToday = 12

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
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Inbox className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{openTickets}</p>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingTickets}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{resolvedToday}</p>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.4h</p>
                  <p className="text-sm text-muted-foreground">Avg. Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        {/* Tickets List */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="flex-1 flex flex-col">
            <TabsList className="mx-4 mb-2">
              <TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger>
              <TabsTrigger value="assigned" className="flex-1">Assigned</TabsTrigger>
              <TabsTrigger value="resolved" className="flex-1">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="flex-1 mt-0">
              <ScrollArea className="h-[460px]">
                <div className="px-4 space-y-2">
                  {filteredTickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors",
                        selectedTicket?.id === ticket.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted border border-transparent"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              statusConfig[ticket.status].bgColor,
                              statusConfig[ticket.status].color
                            )}
                          >
                            {statusConfig[ticket.status].label}
                          </Badge>
                          <span className={cn("text-xs font-medium", priorityConfig[ticket.priority].color)}>
                            {priorityConfig[ticket.priority].label}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{ticket.createdAt}</span>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-1">{ticket.subject}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {ticket.customer.name} - {ticket.id}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {ticket.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {ticket.messages > 0 && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                            <MessageSquare className="h-3 w-3" />
                            {ticket.messages}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Ticket Detail */}
        {selectedTicket ? (
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className={cn(
                        statusConfig[selectedTicket.status].bgColor,
                        statusConfig[selectedTicket.status].color
                      )}
                    >
                      {statusConfig[selectedTicket.status].label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{selectedTicket.id}</span>
                  </div>
                  <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <div className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                {/* Customer Info */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedTicket.customer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedTicket.customer.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedTicket.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedTicket.customer.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Assignee */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Assigned To</h4>
                  {selectedTicket.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedTicket.assignee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedTicket.assignee.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{selectedTicket.assignee.name}</span>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Assign
                    </Button>
                  )}
                </div>

                {/* Quick Replies */}
                {showQuickReplies && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Quick Replies</h4>
                    <div className="space-y-2">
                      {quickReplies.map((qr, index) => (
                        <button
                          key={index}
                          onClick={() => setReply(qr)}
                          className="w-full p-2 text-left text-sm rounded-lg border hover:bg-muted transition-colors"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>

              {/* Reply Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Save Draft
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="h-[600px] flex items-center justify-center">
            <div className="text-center">
              <LifeBuoy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium">No ticket selected</h3>
              <p className="text-sm text-muted-foreground">Select a ticket to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
