"use client"

import { PhoneOff, MicOff, Volume2, User, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CallingOverlayProps {
  userName: string;
  onEndCall: () => void;
}

export function CallingOverlay({ userName, onEndCall }: CallingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-between py-24 text-white animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <Avatar className="size-36 border-4 border-primary/20 shadow-2xl">
            <AvatarImage src={`https://picsum.photos/seed/${userName}/200`} />
            <AvatarFallback><User className="size-16" /></AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold">{userName}</h2>
          <p className="text-primary mt-4 font-bold tracking-[0.3em] animate-pulse">CALLING...</p>
        </div>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" size="icon" className="size-14 rounded-full border-white/10 bg-white/5 text-white">
            <MicOff className="size-6" />
          </Button>
          <span className="text-[10px] uppercase font-bold text-white/40">Mute</span>
        </div>
        
        <Button 
          onClick={onEndCall}
          className="size-20 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl shadow-red-600/40"
        >
          <PhoneOff className="size-10" />
        </Button>

        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" size="icon" className="size-14 rounded-full border-white/10 bg-white/5 text-white">
            <Video className="size-6" />
          </Button>
          <span className="text-[10px] uppercase font-bold text-white/40">Video</span>
        </div>
      </div>
    </div>
  );
}
