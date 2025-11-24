import type React from "react"
import { Button } from "@/components/ui/button"
import { Send, Paperclip, Mic } from "lucide-react"

export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  placeholder?: string
}

export function ChatInput({ value, onChange, onSubmit, isLoading, placeholder = "Votre réponse..." }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <form onSubmit={onSubmit} className="p-4">
      <div className="flex items-center gap-3">

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 rounded-full border border-input bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 disabled:opacity-50"
        />

        <Button
          type="submit"
          disabled={isLoading || !value.trim()}
          size="icon"
          className="shrink-0 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg transition-shadow duration-200 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
