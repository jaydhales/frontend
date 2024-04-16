import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#15897B",
        blue: "#2FA0A5",
        "blue-dark": "#185052",
        yellow: "#F69F36",
        "card-bg": "#1C1C26",
        "input-bg": "#2E2E38",
        primaryText: "white",
        secondaryText: "#8F8FB7",
        "orange-dark": "#672709",
        orange: "#FBDED0",
        dark: "#171713",
      },
    },
  },
  plugins: [],
} satisfies Config;
