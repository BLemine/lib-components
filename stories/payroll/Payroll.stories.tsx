import type { Meta, StoryObj } from "@storybook/react"
import { PayrollDashboard, type PayrollDashboardProps } from "@/components/payroll/payroll-dashboard"

const meta: Meta<typeof PayrollDashboard> = {
  title: "Payroll/PayrollDashboard",
  component: PayrollDashboard,
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
    defaultTab: {
      control: "select",
      options: ["overview", "employees", "history"],
      description: "The default selected tab",
    },
  },
}

export default meta
type Story = StoryObj<typeof PayrollDashboard>

export const Default: Story = {
  args: {
    title: "Payroll Management",
    subtitle: "Manage employee compensation and payments",
    showHeader: true,
    defaultTab: "overview",
  },
  render: (args) => <PayrollDashboard {...args} />,
}

export const EmployeesView: Story = {
  args: {
    title: "Employee Payroll",
    subtitle: "Individual compensation details",
    showHeader: true,
    defaultTab: "employees",
  },
  render: (args) => <PayrollDashboard {...args} />,
}

export const HistoryView: Story = {
  args: {
    title: "Payroll History",
    subtitle: "Past payments and trends",
    showHeader: true,
    defaultTab: "history",
  },
  render: (args) => <PayrollDashboard {...args} />,
}
