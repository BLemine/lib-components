"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Clock,
  MapPin,
  Users,
  Video,
  CalendarDays,
} from "lucide-react"
import { cn } from "@/lib/utils"

const events = [
  {
    id: 1,
    title: "Team Standup",
    time: "09:00 - 09:30",
    type: "meeting",
    color: "bg-chart-1",
    day: 15,
    attendees: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    ],
    location: "Zoom",
  },
  {
    id: 2,
    title: "Product Review",
    time: "11:00 - 12:00",
    type: "review",
    color: "bg-chart-2",
    day: 15,
    attendees: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    ],
    location: "Meeting Room A",
  },
  {
    id: 3,
    title: "Design Sprint",
    time: "14:00 - 16:00",
    type: "workshop",
    color: "bg-chart-3",
    day: 16,
    attendees: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    ],
    location: "Design Lab",
  },
  {
    id: 4,
    title: "Client Call",
    time: "10:00 - 10:45",
    type: "call",
    color: "bg-chart-4",
    day: 17,
    attendees: [],
    location: "Google Meet",
  },
  {
    id: 5,
    title: "Q4 Planning",
    time: "13:00 - 15:00",
    type: "meeting",
    color: "bg-chart-1",
    day: 18,
    attendees: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
    ],
    location: "Conference Room",
  },
  {
    id: 6,
    title: "1:1 with Manager",
    time: "16:00 - 16:30",
    type: "meeting",
    color: "bg-chart-5",
    day: 20,
    attendees: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    ],
    location: "Office",
  },
]

const upcomingEvents = [
  { title: "Team Standup", time: "Today, 09:00", type: "meeting" },
  { title: "Product Review", time: "Today, 11:00", type: "review" },
  { title: "Design Sprint", time: "Tomorrow, 14:00", type: "workshop" },
  { title: "Client Call", time: "Jan 17, 10:00", type: "call" },
]

export function AdvancedCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 15))
  const [selectedDay, setSelectedDay] = useState(15)
  const [view, setView] = useState<"month" | "week">("month")

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    const days = []
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true })
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false })
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.day === day)
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const selectedDayEvents = getEventsForDay(selectedDay)

  return (
    <div className="w-full max-w-6xl">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main Calendar */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border p-1">
                  <Button
                    variant={view === "month" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 px-3"
                    onClick={() => setView("month")}
                  >
                    Month
                  </Button>
                  <Button
                    variant={view === "week" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 px-3"
                    onClick={() => setView("week")}
                  >
                    Week
                  </Button>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((dayInfo, index) => {
                const dayEvents = dayInfo.isCurrentMonth ? getEventsForDay(dayInfo.day) : []
                const isSelected = dayInfo.isCurrentMonth && dayInfo.day === selectedDay
                const isToday = dayInfo.isCurrentMonth && dayInfo.day === 15

                return (
                  <button
                    key={index}
                    onClick={() => dayInfo.isCurrentMonth && setSelectedDay(dayInfo.day)}
                    className={cn(
                      "relative h-24 p-1 border rounded-lg transition-all hover:bg-muted/50 text-left",
                      !dayInfo.isCurrentMonth && "bg-muted/20 text-muted-foreground",
                      isSelected && "ring-2 ring-primary bg-primary/5",
                      isToday && !isSelected && "bg-primary/10"
                    )}
                  >
                    <span className={cn(
                      "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm",
                      isToday && "bg-primary text-primary-foreground font-semibold"
                    )}>
                      {dayInfo.day}
                    </span>
                    <div className="space-y-0.5 mt-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={cn(
                            "text-xs px-1.5 py-0.5 rounded truncate text-foreground",
                            event.color
                          )}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <p className="text-xs text-muted-foreground pl-1">
                          +{dayEvents.length - 2} more
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Day Events */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {monthNames[currentDate.getMonth()]} {selectedDay}
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {selectedDayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDayEvents.map(event => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn("w-1 h-full min-h-[60px] rounded-full", event.color)} />
                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="font-medium text-sm">{event.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3" />
                                {event.time}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {event.location.includes("Zoom") || event.location.includes("Meet") ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <MapPin className="h-3 w-3" />
                              )}
                              {event.location}
                            </div>
                            {event.attendees.length > 0 && (
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <div className="flex -space-x-2">
                                  {event.attendees.map((avatar, i) => (
                                    <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                      <AvatarImage src={avatar || "/placeholder.svg"} />
                                      <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center">
                    <CalendarDays className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">No events scheduled</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Event
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      event.type === "meeting" && "bg-chart-1",
                      event.type === "review" && "bg-chart-2",
                      event.type === "workshop" && "bg-chart-3",
                      event.type === "call" && "bg-chart-4"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
