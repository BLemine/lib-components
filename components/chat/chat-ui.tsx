"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  ImageIcon,
  Mic,
  Plus,
  Settings,
  Circle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    lastMessage: "That sounds great! Let me check...",
    time: "2m ago",
    unread: 3,
    online: true,
  },
  {
    id: 2,
    name: "Design Team",
    avatar: "",
    lastMessage: "Alex: Updated the mockups",
    time: "15m ago",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    lastMessage: "Thanks for the update!",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    lastMessage: "Can we schedule a call?",
    time: "3h ago",
    unread: 1,
    online: false,
  },
  {
    id: 5,
    name: "Project Alpha",
    avatar: "",
    lastMessage: "James: Deployment complete",
    time: "Yesterday",
    unread: 0,
    online: false,
    isGroup: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "Sarah Wilson",
    content: "Hey! How's the project going?",
    time: "10:30 AM",
    isOwn: false,
    status: "read",
  },
  {
    id: 2,
    sender: "You",
    content: "Going well! Just finished the main features. Should be ready for review by EOD.",
    time: "10:32 AM",
    isOwn: true,
    status: "read",
  },
  {
    id: 3,
    sender: "Sarah Wilson",
    content: "That's awesome! Can you share the preview link when it's ready?",
    time: "10:33 AM",
    isOwn: false,
    status: "read",
  },
  {
    id: 4,
    sender: "You",
    content: "Sure thing! I'll send it over in about an hour.",
    time: "10:35 AM",
    isOwn: true,
    status: "delivered",
  },
  {
    id: 5,
    sender: "Sarah Wilson",
    content: "Perfect! Also, the client mentioned they want to add a few more features. I'll send over the requirements doc.",
    time: "10:40 AM",
    isOwn: false,
    status: "read",
  },
  {
    id: 6,
    sender: "You",
    content: "No problem, I'll take a look. Do we have a timeline for those?",
    time: "10:42 AM",
    isOwn: true,
    status: "delivered",
  },
  {
    id: 7,
    sender: "Sarah Wilson",
    content: "That sounds great! Let me check with the team and get back to you on the timeline.",
    time: "10:45 AM",
    isOwn: false,
    status: "read",
  },
]

export interface ChatUIProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showConversationList?: boolean
  showUserInfo?: boolean
}

export function ChatUI({
  title = "Messages",
  subtitle = "Stay connected with your team",
  showHeader = true,
  showConversationList = true,
  showUserInfo = true,
}: ChatUIProps) {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full max-w-6xl h-[700px] border rounded-xl overflow-hidden bg-background">
      <div className="flex h-full">
        {/* Conversations Sidebar */}
        {showConversationList && (
          <div className="w-80 border-r flex flex-col">
            {/* Sidebar Header */}
            {showHeader && (
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Conversations List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                      activeConversation.id === conversation.id
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>
                          {conversation.isGroup ? conversation.name.slice(0, 2).toUpperCase() : conversation.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{conversation.name}</span>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <Badge className="h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* New Chat Button */}
            <div className="p-3 border-t">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                  <AvatarFallback>
                    {activeConversation.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-background" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">{activeConversation.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.online ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Date Separator */}
              <div className="flex items-center gap-4 my-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground bg-background px-2">Today</span>
                <Separator className="flex-1" />
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isOwn ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2.5",
                      message.isOwn
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className={cn(
                      "flex items-center gap-1 mt-1",
                      message.isOwn ? "justify-end" : "justify-start"
                    )}>
                      <span className={cn(
                        "text-xs",
                        message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {message.time}
                      </span>
                      {message.isOwn && (
                        message.status === "read" ? (
                          <CheckCheck className="h-3.5 w-3.5 text-primary-foreground/70" />
                        ) : (
                          <Check className="h-3.5 w-3.5 text-primary-foreground/70" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="pr-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      // Handle send
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Mic className="h-5 w-5" />
              </Button>
              <Button size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* User Info Sidebar */}
        {showUserInfo && (
          <div className="w-72 border-l p-4 hidden xl:block">
            <div className="text-center mb-6">
              <Avatar className="h-20 w-20 mx-auto mb-3">
                <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                <AvatarFallback className="text-xl">
                  {activeConversation.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{activeConversation.name}</h3>
              <p className="text-sm text-muted-foreground">
                {activeConversation.online ? "Active now" : "Away"}
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Shared Media</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-muted flex items-center justify-center"
                    >
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View All
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Shared Files</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                      <Paperclip className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Project_Brief.pdf</p>
                      <p className="text-xs text-muted-foreground">2.4 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
