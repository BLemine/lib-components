import type { Meta, StoryObj } from "@storybook/react"
import { BankingDashboard, type BankingDashboardProps } from "@/components/banking/banking-dashboard"

const meta: Meta<typeof BankingDashboard> = {
  title: "Banking/BankingDashboard",
  component: BankingDashboard,
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
    showQuickTransfer: {
      control: "boolean",
      description: "Show or hide the quick transfer section",
    },
    showExpenseCategories: {
      control: "boolean",
      description: "Show or hide the expense categories chart",
    },
    showTransactions: {
      control: "boolean",
      description: "Show or hide the recent transactions table",
    },
    showContacts: {
      control: "boolean",
      description: "Show or hide the contacts list",
    },
    showInviteCard: {
      control: "boolean",
      description: "Show or hide the invite friends card",
    },
  },
}

export default meta
type Story = StoryObj<typeof BankingDashboard>

export const Default: Story = {
  args: {
    title: "Banking Dashboard",
    subtitle: "Manage your finances",
    showQuickTransfer: true,
    showExpenseCategories: true,
    showTransactions: true,
    showContacts: true,
    showInviteCard: true,
  },
  render: (args) => <BankingDashboard {...args} />,
}

export const MinimalView: Story = {
  args: {
    title: "Quick Overview",
    subtitle: "Your financial summary",
    showQuickTransfer: true,
    showExpenseCategories: false,
    showTransactions: false,
    showContacts: false,
    showInviteCard: false,
  },
  render: (args) => <BankingDashboard {...args} />,
}

export const AnalyticsView: Story = {
  args: {
    title: "Financial Analytics",
    subtitle: "Detailed expense breakdown",
    showQuickTransfer: false,
    showExpenseCategories: true,
    showTransactions: true,
    showContacts: false,
    showInviteCard: false,
  },
  render: (args) => <BankingDashboard {...args} />,
}

export const TransferFocus: Story = {
  args: {
    title: "Money Transfer",
    subtitle: "Send money to your contacts",
    showQuickTransfer: true,
    showExpenseCategories: false,
    showTransactions: false,
    showContacts: true,
    showInviteCard: true,
  },
  render: (args) => <BankingDashboard {...args} />,
}
