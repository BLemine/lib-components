import type { Meta, StoryObj } from "@storybook/react"
import { SignUpSimple, type SignUpSimpleProps } from "@/components/auth/sign-up-simple"
import { SignUpAnimated } from "@/components/auth/sign-up-animated"

const meta: Meta<typeof SignUpSimple> = {
  title: "Auth/SignUp",
  component: SignUpSimple,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed at the top of the form",
    },
    description: {
      control: "text",
      description: "The description text below the title",
    },
    showSocialLogin: {
      control: "boolean",
      description: "Show or hide social login buttons (Google, GitHub)",
    },
    showPasswordStrength: {
      control: "boolean",
      description: "Show or hide the password strength indicator",
    },
  },
}

export default meta
type Story = StoryObj<typeof SignUpSimple>

export const Simple: Story = {
  args: {
    title: "Create an account",
    description: "Enter your details to get started",
    showSocialLogin: true,
    showPasswordStrength: true,
  },
  render: (args) => <SignUpSimple {...args} />,
}

export const Animated: StoryObj = {
  render: () => <SignUpAnimated />,
}

export const WithoutSocialLogin: Story = {
  args: {
    title: "Create an account",
    description: "Enter your details to get started",
    showSocialLogin: false,
    showPasswordStrength: true,
  },
  render: (args) => <SignUpSimple {...args} />,
}

export const WithoutPasswordStrength: Story = {
  args: {
    title: "Quick Sign Up",
    description: "Create your account in seconds",
    showSocialLogin: true,
    showPasswordStrength: false,
  },
  render: (args) => <SignUpSimple {...args} />,
}
