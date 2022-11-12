//const theme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  content: ["content/**/*.md", "layouts/**/*.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        dark: "#202124",
        dark2: "#2a2b2e",
        dark3: "#3c4043",
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme(`colors.indigo.500`),
              textDecoration: "none",
              "&:hover": {
                color: theme(`colors.indigo.700`),
                textDecoration: "underline",
              },
            },
          },
        },
        dark: {
          css: {
            color: theme(`colors.gray.200`),
            h1: { color: theme(`colors.gray.200`) },
            h2: { color: theme(`colors.gray.200`) },
            h3: { color: theme(`colors.gray.200`) },
            h4: { color: theme(`colors.gray.200`) },
            h5: { color: theme(`colors.gray.200`) },
            h6: { color: theme(`colors.gray.200`) },
            code: { color: theme(`colors.gray.200`) },
            strong: { color: theme(`colors.gray.200`) },
            td: { color: theme(`colors.gray.200`) },
            blockquote: { color: theme(`colors.gray.200`) },
            a: {
              color: theme(`colors.yellow.200`),
              "&:hover": { color: theme(`colors.yellow.400`) },
            },
          },
        },
      }),
    },
  },
  variants: { typography: ["dark"], extend: {} },
  plugins: [require("@tailwindcss/typography")],
};
