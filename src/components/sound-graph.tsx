"use client"

import React, { useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from 'lucide-react'

interface SoundGraphProps {
  history: { time: string; level: number }[]
}

export function SoundGraph({ history }: SoundGraphProps) {
  const chartData = useMemo(() => {
    // Show only the last 30 readings
    return history.slice(-30)
  }, [history])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 h-full">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-secondary flex items-center gap-2">
          <Activity className="h-4 w-4" />
          INTENSITY FLOW
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted)/0.3)" />
              <XAxis 
                dataKey="time" 
                hide 
              />
              <YAxis 
                domain={[0, 130]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)' 
                }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="level" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorLevel)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}