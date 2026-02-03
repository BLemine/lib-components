"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  Clock,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  CheckCircle2,
  Circle,
  AlertCircle,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Priority = "low" | "medium" | "high" | "urgent"
type TaskStatus = "backlog" | "todo" | "in-progress" | "review" | "done"

interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  status: TaskStatus
  assignees: { name: string; avatar: string }[]
  dueDate?: string
  comments: number
  attachments: number
  tags: string[]
  progress?: number
}

const initialColumns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "backlog", title: "Backlog", color: "bg-muted-foreground" },
  { id: "todo", title: "To Do", color: "bg-chart-1" },
  { id: "in-progress", title: "In Progress", color: "bg-chart-2" },
  { id: "review", title: "Review", color: "bg-chart-3" },
  { id: "done", title: "Done", color: "bg-success" },
]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new marketing landing page",
    priority: "high",
    status: "in-progress",
    assignees: [
      { name: "Sarah W.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" },
    ],
    dueDate: "Feb 15",
    comments: 8,
    attachments: 3,
    tags: ["Design", "Marketing"],
    progress: 65,
  },
  {
    id: "2",
    title: "Implement authentication flow",
    description: "Add OAuth and email/password authentication",
    priority: "urgent",
    status: "in-progress",
    assignees: [
      { name: "Michael C.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
      { name: "Emma T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
    ],
    dueDate: "Feb 10",
    comments: 12,
    attachments: 2,
    tags: ["Development", "Security"],
    progress: 40,
  },
  {
    id: "3",
    title: "Write API documentation",
    priority: "medium",
    status: "todo",
    assignees: [
      { name: "James R.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face" },
    ],
    dueDate: "Feb 20",
    comments: 3,
    attachments: 1,
    tags: ["Documentation"],
  },
  {
    id: "4",
    title: "Setup CI/CD pipeline",
    priority: "high",
    status: "review",
    assignees: [
      { name: "Michael C.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
    ],
    dueDate: "Feb 8",
    comments: 5,
    attachments: 0,
    tags: ["DevOps"],
  },
  {
    id: "5",
    title: "User research interviews",
    priority: "medium",
    status: "done",
    assignees: [
      { name: "Sarah W.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" },
      { name: "Emma T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
    ],
    comments: 15,
    attachments: 4,
    tags: ["Research", "UX"],
  },
  {
    id: "6",
    title: "Database optimization",
    priority: "low",
    status: "backlog",
    assignees: [],
    comments: 2,
    attachments: 0,
    tags: ["Backend"],
  },
  {
    id: "7",
    title: "Mobile responsive fixes",
    priority: "medium",
    status: "todo",
    assignees: [
      { name: "Emma T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
    ],
    dueDate: "Feb 18",
    comments: 4,
    attachments: 2,
    tags: ["Frontend", "Bug"],
  },
  {
    id: "8",
    title: "Analytics dashboard",
    priority: "high",
    status: "backlog",
    assignees: [],
    comments: 0,
    attachments: 1,
    tags: ["Feature", "Analytics"],
  },
]

const priorityConfig: Record<Priority, { label: string; color: string; icon: typeof Circle }> = {
  low: { label: "Low", color: "text-muted-foreground", icon: Circle },
  medium: { label: "Medium", color: "text-chart-2", icon: Circle },
  high: { label: "High", color: "text-chart-3", icon: AlertCircle },
  urgent: { label: "Urgent", color: "text-destructive", icon: Zap },
}

const tagColors: Record<string, string> = {
  Design: "bg-chart-1/10 text-chart-1",
  Marketing: "bg-chart-2/10 text-chart-2",
  Development: "bg-chart-3/10 text-chart-3",
  Security: "bg-destructive/10 text-destructive",
  Documentation: "bg-chart-4/10 text-chart-4",
  DevOps: "bg-chart-5/10 text-chart-5",
  Research: "bg-primary/10 text-primary",
  UX: "bg-chart-1/10 text-chart-1",
  Backend: "bg-chart-2/10 text-chart-2",
  Frontend: "bg-chart-3/10 text-chart-3",
  Bug: "bg-destructive/10 text-destructive",
  Feature: "bg-success/10 text-success",
  Analytics: "bg-chart-4/10 text-chart-4",
}

export interface KanbanUIProps {
  title?: string
  subtitle?: string
  showHeader?: boolean
  showFilters?: boolean
  showProgress?: boolean
}

export function KanbanUI({
  title = "Project Board",
  subtitle = "Track and manage your tasks",
  showHeader = true,
  showFilters = true,
  showProgress = true,
}: KanbanUIProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"board" | "list">("board")

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getColumnTasks = (status: TaskStatus) =>
    filteredTasks.filter(task => task.status === status)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === "done").length
  const overallProgress = Math.round((completedTasks / totalTasks) * 100)

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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "board" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("board")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      )}

      {/* Search and Progress */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {showProgress && (
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{completedTasks}</span> of {totalTasks} tasks completed
              </div>
              <div className="w-32">
                <Progress value={overallProgress} className="h-2" />
              </div>
              <span className="text-sm font-medium">{overallProgress}%</span>
            </div>
          )}
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {initialColumns.map((column) => {
          const columnTasks = getColumnTasks(column.id)
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-72"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", column.color)} />
                  <h3 className="font-medium">{column.title}</h3>
                  <Badge variant="secondary" className="h-5 min-w-5 flex items-center justify-center">
                    {columnTasks.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Tasks */}
              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="space-y-3 pr-2">
                  {columnTasks.map((task) => {
                    const PriorityIcon = priorityConfig[task.priority].icon
                    return (
                      <Card
                        key={task.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs font-medium",
                                  tagColors[tag] || "bg-muted text-muted-foreground"
                                )}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h4 className="font-medium mb-1">{task.title}</h4>
                          {task.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {task.description}
                            </p>
                          )}

                          {/* Progress */}
                          {task.progress !== undefined && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1.5" />
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Priority */}
                              <div className={cn("flex items-center gap-1", priorityConfig[task.priority].color)}>
                                <PriorityIcon className="h-3.5 w-3.5" />
                              </div>

                              {/* Due Date */}
                              {task.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{task.dueDate}</span>
                                </div>
                              )}

                              {/* Comments */}
                              {task.comments > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span>{task.comments}</span>
                                </div>
                              )}

                              {/* Attachments */}
                              {task.attachments > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Paperclip className="h-3.5 w-3.5" />
                                  <span>{task.attachments}</span>
                                </div>
                              )}
                            </div>

                            {/* Assignees */}
                            {task.assignees.length > 0 && (
                              <div className="flex -space-x-2">
                                {task.assignees.slice(0, 3).map((assignee, index) => (
                                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                                    <AvatarFallback className="text-xs">
                                      {assignee.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {task.assignees.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                                    +{task.assignees.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {/* Add Task Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add task
                  </Button>
                </div>
              </ScrollArea>
            </div>
          )
        })}
      </div>
    </div>
  )
}
