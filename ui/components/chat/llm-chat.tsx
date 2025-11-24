"use client"

import { useState } from "react"
import { ChatContainer, type Message } from "@/components/chat/chat-container"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatWelcome } from "@/components/chat/chat-welcome"
import { THEME_TEMPLATES } from "@/config/theme-templates"

const interviewQuestions = [
  "Parlez-moi de vos plus grands accomplissements professionnels.",
  "Comment avez-vous surmonté une situation difficile au travail?",
  "Décrivez votre approche pour apprendre une nouvelle technologie.",
  "Que savez-vous de notre entreprise et pourquoi voulez-vous y travailler?",
  "Comment travaillez-vous en équipe?",
  "Quels sont vos points forts et faibles?",
  "Où vous voyez-vous dans 5 ans?",
  "Comment gérez-vous les délais serrés?",
  "Pouvez-vous me parler d'une fois où vous avez échoué?",
  "Qu'est-ce qui vous motive dans un rôle?",
]

export function LLMChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const isFirstMessage = messages.length === 0

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const randomQuestion = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)]
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isFirstMessage ? randomQuestion : `Bonne réponse! Voici ma question suivante: ${randomQuestion}`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
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
              placeholder="Envoyer votre réponse..."
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
            placeholder="Votre réponse..."
          />
        </div>
      )}
    </div>
  )
}
