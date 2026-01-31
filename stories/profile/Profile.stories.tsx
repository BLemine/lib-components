import type { Meta, StoryObj } from "@storybook/react"
import { ProfileUI, type ProfileUIProps } from "@/components/profile/profile-ui"

const meta: Meta<typeof ProfileUI> = {
  title: "Profile/ProfileUI",
  component: ProfileUI,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    showStats: {
      control: "boolean",
      description: "Show or hide the stats grid",
    },
    showHeader: {
      control: "boolean",
      description: "Show or hide the profile header card",
    },
    defaultTab: {
      control: "select",
      options: ["overview", "security", "notifications", "billing"],
      description: "The default selected tab",
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileUI>

export const Default: Story = {
  args: {
    showStats: true,
    showHeader: true,
    defaultTab: "overview",
  },
  render: (args) => (
    <div className="p-6">
      <ProfileUI {...args} />
    </div>
  ),
}

export const SecurityTab: Story = {
  args: {
    showStats: true,
    showHeader: true,
    defaultTab: "security",
  },
  render: (args) => (
    <div className="p-6">
      <ProfileUI {...args} />
    </div>
  ),
}

export const BillingTab: Story = {
  args: {
    showStats: true,
    showHeader: true,
    defaultTab: "billing",
  },
  render: (args) => (
    <div className="p-6">
      <ProfileUI {...args} />
    </div>
  ),
}
