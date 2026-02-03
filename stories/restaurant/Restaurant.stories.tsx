import type { Meta, StoryObj } from "@storybook/react"
import { RestaurantDashboard } from "@/components/restaurant/restaurant-dashboard"

const meta: Meta<typeof RestaurantDashboard> = {
  title: "Restaurant/RestaurantDashboard",
  component: RestaurantDashboard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Dashboard title",
    },
    subtitle: {
      control: "text",
      description: "Dashboard subtitle",
    },
    showHeader: {
      control: "boolean",
      description: "Show/hide the header section",
    },
    showTableMap: {
      control: "boolean",
      description: "Show/hide the table floor plan",
    },
    showLiveOrders: {
      control: "boolean",
      description: "Show/hide the live orders panel",
    },
    showMenuPerformance: {
      control: "boolean",
      description: "Show/hide the menu performance section",
    },
    showStaffOverview: {
      control: "boolean",
      description: "Show/hide the staff overview section",
    },
  },
}

export default meta
type Story = StoryObj<typeof RestaurantDashboard>

export const Default: Story = {
  args: {
    title: "Restaurant Dashboard",
    subtitle: "Real-time overview",
    showHeader: true,
    showTableMap: true,
    showLiveOrders: true,
    showMenuPerformance: true,
    showStaffOverview: true,
  },
}

export const MinimalView: Story = {
  args: {
    title: "Kitchen View",
    subtitle: "Orders & Tables",
    showHeader: true,
    showTableMap: true,
    showLiveOrders: true,
    showMenuPerformance: false,
    showStaffOverview: false,
  },
}

export const ManagerView: Story = {
  args: {
    title: "Manager Dashboard",
    subtitle: "Full overview",
    showHeader: true,
    showTableMap: true,
    showLiveOrders: true,
    showMenuPerformance: true,
    showStaffOverview: true,
  },
}

export const OrdersOnly: Story = {
  args: {
    title: "Order Management",
    subtitle: "Live order tracking",
    showHeader: true,
    showTableMap: false,
    showLiveOrders: true,
    showMenuPerformance: false,
    showStaffOverview: false,
  },
}

export const NoHeader: Story = {
  args: {
    title: "Restaurant Dashboard",
    subtitle: "Real-time overview",
    showHeader: false,
    showTableMap: true,
    showLiveOrders: true,
    showMenuPerformance: true,
    showStaffOverview: true,
  },
}
