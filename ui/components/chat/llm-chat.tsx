"use client"

import { useState, useEffect } from "react"
import { ChatContainer, type Message } from "@/components/chat/chat-container"
import { ChatInput } from "@/components/chat/chat-input"
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

  useEffect(() => {
    if (messages.length === 0) {
      const randomQuestion = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)]
      const initialMessage: Message = {
        id: "1",
        role: "assistant",
        content: randomQuestion,
      }
      setMessages([initialMessage])
    }
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

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
        content: `Bonne réponse! Voici ma question suivante: ${randomQuestion}`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <div
      className={`flex h-[70vh] flex-col rounded-lg border border-border bg-card mx-auto max-w-4xl ${THEME_TEMPLATES.animation.fadeIn}`}
    >
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSend}
        isLoading={isLoading}
      />
    </div>
  )
}
