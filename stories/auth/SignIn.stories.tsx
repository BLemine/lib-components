import type { Meta, StoryObj } from "@storybook/react"
import { SignInSimple } from "@/components/auth/sign-in-simple"
import { SignInAnimated } from "@/components/auth/sign-in-animated"

const meta: Meta = {
  title: "Auth/SignIn",
  parameters: {
    layout: "centered",
  },
}

export default meta

export const Simple: StoryObj = {
  render: () => <SignInSimple />,
}

export const Animated: StoryObj = {
  render: () => <SignInAnimated />,
}
