import type { Preview } from "@storybook/react"
import type { Decorator } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"
import React from "react"
import "../app/globals.css"

// Load Geist fonts from Google Fonts
const fontLink = document.createElement("link")
fontLink.href = "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
fontLink.rel = "stylesheet"
document.head.appendChild(fontLink)

// Add font styles to document
const style = document.createElement("style")
style.textContent = `
  body {
    font-family: 'Geist', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
document.head.appendChild(style)

// Wrapper decorator to apply font classes
const withFontWrapper: Decorator = (Story) => (
  <div className="font-sans antialiased">
    <Story />
  </div>
)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: "centered",
  },
  decorators: [
    withFontWrapper,
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
}

export default preview
