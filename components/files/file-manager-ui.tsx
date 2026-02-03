"use client"

import React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
import {
  Cloud,
  Upload,
  Folder,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  Star,
  MoreVertical,
  Plus,
  ChevronRight,
  HardDrive,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  PieChart,
  Pie,
} from "recharts"

// Types
interface CloudStorage {
  id: string
  name: string
  icon: "dropbox" | "drive" | "onedrive"
  used: number
  total: number
  color: string
}

interface FolderItem {
  id: string
  name: string
  size: string
  files: number
  color: string
  sharedWith: { name: string; avatar: string }[]
  starred: boolean
}

interface FileItem {
  id: string
  name: string
  size: string
  date: string
  type: "image" | "video" | "audio" | "document" | "other"
  sharedWith: { name: string; avatar: string }[]
  starred: boolean
}

interface StorageBreakdown {
  type: string
  size: string
  files: number
  color: string
  icon: "image" | "video" | "document" | "other"
}

interface FileManagerUIProps {
  cloudStorages?: CloudStorage[]
  folders?: FolderItem[]
  files?: FileItem[]
  storageUsed?: number
  storageTotal?: number
  storageBreakdown?: StorageBreakdown[]
  showUpgradeBanner?: boolean
}

// Default data
const defaultCloudStorages: CloudStorage[] = [
  { id: "1", name: "Dropbox", icon: "dropbox", used: 19, total: 24, color: "#0061FF" },
  { id: "2", name: "Drive", icon: "drive", used: 19, total: 24, color: "#34A853" },
  { id: "3", name: "OneDrive", icon: "onedrive", used: 19, total: 24, color: "#0078D4" },
]

const defaultFolders: FolderItem[] = [
  {
    id: "1",
    name: "Docs",
    size: "2.3 GB",
    files: 100,
    color: "#FFC107",
    sharedWith: [{ name: "John", avatar: "/placeholder-user.jpg" }],
    starred: false,
  },
  {
    id: "2",
    name: "Projects",
    size: "2.3 GB",
    files: 100,
    color: "#FFC107",
    sharedWith: [
      { name: "Jane", avatar: "/placeholder-user.jpg" },
      { name: "Bob", avatar: "/placeholder-user.jpg" },
    ],
    starred: false,
  },
  {
    id: "3",
    name: "Work",
    size: "2.3 GB",
    files: 100,
    color: "#4CAF50",
    sharedWith: [
      { name: "Alice", avatar: "/placeholder-user.jpg" },
      { name: "Charlie", avatar: "/placeholder-user.jpg" },
    ],
    starred: false,
  },
]

const defaultFiles: FileItem[] = [
  {
    id: "1",
    name: "photos-donate-2015-sri-lanka-7048829-will-i-am.svg",
    size: "1.2 MB",
    date: "12 Aug 2022 10:00 PM",
    type: "image",
    sharedWith: [
      { name: "User 1", avatar: "/placeholder-user.jpg" },
      { name: "User 2", avatar: "/placeholder-user.jpg" },
    ],
    starred: false,
  },
  {
    id: "2",
    name: "design-suriname-2015.mp3",
    size: "2.5 MB",
    date: "11 Aug 2022 9:00 PM",
    type: "audio",
    sharedWith: [
      { name: "User 1", avatar: "/placeholder-user.jpg" },
      { name: "User 2", avatar: "/placeholder-user.jpg" },
    ],
    starred: false,
  },
  {
    id: "3",
    name: "expertise-2015-conakry-sao-tome-and-principe-gender.mp4",
    size: "3.7 MB",
    date: "10 Aug 2022 8:00 PM",
    type: "video",
    sharedWith: [{ name: "User 1", avatar: "/placeholder-user.jpg" }],
    starred: false,
  },
  {
    id: "4",
    name: "money-popup-crack.pdf",
    size: "4.9 MB",
    date: "09 Aug 2022 7:00 PM",
    type: "document",
    sharedWith: [
      { name: "User 1", avatar: "/placeholder-user.jpg" },
      { name: "User 2", avatar: "/placeholder-user.jpg" },
    ],
    starred: false,
  },
  {
    id: "5",
    name: "fraction-health-sao-tome-and-principe-helen-reddy-045706-sm-151104-ulan-bat...",
    size: "6.2 MB",
    date: "08 Aug 2022 6:00 PM",
    type: "document",
    sharedWith: [],
    starred: false,
  },
]

