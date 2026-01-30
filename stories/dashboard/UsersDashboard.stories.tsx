import type { Meta, StoryObj } from "@storybook/react"
import { UsersDashboard } from "@/components/dashboard/users-dashboard"

const meta: Meta<typeof UsersDashboard> = {
  title: "Dashboard/Users",
  component: UsersDashboard,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof UsersDashboard>

export const Default: Story = {
  render: () => <UsersDashboard />,
}
