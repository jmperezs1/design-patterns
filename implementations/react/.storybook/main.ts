export default {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/patterns/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],

}
