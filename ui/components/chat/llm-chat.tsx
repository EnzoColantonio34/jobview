"use client"

import { useState } from "react"
import { ChatContainer, type Message } from "@/components/chat/chat-container"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatWelcome } from "@/components/chat/chat-welcome"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { useTranslation } from "react-i18next"
import { chatApi, ApiError } from "@/lib/api-client"

export function LLMChat() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userContent = input
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userContent,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      let assistantContent: string
      if (chatId === null) {
        const res = await chatApi.start(userContent)
        setChatId(res.chatId)
        assistantContent = res.firstMessage
      } else {
        const res = await chatApi.sendMessage(chatId, userContent)
        assistantContent = res.text
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorContent =
        err instanceof ApiError ? err.message : t("chat.error")
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`mx-auto max-w-4xl ${THEME_TEMPLATES.animation.fadeIn}`}>
      {messages.length === 0 ? (
        <div className="flex h-[70vh] flex-col items-center justify-center space-y-8">
          <ChatWelcome />
          <div className="w-full max-w-2xl px-6">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              isLoading={isLoading}
              placeholder={t("chat.firstInputPlaceholder")}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-[70vh] flex-col rounded-lg border border-border bg-card">
          <ChatContainer messages={messages} isLoading={isLoading} />
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
            isLoading={isLoading}
            placeholder={t("chat.inputPlaceholder")}
          />
        </div>
      )}
    </div>
  )
}
