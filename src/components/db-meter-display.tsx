
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Volume2, Mic, MicOff, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DBMeterDisplayProps {
  onLevelUpdate: (db: number) => void;
  onMaxUpdate: (db: number) => void;
}

export function DBMeterDisplay({ onLevelUpdate, onMaxUpdate }: DBMeterDisplayProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [maxLevel, setMaxLevel] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isSensingRef = useRef(false)

  const stopRecording = () => {
    isSensingRef.current = false
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop())
    if (audioContextRef.current) audioContextRef.current.close()
    
    setIsRecording(false)
    setCurrentLevel(0)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      await audioContext.resume()
      audioContextRef.current = audioContext
      
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser
      
      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      isSensingRef.current = true
      
      const updateLevel = () => {
        if (!isSensingRef.current || !analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        
        const average = sum / dataArray.length
        // Calibrated heuristic for dB mapping (0-130 range)
        const db = Math.min(130, Math.max(0, Math.round(average * 1.6)))
        
        setCurrentLevel(db)
        onLevelUpdate(db)
        
        if (db > maxLevel) {
          setMaxLevel(db)
          onMaxUpdate(db)
        }
        
        animationFrameRef.current = requestAnimationFrame(updateLevel)
      }
      
      setIsRecording(true)
      setError(null)
      updateLevel()
    } catch (err: any) {
      setError("Microphone access denied or unavailable.")
    }
  }

  useEffect(() => {
    return () => {
      isSensingRef.current = false
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop())
    }
  }, [])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-secondary flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          REAL-TIME INTENSITY
        </CardTitle>
        <Button 
          variant={isRecording ? "destructive" : "default"}
          size="sm"
          onClick={isRecording ? stopRecording : startRecording}
          className="rounded-full px-4"
        >
          {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
          {isRecording ? "STOP" : "START SENSING"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <div className="relative flex items-center justify-center w-48 h-48 rounded-full border-4 border-muted">
            <div 
              className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping opacity-20"
              style={{ animationDuration: `${Math.max(0.2, 2 - currentLevel / 50)}s` }}
            />
            <div className="text-center z-10">
              <span className={`text-6xl font-black transition-all duration-75 ${currentLevel > 90 ? 'text-destructive scale-110' : 'text-primary'}`}>
                {currentLevel}
              </span>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Decibels</p>
            </div>
            {/* Meter Ring */}
            <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted/10"
              />
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${(currentLevel / 130) * 100 * 3.14} 1000`}
                className={`transition-all duration-150 ${currentLevel > 90 ? 'text-destructive' : 'text-primary'}`}
              />
            </svg>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/30 rounded-lg p-3 text-center border border-muted">
              <p className="text-xs text-muted-foreground uppercase">Session Peak</p>
              <p className="text-2xl font-bold text-secondary">{maxLevel} dB</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-center border border-muted">
              <p className="text-xs text-muted-foreground uppercase">Status</p>
              <p className={`text-sm font-bold flex items-center justify-center gap-1 ${isRecording ? 'text-primary' : 'text-muted-foreground'}`}>
                <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                {isRecording ? 'ACTIVE' : 'IDLE'}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2 flex items-center gap-2 text-destructive text-xs">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
