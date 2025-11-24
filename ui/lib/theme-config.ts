// Configuration centralisée des couleurs et tokens du design

export const jobViewTheme = {
  colors: {
    primary: {
      violet: "#783ad6",
      pink: "#c95fbf",
      indigo: "#1900ad",
      purple: "#8d42d1",
    },
    light: {
      background: "#f8f7fd",
      surface: "#ffffff",
      border: "#e5e0f0",
      text: "#1a1424",
      textMuted: "#6b6271",
    },
    dark: {
      background: "#1a1620",
      surface: "#2d2635",
      border: "#403a50",
      text: "#f0edfa",
      textMuted: "#b0a8c0",
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, #783ad6 0%, #8d42d1 100%)",
    secondary: "linear-gradient(135deg, #c95fbf 0%, #8d42d1 100%)",
    accent: "linear-gradient(135deg, #1900ad 0%, #783ad6 100%)",
  },

  animations: {
    transition: {
      fast: "transition-all duration-200 ease-out",
      normal: "transition-all duration-300 ease-out",
      smooth: "transition-all duration-500 ease-out",
    },
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(120, 58, 214, 0.05)",
    md: "0 4px 6px -1px rgba(120, 58, 214, 0.1)",
    lg: "0 10px 15px -3px rgba(120, 58, 214, 0.15)",
    xl: "0 20px 25px -5px rgba(120, 58, 214, 0.2)",
  },

  borderRadius: {
    sm: "0.375rem",
    md: "0.625rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
}

export type JobViewTheme = typeof jobViewTheme
