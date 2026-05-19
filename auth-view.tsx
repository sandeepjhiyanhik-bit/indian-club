
"use client"

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import { Camera } from 'lucide-react';

export function AuthView({ onLogin, onSignup }: { onLogin: (p: string, pw: string) => void; onSignup: (n: string, p: string, pw: string, a: string) => boolean; }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [form, setForm] = useState({ name: '', phone: '', pass: '', conf: '', avatar: '' });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const r = new FileReader();
      r.onloadend = () => setForm({ ...form, avatar: r.result as string });
      r.readAsDataURL(f);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (!form.avatar) return toast({ title: "Photo Required", variant: "destructive" });
      if (form.pass !== form.conf) return toast({ title: "Passwords Mismatch", variant: "destructive" });
      if (onSignup(form.name, form.phone, form.pass, form.avatar)) setMode('login');
    } else {
      onLogin(form.phone, form.pass);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md space-y-8 animate-slide-up">
        <div className="flex flex-col items-center gap-2">
          <div className="size-16 rounded-3xl saffron-gradient flex items-center justify-center shadow-xl rotate-12">
            <span className="text-3xl text-white font-bold -rotate-12">IC</span>
          </div>
          <h1 className="text-3xl font-black text-primary mt-4 tracking-tighter">INDIAN CLUB</h1>
        </div>
        <Card className="border-none shadow-2xl overflow-hidden rounded-3xl bg-white">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-black">{mode === 'signup' ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription>Join the elite social circle</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Enter name" className="h-11 rounded-xl" required />
                </div>
              )}
              <div className="space-y-1.5">
                <Label>Phone Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">+91</span>
                  <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} maxLength={10} className="pl-12 h-11 rounded-xl" placeholder="Mobile number" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input type="password" value={form.pass} onChange={e => setForm({...form, pass: e.target.value})} className="h-11 rounded-xl" required />
                </div>
                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <Label>Confirm</Label>
                    <Input type="password" value={form.conf} onChange={e => setForm({...form, conf: e.target.value})} className="h-11 rounded-xl" required />
                  </div>
                )}
              </div>
              {mode === 'signup' && (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div onClick={() => fileRef.current?.click()} className="size-24 rounded-full bg-slate-50 border-2 border-dashed border-primary/30 flex items-center justify-center cursor-pointer overflow-hidden">
                    {form.avatar ? <img src={form.avatar} className="size-full object-cover" /> : <Camera className="text-slate-400" />}
                  </div>
                  <input type="file" ref={fileRef} onChange={handleFile} className="hidden" accept="image/*" />
                  <span className="text-[10px] font-black text-primary uppercase">Upload Profile Photo</span>
                </div>
              )}
              <Button type="submit" className="w-full h-12 saffron-gradient font-bold rounded-xl shadow-lg active:scale-95 transition-all">
                {mode === 'signup' ? 'SIGN UP' : 'LOG IN'}
              </Button>
              <p className="text-center text-sm text-slate-500">
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-primary font-black ml-1">
                  {mode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
