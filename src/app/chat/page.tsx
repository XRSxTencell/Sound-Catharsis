"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Send, Loader2, ArrowLeft, Bot, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { chatSoundCatharsis } from '@/ai/flows/sound-catharsis-chat'
import { Logo } from '@/components/logo'

interface Message {
  role: 'user' | 'model'
  text: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the Sonic Sanctuary. I am your Sound Catharsis Expert. How can I help you harness the power of sound today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await chatSoundCatharsis({
        message: input,
        history: messages.map(m => ({ role: m.role, text: m.text }))
      })
      setMessages(prev => [...prev, { role: 'model', text: response.text }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered a frequency disruption. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <header className="border-b border-border/40 bg-background/60 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Logo size="sm" />
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
            Knowledge Core Active
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-4xl h-full flex flex-col bg-card/40 border-secondary/20 backdrop-blur-sm relative overflow-hidden shadow-[0_0_30px_rgba(125,249,255,0.05)]">
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`mt-1 p-2 rounded-lg h-fit ${msg.role === 'user' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                        {msg.role === 'user' ? <User className="h-4 w-4 text-primary" /> : <Bot className="h-4 w-4 text-secondary" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-black font-medium rounded-tr-none' 
                          : 'bg-muted/30 border border-muted rounded-tl-none text-foreground'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 items-center text-muted-foreground text-xs font-bold uppercase tracking-widest">
                      <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                      Analyzing Frequencies...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border/40 bg-background/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-3"
              >
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about vocal release, sound science, or therapy techniques..."
                  className="bg-muted/10 border-muted focus-visible:ring-secondary h-12"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-secondary hover:bg-secondary/90 text-black h-12 w-12 rounded-xl"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
