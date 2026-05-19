
"use client"

import { UserProfile } from '@/lib/types';
import { ChevronRight, UserCircle, Bell, Lock, ShieldCheck, HelpCircle, LogOut, Download, ExternalLink, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function SettingsView({ user, onLogout, onNavigate, onInstall }: { user: UserProfile; onLogout: () => void; onNavigate: (v: string) => void; onInstall: () => void; }) {
  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20 animate-slide-up">
      <div className="p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary/10 flex flex-col items-center text-center space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">About Developer</h2>
          <Avatar className="size-24 border-4 border-primary p-1 bg-white shadow-xl">
            <AvatarImage src="https://picsum.photos/seed/sandeep-sharma/400/400" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-black text-slate-900">Sandeep Sharma</h3>
            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">Founder & Lead Architect of Indian Club. Spearheading the next generation of independent community social networks.</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 saffron-gradient rounded-xl flex items-center justify-center text-white"><Download /></div>
            <div><h4 className="text-sm font-black">Install App</h4><p className="text-[10px] font-medium opacity-60">Add to Home Screen</p></div>
          </div>
          <Button onClick={onInstall} size="sm" className="h-8 saffron-gradient text-[10px] font-black rounded-xl">INSTALL</Button>
        </div>
      </div>
      <div className="px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b">
            <div className="flex items-center gap-3"><UserCircle className="text-blue-500" /> <span className="text-sm font-bold">Personal Info</span></div>
            <ChevronRight className="size-4 text-slate-300" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3"><ShieldCheck className="text-purple-500" /> <span className="text-sm font-bold">Security</span></div>
            <ChevronRight className="size-4 text-slate-300" />
          </button>
        </div>
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <button onClick={() => onNavigate('terms')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3"><FileText className="text-slate-600" /> <span className="text-sm font-bold">Terms & Policies</span></div>
            <ExternalLink className="size-4 text-slate-300" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <Button onClick={onLogout} variant="outline" className="w-full h-12 rounded-2xl text-red-500 border-red-100 font-bold">LOG OUT</Button>
      </div>
    </div>
  );
}
