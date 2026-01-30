import type { Meta, StoryObj } from "@storybook/react"
import { WalletUI } from "@/components/wallet/wallet-ui"

const meta: Meta<typeof WalletUI> = {
  title: "Wallet/WalletUI",
  component: WalletUI,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof WalletUI>

export const Default: Story = {
  render: () => <WalletUI />,
}
