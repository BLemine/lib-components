import type { Meta, StoryObj } from "@storybook/react"
import { AdvancedCalendar } from "@/components/calendar/advanced-calendar"

const meta: Meta<typeof AdvancedCalendar> = {
  title: "Calendar/AdvancedCalendar",
  component: AdvancedCalendar,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof AdvancedCalendar>

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <AdvancedCalendar />
    </div>
  ),
}
