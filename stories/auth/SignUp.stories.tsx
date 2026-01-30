import type { Meta, StoryObj } from "@storybook/react"
import { SignUpSimple } from "@/components/auth/sign-up-simple"
import { SignUpAnimated } from "@/components/auth/sign-up-animated"

const meta: Meta = {
  title: "Auth/SignUp",
  parameters: {
    layout: "centered",
  },
}

export default meta

export const Simple: StoryObj = {
  render: () => <SignUpSimple />,
}

export const Animated: StoryObj = {
  render: () => <SignUpAnimated />,
}
