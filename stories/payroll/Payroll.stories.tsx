import type { Meta, StoryObj } from "@storybook/react"
import { PayrollDashboard } from "@/components/payroll/payroll-dashboard"

const meta: Meta<typeof PayrollDashboard> = {
  title: "Payroll/PayrollDashboard",
  component: PayrollDashboard,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof PayrollDashboard>

export const Default: Story = {
  render: () => <PayrollDashboard />,
}
