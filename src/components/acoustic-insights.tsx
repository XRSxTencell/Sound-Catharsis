"use client"

import React, { useState } from 'react'
import { Sparkles, Zap, Brain, ShieldAlert, Loader2, Quote } from 'lucide-react'
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
        <CardTitle className="text-sm font-medium text-secondary flex items-center gap-2">
          <Brain className="h-4 w-4" />
          ACOUSTIC ANALYTICS
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6 text-center space-y-6">
        <div className="p-4 rounded-full bg-primary/5 border border-primary/20">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-lg font-bold uppercase tracking-tighter">Unlock Your Frequency</h4>
          <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
            Your current peak is <span className="text-primary font-bold">{currentPeak} dB</span>. 
            Analyze this intensity for therapeutic insights.
          </p>
        </div>

        <Dialog onOpenChange={(open) => { if (open) handleGetInsight() }}>
          <DialogTrigger asChild>
            <Button 
              disabled={currentPeak === 0}
              className="w-full bg-secondary text-black font-bold hover:bg-secondary/90 shadow-[0_0_15px_rgba(125,249,255,0.3)]"
            >
              GENERATE INSIGHT
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-secondary/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-secondary italic uppercase font-black">
                <Quote className="h-5 w-5 fill-secondary" />
                Catharsis Report
              </DialogTitle>
              <DialogDescription className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                Intensity Level: {currentPeak} Decibels
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Scanning Neuro-Acoustic Buffer...</p>
                </div>
              ) : insight ? (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-primary leading-tight uppercase italic">{insight.title}</h3>
                    <div className="h-1 w-12 bg-primary rounded-full" />
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-xl border border-muted">
                    <p className="text-sm leading-relaxed italic text-foreground/90">
                      "{insight.fact}"
                    </p>
                  </div>

                  <div className="flex gap-4 items-start p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                    <ShieldAlert className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-secondary uppercase">PRO TIP</p>
                      <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-destructive font-bold">Failed to synchronize with the knowledge core.</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-4">
              <Button variant="outline" className="border-muted hover:bg-muted/10 text-xs" onClick={() => setInsight(null)}>
                CLOSE
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-[0.2em]">
          Powered by Sound Labs AI
        </p>
      </CardContent>
    </Card>
  )
}
