"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Users, Award } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const MOCK_LEADERS = [
  { id: '1', name: 'ThunderClap', level: 128, avatar: 'https://picsum.photos/seed/1/40/40' },
  { id: '2', name: 'SirenSoul', level: 124, avatar: 'https://picsum.photos/seed/2/40/40' },
  { id: '3', name: 'BassBeast', level: 119, avatar: 'https://picsum.photos/seed/3/40/40' },
  { id: '4', name: 'VoidEcho', level: 115, avatar: 'https://picsum.photos/seed/4/40/40' },
  { id: '5', name: 'SonicBuster', level: 112, avatar: 'https://picsum.photos/seed/5/40/40' },
]

export function Leaderboard() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-muted h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-secondary flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          GLOBAL HALL OF POWER
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_LEADERS.map((leader, index) => (
            <div key={leader.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className={`absolute -top-1 -left-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold z-10 
                    ${index === 0 ? 'bg-primary text-black' : index === 1 ? 'bg-secondary text-black' : 'bg-muted text-foreground'}`}>
                    {index + 1}
                  </span>
                  <Avatar className="h-10 w-10 border border-muted group-hover:border-primary/50 transition-colors">
                    <AvatarImage src={leader.avatar} />
                    <AvatarFallback className="bg-muted text-xs">{leader.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{leader.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Master Echo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-primary glow-primary leading-none">{leader.level}</p>
                <p className="text-[9px] text-muted-foreground uppercase">Peak dB</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-muted flex items-center justify-center gap-6">
          <div className="text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-secondary" />
            <p className="text-[10px] font-bold text-muted-foreground uppercase">12.4k Senders</p>
          </div>
          <div className="text-center">
            <Award className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Pro Ranking</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}