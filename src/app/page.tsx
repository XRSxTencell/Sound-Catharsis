"use client"

import React from 'react'
import Link from 'next/link'
import { Mic, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Logo } from '@/components/logo'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-20 text-center space-y-12">
        <div className="space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM ONLINE: v1.0.4-BETA
          </div>
          
          <Logo size="xl" className="mb-4" />
          
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
            Measure your intensity. Understand your release. Join the global movement of acoustic expression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link href="/meter" className="group">
            <Card className="bg-card/40 border-primary/20 hover:border-primary/50 transition-all duration-300 h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <Mic className="h-24 w-24 text-primary" />
              </div>
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <Mic className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black italic uppercase">Intensity Meter</h3>
                <p className="text-sm text-muted-foreground">
                  Access real-time dB monitoring, record spikes, and compete on the global leaderboard.
                </p>
                <Button className="w-full bg-primary text-black font-bold mt-4">START SENSING</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat" className="group">
            <Card className="bg-card/40 border-secondary/20 hover:border-secondary/50 transition-all duration-300 h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <MessageSquare className="h-24 w-24 text-secondary" />
              </div>
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="bg-secondary/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-black italic uppercase">AI Chatbot</h3>
                <p className="text-sm text-muted-foreground">
                  Consult our AI expert on sound therapy, vocal release techniques, and acoustic science.
                </p>
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 mt-4">LAUNCH CHAT</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 pt-12 opacity-50">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
            <TrendingUp className="h-4 w-4" />
            Live Analytics
          </div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
            <ShieldCheck className="h-4 w-4" />
            Privacy Secured
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 bg-card/30">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <span>&copy; 2024 SOUNDCATHARSIS LABS</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
