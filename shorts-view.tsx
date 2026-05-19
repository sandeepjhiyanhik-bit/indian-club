"use client"

import { Post } from '@/lib/types';
import { Heart, MessageCircle, Share2, MoreVertical, Music } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ShortsViewProps {
  shorts: Post[];
}

export function ShortsView({ shorts }: ShortsViewProps) {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar">
      {shorts.map((short) => (
        <div key={short.id} className="relative h-full w-full snap-start flex flex-col justify-end">
          {/* Video Player */}
          <div className="absolute inset-0 z-0">
             <video 
              src={short.videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>

          {/* Sidebar Controls */}
          <div className="absolute right-3 bottom-24 flex flex-col gap-5 z-10 items-center">
            <div className="flex flex-col items-center">
              <Button size="icon" variant="ghost" className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                <Heart className="size-7 fill-white" />
              </Button>
              <span className="text-white text-[10px] font-bold mt-1">{(short.likes / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex flex-col items-center">
              <Button size="icon" variant="ghost" className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                <MessageCircle className="size-7" />
              </Button>
              <span className="text-white text-[10px] font-bold mt-1">{short.comments}</span>
            </div>
            <Button size="icon" variant="ghost" className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
              <Share2 className="size-7" />
            </Button>
            <Button size="icon" variant="ghost" className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
              <MoreVertical className="size-7" />
            </Button>
          </div>

          {/* Content Info */}
          <div className="p-4 z-10 space-y-3 mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-9 border-2 border-primary">
                <AvatarImage src={short.userAvatar} />
                <AvatarFallback>{short.userName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-white font-bold text-sm tracking-tight">{short.userName}</span>
              <Button size="sm" className="bg-primary hover:bg-primary/90 h-6 text-[10px] px-3 font-bold rounded-full">Follow</Button>
            </div>
            <p className="text-white text-xs line-clamp-2 pr-16">{short.content}</p>
            <div className="flex items-center gap-2 text-white/80">
              <Music className="size-3" />
              <span className="text-[10px] font-medium italic overflow-hidden whitespace-nowrap">Original Audio - {short.userName}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
