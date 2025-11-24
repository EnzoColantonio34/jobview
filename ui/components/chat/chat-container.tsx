import type React from "react"
import { useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { THEME_TEMPLATES } from "@/config/theme-templates"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface ChatContainerProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-gradient-to-b from-card to-card/95 rounded-t-lg">
      {messages.map((message) => (
        <ChatMessage key={message.id} role={message.role} content={message.content} />
      ))}
      {isLoading && (
        <div className={`flex justify-start ${THEME_TEMPLATES.animation.slideInUp}`}>
          <div className="rounded-lg bg-muted px-4 py-3 border border-border/50">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
