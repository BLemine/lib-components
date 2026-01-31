import type { Meta, StoryObj } from "@storybook/react"
import { FinanceDashboard, type FinanceDashboardProps } from "@/components/dashboard/finance-dashboard"

const meta: Meta<typeof FinanceDashboard> = {
  title: "Dashboard/Finance",
  component: FinanceDashboard,
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
      description: "Show or hide the header section with title and time range tabs",
    },
    showExpenseChart: {
      control: "boolean",
      description: "Show or hide the expense breakdown pie chart",
    },
    showWeeklyChart: {
      control: "boolean",
      description: "Show or hide the weekly revenue bar chart",
    },
    showTransactions: {
      control: "boolean",
      description: "Show or hide the recent transactions list",
    },
    defaultTimeRange: {
      control: "select",
      options: ["weekly", "monthly", "yearly"],
      description: "The default selected time range",
    },
  },
}

export default meta
type Story = StoryObj<typeof FinanceDashboard>

export const Default: Story = {
  args: {
    title: "Finance Dashboard",
    subtitle: "Track your revenue, expenses, and financial health",
    showHeader: true,
    showExpenseChart: true,
    showWeeklyChart: true,
    showTransactions: true,
    defaultTimeRange: "monthly",
  },
  render: (args) => <FinanceDashboard {...args} />,
}

export const CompactView: Story = {
  args: {
    title: "Finance Overview",
    subtitle: "Quick financial snapshot",
    showHeader: true,
    showExpenseChart: false,
    showWeeklyChart: false,
    showTransactions: false,
    defaultTimeRange: "monthly",
  },
  render: (args) => <FinanceDashboard {...args} />,
}

export const ChartsOnly: Story = {
  args: {
    title: "Financial Charts",
    subtitle: "Visual representation of your finances",
    showHeader: true,
    showExpenseChart: true,
    showWeeklyChart: true,
    showTransactions: false,
    defaultTimeRange: "yearly",
  },
  render: (args) => <FinanceDashboard {...args} />,
}
