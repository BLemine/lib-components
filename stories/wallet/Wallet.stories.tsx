import type { Meta, StoryObj } from "@storybook/react"
import { WalletUI, type WalletUIProps } from "@/components/wallet/wallet-ui"

const meta: Meta<typeof WalletUI> = {
  title: "Wallet/WalletUI",
  component: WalletUI,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the wallet",
    },
    subtitle: {
      control: "text",
      description: "The subtitle/description text",
    },
    showHeader: {
      control: "boolean",
      description: "Show or hide the header section",
    },
    showCards: {
      control: "boolean",
      description: "Show or hide the cards section in sidebar",
    },
    showQuickSend: {
      control: "boolean",
      description: "Show or hide quick send contacts",
    },
    showSecurity: {
      control: "boolean",
      description: "Show or hide security section",
    },
    showQuickActions: {
      control: "boolean",
      description: "Show or hide quick action buttons",
    },
    showTransactions: {
      control: "boolean",
      description: "Show or hide transactions list",
    },
  },
}

export default meta
type Story = StoryObj<typeof WalletUI>

export const Default: Story = {
  args: {
    title: "My Wallet",
    subtitle: "Manage your money and cards",
    showHeader: true,
    showCards: true,
    showQuickSend: true,
    showSecurity: true,
    showQuickActions: true,
    showTransactions: true,
  },
  render: (args) => <WalletUI {...args} />,
}

export const CompactView: Story = {
  args: {
    title: "Quick Wallet",
    subtitle: "Essential wallet features",
    showHeader: true,
    showCards: true,
    showQuickSend: false,
    showSecurity: false,
    showQuickActions: true,
    showTransactions: true,
  },
  render: (args) => <WalletUI {...args} />,
}
