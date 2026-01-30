import type { Meta, StoryObj } from "@storybook/react"
import { BookingUI } from "@/components/booking/booking-ui"

const meta: Meta<typeof BookingUI> = {
  title: "Booking/BookingUI",
  component: BookingUI,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof BookingUI>

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <BookingUI />
    </div>
  ),
}
