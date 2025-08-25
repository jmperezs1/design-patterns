export default {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/patterns/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],

  // <<< add this
  async viteFinal(config) {
    config.server ||= {}
    config.server.proxy = {
      ...(config.server.proxy || {}),
      "/api/yahoo": {
        target: "https://query1.finance.yahoo.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/yahoo/, ""),
      },
    }
    return config
  },
}
