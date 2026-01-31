import type { Meta, StoryObj } from "@storybook/react"
import { SignUpMultistep, type SignUpMultistepProps } from "@/components/auth/sign-up-multistep"

const meta: Meta<typeof SignUpMultistep> = {
  title: "Auth/SignUpMultistep",
  component: SignUpMultistep,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultStep: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5],
      description: "The initial step to display",
    },
    onComplete: {
      action: "completed",
      description: "Callback when signup is complete",
    },
  },
}

export default meta
type Story = StoryObj<typeof SignUpMultistep>

export const Default: Story = {
  args: {
    defaultStep: 1,
  },
  render: (args) => (
    <div className="p-6">
      <SignUpMultistep {...args} />
    </div>
  ),
}

export const EmailStep: Story = {
  args: {
    defaultStep: 1,
  },
  render: (args) => (
    <div className="p-6">
      <SignUpMultistep {...args} />
    </div>
  ),
}

export const OTPVerificationStep: Story = {
  args: {
    defaultStep: 2,
  },
  render: (args) => (
    <div className="p-6">
      <SignUpMultistep {...args} />
    </div>
  ),
}

export const PlanSelectionStep: Story = {
  args: {
    defaultStep: 3,
  },
  render: (args) => (
    <div className="p-6">
      <SignUpMultistep {...args} />
    </div>
  ),
}

export const PaymentStep: Story = {
  args: {
    defaultStep: 4,
  },
  render: (args) => (
    <div className="p-6">
      <SignUpMultistep {...args} />
    </div>
  ),
}

export const CongratulationsStep: Story = {
  args: {
    defaultStep: 5,
  },
  render: (args) => (
    <div className="p-6">
      <SignUpMultistep {...args} />
    </div>
  ),
}
