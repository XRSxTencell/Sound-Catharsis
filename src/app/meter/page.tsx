"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { DBMeterDisplay } from '@/components/db-meter-display'
import { SoundGraph } from '@/components/sound-graph'
import { Leaderboard } from '@/components/leaderboard'
import { NoiseAnalysis } from '@/components/noise-analysis'
import { 
  Settings, 
  User, 
  History,
  ArrowLeft
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

export default function MeterPage() {
  const [history, setHistory] = useState<{ time: string; level: number }[]>([])
  const [personalBest, setPersonalBest] = useState(0)

  const handleLevelUpdate = (level: number) => {
    const now = new Date()
    const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    setHistory(prev => [...prev, { time: timeString, level }])
  }

  const handleMaxUpdate = (max: number) => {
    if (max > personalBest) {
      setPersonalBest(max)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Logo size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-secondary">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-secondary/20 text-secondary hover:bg-secondary/10 gap-2">
              <User className="h-4 w-4" />
              <span>PROFILE</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2">
                <DBMeterDisplay onLevelUpdate={handleLevelUpdate} onMaxUpdate={handleMaxUpdate} />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 relative overflow-hidden group">
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">PERSONAL RECORD</p>
                  <h3 className="text-5xl font-black text-white glow-accent">{personalBest} <span className="text-xl text-muted-foreground font-medium">dB</span></h3>
                  <p className="text-[10px] text-muted-foreground mt-2 uppercase">Ranked: TOP 5% of Emitters</p>
                </div>
                <NoiseAnalysis />
              </div>
            </div>
            <div className="w-full">
              <SoundGraph history={history} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Tabs defaultValue="leaderboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-card data-[state=active]:text-secondary">
                  LEADERBOARD
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-card data-[state=active]:text-primary">
                  SESSION LOG
                </TabsTrigger>
              </TabsList>
              <TabsContent value="leaderboard" className="mt-4">
                <Leaderboard />
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <div className="bg-card/50 border border-muted rounded-xl p-6 min-h-[400px]">
                  <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                    <History className="h-4 w-4" />
                    RECENT SPIKES
                  </h4>
                  <div className="space-y-3">
                    {history.slice(-10).reverse().map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/10 border border-muted/20">
                        <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>
                        <span className={`text-sm font-black ${item.level > 90 ? 'text-destructive' : 'text-primary'}`}>{item.level} dB</span>
                      </div>
                    ))}
                    {history.length === 0 && (
                      <div className="text-center py-20">
                        <p className="text-muted-foreground text-sm italic">Waiting for signals...</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
