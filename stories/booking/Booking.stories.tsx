import type { Meta, StoryObj } from "@storybook/react"
import { BookingUI, type BookingUIProps } from "@/components/booking/booking-ui"

const meta: Meta<typeof BookingUI> = {
  title: "Booking/BookingUI",
  component: BookingUI,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the booking form",
    },
    description: {
      control: "text",
      description: "The description text below the title",
    },
    showTestimonials: {
      control: "boolean",
      description: "Show or hide testimonials section in sidebar",
    },
    showContactInfo: {
      control: "boolean",
      description: "Show or hide contact info section in sidebar",
    },
    showSummary: {
      control: "boolean",
      description: "Show or hide booking summary in sidebar",
    },
  },
}

export default meta
type Story = StoryObj<typeof BookingUI>

export const Default: Story = {
  args: {
    title: "Book a Session",
    description: "Schedule your consultation in a few steps",
    showTestimonials: true,
    showContactInfo: true,
    showSummary: true,
  },
  render: (args) => (
    <div className="p-6">
      <BookingUI {...args} />
    </div>
  ),
}

export const MinimalSidebar: Story = {
  args: {
    title: "Schedule Appointment",
    description: "Quick and easy booking",
    showTestimonials: false,
    showContactInfo: false,
    showSummary: true,
  },
  render: (args) => (
    <div className="p-6">
      <BookingUI {...args} />
    </div>
  ),
}
