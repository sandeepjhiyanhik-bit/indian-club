"use client"

import { ArrowLeft, ShieldCheck, Scale, Lock, Eye, Ban } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TermsViewProps {
  onBack: () => void;
}

export function TermsView({ onBack }: TermsViewProps) {
  const sections = [
    {
      icon: Scale,
      title: "Content Ownership",
      content: "You own the intellectual property rights to the content you create and share on Indian Club. However, by uploading content, you grant us a non-exclusive, royalty-free, worldwide license to host, use, distribute, modify, and display your content to provide and improve the service."
    },
    {
      icon: ShieldCheck,
      title: "User Safety Standards",
      content: "Indian Club is a safe space. We strictly prohibit any form of harassment, hate speech, bullying, or the sharing of non-consensual explicit content. Users found violating these safety standards will face permanent account suspension without prior warning."
    },
    {
      icon: Lock,
      title: "Account Security",
      content: "You are responsible for maintaining the confidentiality of your login credentials. We recommend using unique, strong passwords. We never ask for your password via text or email. Any suspicious activity should be reported to our support team immediately."
    },
    {
      icon: Eye,
      title: "Data Privacy",
      content: "We collect metadata and profile information to personalize your experience. Your phone number is used for authentication only and is never shared with third-party advertisers. We employ end-to-end encryption principles for private communications."
    },
    {
      icon: Ban,
      title: "Prohibition of Scams",
      content: "Indian Club is a PURE social platform. We have ZERO financial features. Any user attempting to implement wallet scams, financial deposits, withdrawal schemes, or 'Refer & Earn' fraud will be reported to cyber authorities and banned instantly."
    }
  ];

  return (
    <div className="min-h-full bg-white animate-slide-up pb-20">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="size-6" />
        </Button>
        <h1 className="text-xl font-black tracking-tight">Terms of Service</h1>
      </header>

      <div className="p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Legal Agreement</h2>
          <p className="text-sm text-muted-foreground font-medium italic">Last Updated: February 2024</p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          Welcome to Indian Club. By using our platform, you agree to abide by the following terms and community guidelines. These rules are designed to ensure a premium, safe, and authentic social experience for all members.
        </p>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="flex gap-4">
              <div className="shrink-0 size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <section.icon className="size-6 text-primary" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-slate-900">{section.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Commitment</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
            "We are committed to building a digital space that respects Indian values while providing global-standard social technology. Indian Club is and will always remain a financial-free social connection network."
          </p>
        </div>
      </div>
    </div>
  );
}
