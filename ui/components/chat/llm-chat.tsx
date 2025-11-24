"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
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

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function LLMChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
      className={`flex h-[70vh] flex-col rounded-lg border border-border bg-card ${THEME_TEMPLATES.animation.fadeIn}`}
    >
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-gradient-to-b from-card to-card/95 rounded-t-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${THEME_TEMPLATES.animation.slideInUp}`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-3 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                  : "bg-muted text-foreground border border-border/50"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
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

      {/* Input Form */}
      <form onSubmit={handleSend} className="border-t border-border bg-card/95 p-4 rounded-b-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Votre réponse..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg transition-shadow duration-200 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
