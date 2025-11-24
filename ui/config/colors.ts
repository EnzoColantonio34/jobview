/**
 * JobView Brand Color Configuration
 * Centralized color system for consistent theming across the application
 */

export const COLORS = {
  // Brand Primary Colors
  primary: {
    violet: "#783ad6",
    pink: "#c95fbf",
    indigo: "#1900ad",
    purple: "#8d42d1",
  },

  // Semantic Colors
  semantic: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Light Mode Palette
  light: {
    bg: {
      primary: "#ffffff",
      secondary: "#f9fafb",
      tertiary: "#f3f4f6",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      tertiary: "#9ca3af",
    },
    border: "#e5e7eb",
  },

  // Dark Mode Palette
  dark: {
    bg: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
    },
    border: "#475569",
  },
}

// Export gradient combinations for UI elements
export const GRADIENTS = {
  brandPrimary: `linear-gradient(135deg, ${COLORS.primary.violet} 0%, ${COLORS.primary.pink} 100%)`,
  brandSecondary: `linear-gradient(135deg, ${COLORS.primary.indigo} 0%, ${COLORS.primary.purple} 100%)`,
  accent: `linear-gradient(135deg, ${COLORS.primary.pink} 0%, ${COLORS.primary.purple} 100%)`,
}