const defaultStorageBreakdown: StorageBreakdown[] = [
  { type: "Images", size: "3 GB", files: 12, color: "#4CAF50", icon: "image" },
  { type: "Media", size: "1 GB", files: 122, color: "#F44336", icon: "video" },
  { type: "Documents", size: "1 GB", files: 122, color: "#FFC107", icon: "document" },
  { type: "Other", size: "175 MB", files: 112, color: "#9E9E9E", icon: "other" },
]

const activityData = [
  { day: "Mon", images: 25, media: 15, documents: 20, other: 10 },
  { day: "Tue", images: 45, media: 35, documents: 25, other: 15 },
  { day: "Wed", images: 35, media: 25, documents: 30, other: 20 },
  { day: "Thu", images: 55, media: 45, documents: 35, other: 25 },
  { day: "Fri", images: 65, media: 55, documents: 45, other: 35 },
  { day: "Sat", images: 75, media: 65, documents: 55, other: 45 },
  { day: "Sun", images: 85, media: 75, documents: 65, other: 55 },
]

// Cloud storage icon component
function CloudIcon({ type, className }: { type: string; className?: string }) {
  if (type === "dropbox") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#0061FF">
          <path d="M6 2L0 6l6 4-6 4 6 4 6-4-6-4 6-4-6-4zm12 0l-6 4 6 4-6 4 6 4 6-4-6-4 6-4-6-4zM6 14l6 4 6-4-6-4-6 4z" />
        </svg>
      </div>
    )
  }
  if (type === "drive") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="h-8 w-8">
          <path fill="#4285F4" d="M4.5 15.5l-2 3.5h19l-2-3.5z" />
          <path fill="#FBBC05" d="M14.5 4l-7 12h-5l7-12z" />
          <path fill="#34A853" d="M21.5 19l-7-12h-5l7 12z" />
        </svg>
      </div>
    )
  }
  if (type === "onedrive") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#0078D4">
          <path d="M19.5 14c.3 0 .5 0 .8.1.2-1 .2-2-.1-3-.5-1.8-2-3.2-3.8-3.5-1-.2-2 0-2.9.5C12.3 6.8 10.8 6 9.2 6c-2.8 0-5 2.2-5 5 0 .3 0 .7.1 1C2.4 12.4 1 14 1 16c0 2.2 1.8 4 4 4h14.5c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5z" />
        </svg>
      </div>
    )
  }
  return <Cloud className={className} />
}

// File type icon component
function FileTypeIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "image":
      return <FileImage className={`${className} text-emerald-500`} />
    case "video":
      return <FileVideo className={`${className} text-rose-500`} />
    case "audio":
      return <FileAudio className={`${className} text-blue-500`} />
    case "document":
      return <FileText className={`${className} text-amber-500`} />
    default:
      return <File className={`${className} text-muted-foreground`} />
  }
}

