import type { Meta, StoryObj } from "@storybook/react"
import { FileManagerUI } from "@/components/files/file-manager-ui"

const meta: Meta<typeof FileManagerUI> = {
  title: "Files/FileManager",
  component: FileManagerUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    storageUsed: {
      control: { type: "range", min: 0, max: 50, step: 1 },
      description: "Amount of storage used in GB",
    },
    storageTotal: {
      control: { type: "range", min: 10, max: 100, step: 5 },
      description: "Total storage available in GB",
    },
    showUpgradeBanner: {
      control: "boolean",
      description: "Show or hide the upgrade banner",
    },
  },
}

export default meta
type Story = StoryObj<typeof FileManagerUI>

export const Default: Story = {
  args: {
    storageUsed: 24,
    storageTotal: 50,
    showUpgradeBanner: true,
  },
}

export const LowStorage: Story = {
  args: {
    storageUsed: 8,
    storageTotal: 50,
    showUpgradeBanner: false,
  },
}

export const HighStorage: Story = {
  args: {
    storageUsed: 48,
    storageTotal: 50,
    showUpgradeBanner: true,
  },
}

export const CustomCloudStorages: Story = {
  args: {
    cloudStorages: [
      { id: "1", name: "Dropbox", icon: "dropbox", used: 15, total: 20, color: "#0061FF" },
      { id: "2", name: "Drive", icon: "drive", used: 45, total: 100, color: "#34A853" },
    ],
    storageUsed: 24,
    storageTotal: 50,
  },
}

export const EmptyFolders: Story = {
  args: {
    folders: [],
    storageUsed: 5,
    storageTotal: 50,
    showUpgradeBanner: true,
  },
}

export const ManyFiles: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "project-presentation.pptx",
        size: "5.2 MB",
        date: "15 Jan 2024 2:30 PM",
        type: "document",
        sharedWith: [
          { name: "Alice", avatar: "/placeholder-user.jpg" },
          { name: "Bob", avatar: "/placeholder-user.jpg" },
          { name: "Charlie", avatar: "/placeholder-user.jpg" },
        ],
        starred: true,
      },
      {
        id: "2",
        name: "vacation-photo-001.jpg",
        size: "3.8 MB",
        date: "14 Jan 2024 11:00 AM",
        type: "image",
        sharedWith: [],
        starred: false,
      },
      {
        id: "3",
        name: "meeting-recording.mp4",
        size: "125 MB",
        date: "13 Jan 2024 4:00 PM",
        type: "video",
        sharedWith: [{ name: "Team", avatar: "/placeholder-user.jpg" }],
        starred: false,
      },
      {
        id: "4",
        name: "podcast-episode-42.mp3",
        size: "45 MB",
        date: "12 Jan 2024 9:00 AM",
        type: "audio",
        sharedWith: [],
        starred: true,
      },
      {
        id: "5",
        name: "quarterly-report-q4.pdf",
        size: "2.1 MB",
        date: "11 Jan 2024 3:00 PM",
        type: "document",
        sharedWith: [
          { name: "Finance", avatar: "/placeholder-user.jpg" },
          { name: "Management", avatar: "/placeholder-user.jpg" },
        ],
        starred: false,
      },
      {
        id: "6",
        name: "logo-final-v3.svg",
        size: "156 KB",
        date: "10 Jan 2024 10:00 AM",
        type: "image",
        sharedWith: [{ name: "Design", avatar: "/placeholder-user.jpg" }],
        starred: true,
      },
    ],
    storageUsed: 32,
    storageTotal: 50,
  },
}

export const WithoutUpgradeBanner: Story = {
  args: {
    showUpgradeBanner: false,
    storageUsed: 15,
    storageTotal: 100,
  },
}
