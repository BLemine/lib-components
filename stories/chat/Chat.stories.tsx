import type { Meta, StoryObj } from "@storybook/react"
import { ChatUI, type ChatUIProps } from "@/components/chat/chat-ui"

const meta: Meta<typeof ChatUI> = {
  title: "Chat/ChatUI",
  component: ChatUI,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the chat",
    },
    subtitle: {
      control: "text",
      description: "The subtitle/description text",
    },
    showHeader: {
      control: "boolean",
      description: "Show or hide the header section",
    },
    showConversationList: {
      control: "boolean",
      description: "Show or hide the conversations sidebar",
    },
    showUserInfo: {
      control: "boolean",
      description: "Show or hide the user info panel",
    },
  },
}

export default meta
type Story = StoryObj<typeof ChatUI>

export const Default: Story = {
  args: {
    title: "Messages",
    subtitle: "Stay connected with your team",
    showHeader: true,
    showConversationList: true,
    showUserInfo: true,
  },
  render: (args) => (
    <div className="p-6">
      <ChatUI {...args} />
    </div>
  ),
}

export const ChatOnly: Story = {
  args: {
    title: "Messages",
    subtitle: "Stay connected with your team",
    showHeader: true,
    showConversationList: true,
    showUserInfo: false,
  },
  render: (args) => (
    <div className="p-6">
      <ChatUI {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    title: "Messages",
    subtitle: "Stay connected with your team",
    showHeader: false,
    showConversationList: false,
    showUserInfo: false,
  },
  render: (args) => (
    <div className="p-6">
      <ChatUI {...args} />
    </div>
  ),
}
