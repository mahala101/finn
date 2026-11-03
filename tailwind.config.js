/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        finn: {
          bg: "#0A0E17",
          surface: "#111827",
          card: "#1A2236",
          border: "#2A3450",
          accent: "#C8A24E",
          accentMuted: "#A3832E",
          green: "#22C55E",
          red: "#EF4444",
          orange: "#F59E0B",
          blue: "#3B82F6",
          textPrimary: "#F1F5F9",
          textSecondary: "#94A3B8",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
