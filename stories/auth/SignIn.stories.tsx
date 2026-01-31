import type { Meta, StoryObj } from "@storybook/react"
import { SignInSimple, type SignInSimpleProps } from "@/components/auth/sign-in-simple"
import { SignInAnimated } from "@/components/auth/sign-in-animated"

const meta: Meta<typeof SignInSimple> = {
  title: "Auth/SignIn",
  component: SignInSimple,
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
    showRememberMe: {
      control: "boolean",
      description: "Show or hide the Remember me checkbox",
    },
    showForgotPassword: {
      control: "boolean",
      description: "Show or hide the Forgot password link",
    },
  },
}

export default meta
type Story = StoryObj<typeof SignInSimple>

export const Simple: Story = {
  args: {
    title: "Welcome back",
    description: "Enter your credentials to access your account",
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
  },
  render: (args) => <SignInSimple {...args} />,
}

export const Animated: StoryObj = {
  render: () => <SignInAnimated />,
}

export const WithoutSocialLogin: Story = {
  args: {
    title: "Welcome back",
    description: "Enter your credentials to access your account",
    showSocialLogin: false,
    showRememberMe: true,
    showForgotPassword: true,
  },
  render: (args) => <SignInSimple {...args} />,
}

export const MinimalForm: Story = {
  args: {
    title: "Sign In",
    description: "Access your account",
    showSocialLogin: false,
    showRememberMe: false,
    showForgotPassword: false,
  },
  render: (args) => <SignInSimple {...args} />,
}
