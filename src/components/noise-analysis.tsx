"use client"

import React, { useState } from 'react'
import { BrainCircuit, Loader2, Sparkles, MapPin, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { categorizeNoiseEvent } from '@/ai/flows/noise-event-categorization'
import { toast } from '@/hooks/use-toast'

export function NoiseAnalysis() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<{ category: string; description: string } | null>(null)

  // Simulation for demo purposes as we need actual audio blob
  const handleAnalyze = async () => {
    setAnalyzing(true)
    setResult(null)
    
    try {
      // In a real app, we would capture a 3-second audio snippet
      // For this demo, we'll provide a placeholder or simulated request
      // Since it's a server action, it needs a valid base64 data URI
      
      // Simulated dummy small audio file base64
      const dummyAudio = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
      
      const res = await categorizeNoiseEvent({
        audioDataUri: dummyAudio,
        timestamp: new Date().toISOString()
      })
      
      setResult(res)
    } catch (err) {
      console.error(err)
      toast({
        title: "Analysis Failed",
        description: "Could not categorize noise event at this time.",
        variant: "destructive"
      })
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <Card className="bg-card/40 backdrop-blur-md border-secondary/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-3">
        <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-secondary flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          GEN-AI NOISE INTELLIGENCE
        </CardTitle>
        <CardDescription>
          Identify what triggered the sound spike using neural acoustic patterns.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {result ? (
          <div className="bg-secondary/5 rounded-lg border border-secondary/20 p-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <p className="text-sm font-bold text-primary uppercase tracking-tighter">Event Identified</p>
            </div>
            <h4 className="text-2xl font-black text-foreground mb-1 uppercase italic italic">{result.category}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {result.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>Current Proximity Radius</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 w-full border-secondary/30 text-secondary hover:bg-secondary/10"
              onClick={() => setResult(null)}
            >
              Analyze New Event
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-muted rounded-xl bg-muted/10">
            <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Trigger an analysis of the last intense sound spike to classify its origin.
            </p>
            <Button 
              onClick={handleAnalyze} 
              disabled={analyzing}
              className="bg-secondary hover:bg-secondary/90 text-black font-bold shadow-[0_0_15px_rgba(125,249,255,0.4)]"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  PROCESSING ACOUSTICS...
                </>
              ) : (
                "DETECT NOISE ORIGIN"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}