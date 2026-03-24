import { THEME_TEMPLATES } from "@/config/theme-templates"

export interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"} ${THEME_TEMPLATES.animation.slideInUp}`}
    >
      <div
        className={`max-w-xs rounded-xl px-4 py-3 ${
          role === "user"
            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            : "bg-muted text-foreground border border-border/50"
        }`}
      >
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