// Storage icon component
function StorageIcon({ type, className }: { type: string; className?: string }) {
  const bgColors: Record<string, string> = {
    image: "bg-emerald-100",
    video: "bg-rose-100",
    document: "bg-amber-100",
    other: "bg-gray-100",
  }
  const iconColors: Record<string, string> = {
    image: "text-emerald-600",
    video: "text-rose-600",
    document: "text-amber-600",
    other: "text-gray-600",
  }
  
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColors[type] || bgColors.other} ${className}`}>
      <FileTypeIcon type={type} className={`h-5 w-5 ${iconColors[type] || iconColors.other}`} />
    </div>
  )
}

export function FileManagerUI({
  cloudStorages = defaultCloudStorages,
  folders = defaultFolders,
  files = defaultFiles,
  storageUsed = 24,
  storageTotal = 50,
  storageBreakdown = defaultStorageBreakdown,
  showUpgradeBanner = true,
}: FileManagerUIProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [period, setPeriod] = useState("week")
  const [starredFolders, setStarredFolders] = useState<Set<string>>(new Set())
  const [starredFiles, setStarredFiles] = useState<Set<string>>(new Set())

  const storagePercentage = Math.round((storageUsed / storageTotal) * 100)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }, [])

  const toggleFolderStar = (id: string) => {
    setStarredFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleFileStar = (id: string) => {
    setStarredFiles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Pie chart data for storage
  const pieData = [
    { name: "Used", value: storageUsed, fill: "#14B8A6" },
    { name: "Free", value: storageTotal - storageUsed, fill: "#E5E7EB" },
  ]

  return (
    <div className="flex h-full min-h-screen bg-muted/30">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Cloud Storage Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cloudStorages.map((storage) => (
            <Card key={storage.id} className="relative">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <CloudIcon type={storage.icon} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open</DropdownMenuItem>
                      <DropdownMenuItem>Sync</DropdownMenuItem>
                      <DropdownMenuItem>Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="mt-3 font-semibold">{storage.name}</h3>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {storage.used}GB / {storage.total} GB
                    </span>
                    <span className="text-muted-foreground">100%</span>
                  </div>
                  <Progress
                    value={(storage.used / storage.total) * 100}
                    className="h-2"
                    style={{ 
                      // @ts-ignore
                      "--progress-background": storage.color 
                    } as React.CSSProperties}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Activity Chart */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Data Activity</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {/* Legend */}
            <div className="mb-4 flex items-center justify-end gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">Images</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="text-xs text-muted-foreground">Media</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-xs text-muted-foreground">Documents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-400" />
                <span className="text-xs text-muted-foreground">Other</span>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} barGap={2}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Bar dataKey="images" fill="#10B981" radius={[2, 2, 0, 0]} barSize={8} />
                  <Bar dataKey="media" fill="#F43F5E" radius={[2, 2, 0, 0]} barSize={8} />
                  <Bar dataKey="documents" fill="#F59E0B" radius={[2, 2, 0, 0]} barSize={8} />
                  <Bar dataKey="other" fill="#9CA3AF" radius={[2, 2, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Folders Section */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">Folders</h2>
              <Button size="icon" variant="default" className="h-6 w-6 rounded-full bg-emerald-500 hover:bg-emerald-600">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder) => (
              <Card key={folder.id} className="group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${folder.color}20` }}
                    >
                      <Folder className="h-5 w-5" style={{ color: folder.color }} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleFolderStar(folder.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            starredFolders.has(folder.id)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <h3 className="mt-3 font-medium">{folder.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {folder.size} · {folder.files} files
                  </p>
                  {folder.sharedWith.length > 0 && (
                    <div className="mt-3 flex -space-x-2">
                      {folder.sharedWith.slice(0, 3).map((user, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {folder.sharedWith.length > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-xs font-medium text-emerald-700">
                          +{folder.sharedWith.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Files Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">Recent Files</h2>
              <Button size="icon" variant="default" className="h-6 w-6 rounded-full bg-emerald-500 hover:bg-emerald-600">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <Card>
            <ScrollArea className="h-[350px]">
              <div className="divide-y">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                  >
                    <FileTypeIcon type={file.type} className="h-6 w-6 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.size} · {file.date}
                      </p>
                    </div>
                    {file.sharedWith.length > 0 && (
                      <div className="flex -space-x-2">
                        {file.sharedWith.slice(0, 2).map((user, i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                        {file.sharedWith.length > 2 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-xs font-medium text-emerald-700">
                            +{file.sharedWith.length - 2}
                          </div>
                        )}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => toggleFileStar(file.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          starredFiles.has(file.id)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 border-l bg-background p-4">
        {/* Upload Area */}
        <Card
          className={`mb-6 border-2 border-dashed transition-colors ${
            isDragging ? "border-emerald-500 bg-emerald-50" : "border-muted-foreground/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Upload file</p>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card className="mb-6 bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardContent className="p-4">
            <div className="relative mx-auto mb-4 h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{storagePercentage}%</span>
                <span className="text-xs text-muted-foreground">
                  Used of {storageUsed} / {storageTotal} GB
                </span>
              </div>
            </div>

            {/* Storage Breakdown */}
            <div className="space-y-3">
              {storageBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StorageIcon type={item.icon} />
                    <div>
                      <p className="text-sm font-medium">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.files} files</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{item.size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Banner */}
        {showUpgradeBanner && (
          <Card className="overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
            <CardContent className="p-4 text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-emerald-200/50" />
                  <HardDrive className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-emerald-600" />
                </div>
              </div>
              <Button className="mb-2 bg-emerald-600 hover:bg-emerald-700">
                Upgrade Plan
              </Button>
              <p className="text-xs text-muted-foreground">
                Upgrade your plan and get more space
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
