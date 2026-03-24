/**
 * Reusable Theme Templates
 * Tailwind class combinations for consistent styling
 */

export const THEME_TEMPLATES = {
  // Card variants
  card: {
    base: "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
    interactive: "rounded-lg border border-border bg-card hover:bg-muted/50 cursor-pointer transition-colors",
    elevated:
      "rounded-lg border border-border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow",
  },

  // Button variants
  button: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 transition-colors",
    ghost: "hover:bg-muted text-foreground transition-colors",
    outline: "border border-border hover:bg-muted transition-colors",
  },

  // Text variants
  text: {
    heading: "font-bold text-foreground",
    subheading: "font-semibold text-foreground",
    body: "text-card-foreground",
    muted: "text-muted-foreground",
    small: "text-sm text-muted-foreground",
  },

  // Animation classes
  animation: {
    fadeIn: "animate-fade-in",
    slideInUp: "animate-slide-in-up",
    slideInLeft: "animate-slide-in-left",
    glow: "animate-glow",
  },

  // Layout helpers
  container: {
    page: "max-w-7xl mx-auto px-4 md:px-8",
    card: "rounded-lg border border-border bg-card p-6",
    section: "space-y-6",
  },

  // Transitions
  transition: {
    smooth: "transition-all duration-300 ease-out",
    fast: "transition-all duration-150 ease-out",
    slow: "transition-all duration-500 ease-out",
  },
}
