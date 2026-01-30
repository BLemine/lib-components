import type { Meta, StoryObj } from "@storybook/react"
import { ProfileUI } from "@/components/profile/profile-ui"

const meta: Meta<typeof ProfileUI> = {
  title: "Profile/ProfileUI",
  component: ProfileUI,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ProfileUI>

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <ProfileUI />
    </div>
  ),
}
