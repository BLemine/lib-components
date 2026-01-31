import type { Meta, StoryObj } from "@storybook/react"
import { UsersDashboard, type UsersDashboardProps } from "@/components/dashboard/users-dashboard"

const meta: Meta<typeof UsersDashboard> = {
  title: "Dashboard/Users",
  component: UsersDashboard,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the dashboard",
    },
    subtitle: {
      control: "text",
      description: "The subtitle/description text",
    },
    showHeader: {
      control: "boolean",
      description: "Show or hide the header section",
    },
    showGrowthChart: {
      control: "boolean",
      description: "Show or hide the user growth chart",
    },
    showLocationChart: {
      control: "boolean",
      description: "Show or hide the users by location chart",
    },
    showActivityChart: {
      control: "boolean",
      description: "Show or hide the activity by hour chart",
    },
    showRecentUsers: {
      control: "boolean",
      description: "Show or hide the recent users list",
    },
  },
}

export default meta
type Story = StoryObj<typeof UsersDashboard>

export const Default: Story = {
  args: {
    title: "Users Dashboard",
    subtitle: "Monitor user growth, engagement, and activity",
    showHeader: true,
    showGrowthChart: true,
    showLocationChart: true,
    showActivityChart: true,
    showRecentUsers: true,
  },
  render: (args) => <UsersDashboard {...args} />,
}

export const ChartsOnly: Story = {
  args: {
    title: "User Analytics",
    subtitle: "Visual overview of user metrics",
    showHeader: true,
    showGrowthChart: true,
    showLocationChart: true,
    showActivityChart: true,
    showRecentUsers: false,
  },
  render: (args) => <UsersDashboard {...args} />,
}
