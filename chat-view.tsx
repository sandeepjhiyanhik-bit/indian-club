"use client"

import { useState } from 'react';
import { ChatSession } from '@/lib/types';
import { Search, Video, Phone, Plus, Send, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatViewProps {
  chats: ChatSession[];
  onStartCall: (name: string) => void;
  onSendMessage: (text: string, chatId: string) => boolean;
  onReport: (userId: string) => void;
}

export function ChatView({ chats, onStartCall, onSendMessage, onReport }: ChatViewProps) {
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || !activeChat) return;
    const success = onSendMessage(message, activeChat.id);
    if (success) {
      setMessage('');
    }
  };

  if (activeChat) {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveChat(null)} className="rounded-full">
              <ArrowLeft className="size-6" />
            </Button>
            <Avatar className="size-10">
              <AvatarImage src={activeChat.participantAvatar} />
              <AvatarFallback>{activeChat.participantName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-sm">{activeChat.participantName}</h3>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Now</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <Button size="icon" variant="ghost" className="text-primary" onClick={() => onStartCall(activeChat.participantName)}>
               <Video className="size-5" />
             </Button>
             <Button size="icon" variant="ghost" className="text-primary" onClick={() => onStartCall(activeChat.participantName)}>
               <Phone className="size-5" />
             </Button>
             <Button 
               size="icon" 
               variant="ghost" 
               className="text-red-500 hover:bg-red-50" 
               onClick={() => onReport(activeChat.participantId)}
               title="Report User"
             >
               <ShieldAlert className="size-5" />
             </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          <div className="flex flex-col items-center py-10 opacity-40">
            <Avatar className="size-24 mb-4">
              <AvatarImage src={activeChat.participantAvatar} />
              <AvatarFallback>{activeChat.participantName[0]}</AvatarFallback>
            </Avatar>
            <h4 className="text-xl font-bold">{activeChat.participantName}</h4>
            <p className="text-xs font-medium">You're friends on Indian Club</p>
          </div>
          
          <div className="text-center">
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-muted px-3 py-1 rounded-full">Today</span>
          </div>

          <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 max-w-[80%]">
             <p className="text-sm">{activeChat.lastMessage}</p>
             <span className="text-[9px] text-muted-foreground mt-1 block">{activeChat.timestamp}</span>
          </div>
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 h-12">
            <Input 
              placeholder="Aa" 
              className="bg-transparent border-none focus-visible:ring-0 px-0 h-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-primary h-8 w-8"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <Send className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background animate-slide-up">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Messages</h2>
          <Button size="icon" variant="ghost" className="text-primary"><Plus className="size-6" /></Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search friends..." className="pl-10 h-10 bg-muted/50 border-none rounded-xl" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-muted/30">
        {chats.map((chat) => (
          <div 
            key={chat.id} 
            className="p-4 flex items-center gap-4 hover:bg-muted/30 cursor-pointer transition-colors group"
            onClick={() => setActiveChat(chat)}
          >
            <Avatar className="size-14 border border-primary/10">
              <AvatarImage src={chat.participantAvatar} />
              <AvatarFallback>{chat.participantName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-sm truncate">{chat.participantName}</h3>
                <span className="text-[10px] text-muted-foreground uppercase">{chat.timestamp}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            <div className="flex gap-1" onClick={e => e.stopPropagation()}>
              <Button 
                onClick={() => onStartCall(chat.participantName)}
                size="icon" 
                variant="ghost" 
                className="text-primary hover:bg-primary/10 rounded-full"
              >
                <Phone className="size-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
