import type { Meta, StoryObj } from "@storybook/react"
import { KanbanUI, type KanbanUIProps } from "@/components/kanban/kanban-ui"

const meta: Meta<typeof KanbanUI> = {
  title: "Kanban/KanbanUI",
  component: KanbanUI,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the kanban board",
    },
    subtitle: {
      control: "text",
      description: "The subtitle/description text",
    },
    showHeader: {
      control: "boolean",
      description: "Show or hide the header section",
    },
    showFilters: {
      control: "boolean",
      description: "Show or hide the search and filters",
    },
    showProgress: {
      control: "boolean",
      description: "Show or hide the progress indicator",
    },
  },
}

export default meta
type Story = StoryObj<typeof KanbanUI>

export const Default: Story = {
  args: {
    title: "Project Board",
    subtitle: "Track and manage your tasks",
    showHeader: true,
    showFilters: true,
    showProgress: true,
  },
  render: (args) => <KanbanUI {...args} />,
}

export const WithoutProgress: Story = {
  args: {
    title: "Sprint Board",
    subtitle: "Current sprint tasks",
    showHeader: true,
    showFilters: true,
    showProgress: false,
  },
  render: (args) => <KanbanUI {...args} />,
}

export const Minimal: Story = {
  args: {
    title: "Tasks",
    subtitle: "Quick view",
    showHeader: false,
    showFilters: false,
    showProgress: false,
  },
  render: (args) => <KanbanUI {...args} />,
}
