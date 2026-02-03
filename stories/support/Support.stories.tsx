import type { Meta, StoryObj } from "@storybook/react"
import { SupportUI, type SupportUIProps } from "@/components/support/support-ui"

const meta: Meta<typeof SupportUI> = {
  title: "Support/SupportUI",
  component: SupportUI,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the support center",
    },
    subtitle: {
      control: "text",
      description: "The subtitle/description text",
    },
    showHeader: {
      control: "boolean",
      description: "Show or hide the header section",
    },
    showStats: {
      control: "boolean",
      description: "Show or hide the stats cards",
    },
    showQuickReplies: {
      control: "boolean",
      description: "Show or hide quick reply suggestions",
    },
    defaultTab: {
      control: "select",
      options: ["inbox", "assigned", "resolved"],
      description: "The default selected tab",
    },
  },
}

export default meta
type Story = StoryObj<typeof SupportUI>

export const Default: Story = {
  args: {
    title: "Support Center",
    subtitle: "Manage customer inquiries and tickets",
    showHeader: true,
    showStats: true,
    showQuickReplies: true,
    defaultTab: "inbox",
  },
  render: (args) => <SupportUI {...args} />,
}

export const AssignedView: Story = {
  args: {
    title: "My Tickets",
    subtitle: "Tickets assigned to you",
    showHeader: true,
    showStats: true,
    showQuickReplies: true,
    defaultTab: "assigned",
  },
  render: (args) => <SupportUI {...args} />,
}

export const WithoutStats: Story = {
  args: {
    title: "Help Desk",
    subtitle: "Customer support tickets",
    showHeader: true,
    showStats: false,
    showQuickReplies: true,
    defaultTab: "inbox",
  },
  render: (args) => <SupportUI {...args} />,
}

export const Compact: Story = {
  args: {
    title: "Tickets",
    subtitle: "Quick access",
    showHeader: false,
    showStats: false,
    showQuickReplies: false,
    defaultTab: "inbox",
  },
  render: (args) => <SupportUI {...args} />,
}
