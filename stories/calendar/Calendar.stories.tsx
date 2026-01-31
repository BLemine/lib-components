import type { Meta, StoryObj } from "@storybook/react"
import { AdvancedCalendar, type AdvancedCalendarProps } from "@/components/calendar/advanced-calendar"

const meta: Meta<typeof AdvancedCalendar> = {
  title: "Calendar/AdvancedCalendar",
  component: AdvancedCalendar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    showUpcomingEvents: {
      control: "boolean",
      description: "Show or hide the upcoming events section",
    },
    showEventDetails: {
      control: "boolean",
      description: "Show or hide event details sidebar",
    },
    defaultView: {
      control: "select",
      options: ["month", "week"],
      description: "The default calendar view",
    },
  },
}

export default meta
type Story = StoryObj<typeof AdvancedCalendar>

export const Default: Story = {
  args: {
    showUpcomingEvents: true,
    showEventDetails: true,
    defaultView: "month",
  },
  render: (args) => (
    <div className="p-6">
      <AdvancedCalendar {...args} />
    </div>
  ),
}

export const WeekView: Story = {
  args: {
    showUpcomingEvents: true,
    showEventDetails: true,
    defaultView: "week",
  },
  render: (args) => (
    <div className="p-6">
      <AdvancedCalendar {...args} />
    </div>
  ),
}
