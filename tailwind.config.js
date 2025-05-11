/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        base: "14px",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
      },
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#93C5FD",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#14B8A6",
          light: "#5EEAD4",
          dark: "#0F766E",
        },
        info: {
          DEFAULT: "#38BDF8",
        },
        error: {
          DEFAULT: "#EF4444",
        },
        warning: {
          DEFAULT: "#F59E0B",
        },
        success: {
          DEFAULT: "#22C55E",
        },
        background: {
          DEFAULT: "#F9FAFB",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
        },
        divider: "#E5E7EB",
        muted: "#9E9E9E", // For subtitle2 color
      },
      borderRadius: {
        md: "8px",
        lg: "10px",
        xl: "14px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
