import type { Meta, StoryObj } from "@storybook/react"
import { FinanceDashboard } from "@/components/dashboard/finance-dashboard"

const meta: Meta<typeof FinanceDashboard> = {
  title: "Dashboard/Finance",
  component: FinanceDashboard,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof FinanceDashboard>

export const Default: Story = {
  render: () => <FinanceDashboard />,
}
