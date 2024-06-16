// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;

import type { Config } from "tailwindcss";
/**
 * TailwindCSS Configuration File
 *
 * @type {import('tailwindcss').Config}
 * @see https://tailwindcss.com/docs/theme for additional information..
 *
 * @property {Config} config - TailwindCSS Configuration Object
 * @property {string[]} config.content - Array of file paths to scan for classes
 * @property {object} config.theme - Object to extend TailwindCSS theme
 * @property {object} config.theme.extend - Object to extend TailwindCSS theme
 * @property {object} config.theme.extend.border - Object to extend TailwindCSS border theme
 * @property {object} config.theme.extend.colors - Object to extend TailwindCSS colors theme
 * @property {object} config.theme.extend.backgroundColor - Object to extend TailwindCSS backgroundColor theme
 * @property {object} config.theme.extend.textColor - Object to extend TailwindCSS textColor theme
 * @property {object} config.theme.extend.backgroundImage - Object to extend TailwindCSS backgroundImage theme
 * @property {object} config.theme.extend.fontFamily - Object to extend TailwindCSS fontFamily theme
 * @property {object} config.theme.extend.typography - Object to extend TailwindCSS typography theme
 * @property {object} config.future - Object to extend TailwindCSS future theme
 * @property {boolean} config.future.hoverOnlyWhenSupported - Boolean to enable hover only when supported
 * @property {object[]} config.plugins - Array of TailwindCSS plugins
 *
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,md}",
    // "./src/app/**/*.{js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx}",
    // "./src/content/**/*.{js,ts,jsx,tsx}",
    // "./src/layout/**/*.{js,ts,jsx,tsx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Add Custom Theme Here
    // Extend TailwindCSS theme here
    extend: {
      border: {
        primary:
          "border-solid border-b-1 border-l-[0] border-r-[0] border-t-1 border-slate-700 dark:border-slate-700",
      },
      colors: {
        accent: "var(--color-accent)",
        // 400: "var(--color-accent)",
        primary: "var(--color-primary)",
        // 500: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        // 600: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        // 700: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
        // 800: "var(--color-quaternary)",
        quinary: "var(--color-quinary)",
        // 900: "var(--color-quinary)",

        // TODO: Make sure these are bg color variables
        // TODO: Add hover, disabled, and active colors
        danger: "var(--danger)",
        general: "var(--general)",
        info: "var(--info)",
        success: "var(--success)",
        warning: "var(--warning)",

        light: "var(--light)",
        dark: "var(--dark)",
      },
      backgroundColor: {
        primary: "var(--color-primary)",
        // 500: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        // 600: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        // 700: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
        // 800: "var(--color-quaternary)",
        quinary: "var(--color-quinary)",
        // 900: "var(--color-quinary)",

        // Colors based on status
        danger: "var(--danger)",
        general: "var(--general)",
        info: "var(--info)",
        success: "var(--success)",
        warning: "var(--warning)",

        light: "var(--light)",
        dark: "var(--dark)",
      },
      textColor: {
        accent: "var(--text-color-accent)",
        // 400: "var(--text-color-accent)",
        primary: "var(--text-color-primary)",
        // 500: "var(--text-color-primary)",
        secondary: "var(--text-color-secondary)",
        // 600: "var(--text-color-secondary)",
        tertiary: "var(--text-color-tertiary)",
        // 700: "var(--text-color-tertiary)",
        quaternary: "var(--text-color-quaternary)",
        // 800: "var(--text-color-quaternary)",
        quinary: "var(--text-color-quinary)",
        // 900: "var(--text-color-quinary)",

        // TODO: Update to use text color variables
        danger: "var(--danger)",
        info: "var(--info)",
        general: "var(--general)",
        warning: "var(--warning)",
        success: "var(--success)",

        light: "var(--light)",
        dark: "var(--dark)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        placeholder: "url('/src/assets/images/placeholder.svg')",
        grid: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUAAABkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGSH0mEbAAAACnRSTlMAzDPDPPPYnGMw2CgMzQAAAChJREFUKM9jgAPOAgZMwGIwKkhXQSUY0BCCMxkEYUAsEM4cjI4fwYIAf2QMNbUsZjcAAAAASUVORK5CYII=')",
      },
    },
    fontFamily: {
      // TODO: Add font family here instead of CSS.
    },
    typography: {
      // quoteless: {
      //   css: {
      //     "blockquote p:first-of-type::before": { content: "none" },
      //     "blockquote p:first-of-type::after": { content: "none" },
      //   },
      // },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: [
    {
      pattern: /bg-(danger|info|warning)/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-highlightjs"),
  ],
};
export default config;
