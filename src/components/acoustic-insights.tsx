"use client"

import React, { useState } from 'react'
import { Sparkles, Zap, Brain, ShieldAlert, Loader2, Quote, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generateAcousticInsight, AcousticInsightOutput } from '@/ai/flows/acoustic-insights'

interface AcousticInsightsProps {
  currentPeak: number
}

export function AcousticInsights({ currentPeak }: AcousticInsightsProps) {
  const [loading, setLoading] = useState(false)
  const [insight, setInsight] = useState<AcousticInsightOutput | null>(null)

  const handleGetInsight = async () => {
    if (currentPeak === 0) return
    setLoading(true)
    try {
      const res = await generateAcousticInsight({ dbLevel: currentPeak })
      setInsight(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-muted h-full overflow-hidden relative">
      <div className="absolute top-0 right-0 p-3">
        <Zap className="h-4 w-4 text-primary animate-pulse" />
      </div>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-secondary flex items-center gap-2 uppercase tracking-widest">
          <Brain className="h-4 w-4" />
          Acoustic Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6 text-center space-y-6">
        <div className="relative">
          <div className="p-6 rounded-full bg-primary/5 border border-primary/20">
            <Trophy className="h-12 w-12 text-primary drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-secondary text-black text-[10px] font-black px-2 py-0.5 rounded italic">
            REC
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-lg font-bold uppercase tracking-tighter italic">Analyze Peak Frequency</h4>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-black text-white glow-primary">{currentPeak}</span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Recorded Peak dB</span>
          </div>
          <p className="text-[10px] text-muted-foreground max-w-[200px] mx-auto uppercase mt-2">
            The Knowledge Core awaits your highest recorded intensity for processing.
          </p>
        </div>

        <Dialog onOpenChange={(open) => { if (open) handleGetInsight() }}>
          <DialogTrigger asChild>
            <Button 
              disabled={currentPeak === 0}
              className="w-full bg-secondary text-black font-bold hover:bg-secondary/90 shadow-[0_0_15px_rgba(125,249,255,0.3)] group"
            >
              <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
              ANALYZE SESSION PEAK
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-secondary/20 shadow-[0_0_50px_rgba(125,249,255,0.1)]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-secondary italic uppercase font-black">
                <Quote className="h-5 w-5 fill-secondary" />
                Intensity Report
              </DialogTitle>
              <DialogDescription className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                Based on peak recording: {currentPeak} Decibels
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Syncing with Acoustic Buffer...</p>
                </div>
              ) : insight ? (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-primary leading-tight uppercase italic">{insight.title}</h3>
                    <div className="h-1 w-12 bg-primary rounded-full" />
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-xl border border-muted relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                    <p className="text-sm leading-relaxed italic text-foreground/90">
                      "{insight.fact}"
                    </p>
                  </div>

                  <div className="flex gap-4 items-start p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                    <ShieldAlert className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Therapeutic Action</p>
                      <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-destructive font-bold uppercase">Signal Failure: Frequency Unstable</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-muted/20">
              <Button variant="outline" className="border-muted hover:bg-muted/10 text-[10px] font-bold tracking-widest uppercase" onClick={() => setInsight(null)}>
                CLOSE BUFFER
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-[0.2em] opacity-50">
          Acoustic Intelligence v1.2
        </p>
      </CardContent>
    </Card>
  )
}
