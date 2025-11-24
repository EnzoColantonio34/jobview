import type React from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  placeholder?: string
}

export function ChatInput({ value, onChange, onSubmit, isLoading, placeholder = "Votre réponse..." }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-border bg-card/95 p-4 rounded-b-lg">
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        />
        <Button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg transition-shadow duration-200 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
