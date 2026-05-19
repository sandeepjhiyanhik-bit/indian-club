
"use client"

import { UserProfile, Post, Violation, UserReport } from '@/lib/types';
import { 
  ShieldCheck, 
  Users, 
  Video, 
  Image as ImageIcon, 
  Trash2, 
  LogOut,
  Ban,
  Activity,
  UserCheck,
  ShieldAlert,
  AlertTriangle,
  History,
  Trash
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminViewProps {
  user: UserProfile;
  allUsers: UserProfile[];
  posts: Post[];
  violations?: Violation[];
  reports?: UserReport[];
  onLogout: () => void;
  onDeletePost: (id: string) => void;
  onToggleUserStatus: (id: string) => void;
  onDeleteUser: (id: string) => void;
}

export function AdminView({ 
  user, 
  allUsers, 
  posts, 
  violations = [], 
  reports = [],
  onLogout, 
  onDeletePost,
  onToggleUserStatus,
  onDeleteUser
}: AdminViewProps) {
  const images = posts.filter(p => p.type === 'image');
  const shorts = posts.filter(p => p.type === 'short');

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 max-w-5xl mx-auto overflow-x-hidden pb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4">
          <div className="size-14 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/40 rotate-6 saffron-gradient">
            <ShieldCheck className="size-8 text-white -rotate-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">System Admin</h1>
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] opacity-80">Welcome, Bro</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onLogout} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl font-bold">
          <LogOut className="size-4 mr-2" /> EXIT
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Downloads / Reg', value: allUsers.length, icon: Users, color: 'text-blue-400' },
          { label: 'Images Feed', value: images.length, icon: ImageIcon, color: 'text-green-400' },
          { label: 'Short Videos', value: shorts.length, icon: Video, color: 'text-purple-400' },
          { label: 'Violations', value: violations.length, icon: ShieldAlert, color: 'text-red-400' },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="pt-6">
              <stat.icon className={`size-5 mb-2 ${stat.color}`} />
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800 h-12 p-1 gap-2 rounded-2xl">
          <TabsTrigger value="users" className="rounded-xl data-[state=active]:bg-primary">Users</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-red-600">Security Alerts</TabsTrigger>
          <TabsTrigger value="content" className="rounded-xl data-[state=active]:bg-slate-800">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <section>
            <h2 className="text-xs font-black flex items-center gap-2 text-slate-400 uppercase tracking-[0.2em] mb-4">
              <UserCheck className="size-4 text-primary" />
              User Activity Ledger (Login Tracker)
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50">
                      <th className="p-4 text-[10px] font-black uppercase text-slate-500">Member Details</th>
                      <th className="p-4 text-[10px] font-black uppercase text-slate-500">Contact</th>
                      <th className="p-4 text-[10px] font-black uppercase text-slate-500">Logins</th>
                      <th className="p-4 text-[10px] font-black uppercase text-slate-500">Status</th>
                      <th className="p-4 text-[10px] font-black uppercase text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {allUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 border border-slate-700">
                              <AvatarImage src={u.avatar} />
                              <AvatarFallback>{u.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-bold text-sm truncate">{u.name}</p>
                              <p className="text-[8px] text-slate-500 uppercase font-black">ID: {u.id.slice(-6)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-xs font-medium tracking-tight text-slate-400">+91 {u.phone}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={`size-2 rounded-full ${u.loginCount > 0 ? 'bg-green-500' : 'bg-slate-600'}`} />
                            <span className="font-black text-sm">{u.loginCount} times</span>
                          </div>
                        </td>
                        <td className="p-4">
                           <Badge variant={u.status === 'active' ? 'secondary' : 'destructive'} className="text-[8px] py-0 px-2">
                             {u.status.toUpperCase()}
                           </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="icon" variant="ghost" className="size-8 text-orange-400" onClick={() => onToggleUserStatus(u.id)}>
                              <Ban className="size-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="size-8 text-red-500" onClick={() => onDeleteUser(u.id)}>
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="security" className="space-y-8">
          <section>
            <h2 className="text-xs font-black flex items-center gap-2 text-red-400 uppercase tracking-[0.2em] mb-4">
              <ShieldAlert className="size-4" />
              Real-Time Violation Alerts (Auto-Moderation)
            </h2>
            <div className="space-y-3">
              {violations.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 italic">
                  No automated violations detected. System is secure.
                </div>
              ) : (
                violations.map((v) => (
                  <div key={v.id} className="bg-red-950/20 border border-red-500/20 rounded-3xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-lg">!</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-red-200">{v.userName}</p>
                          <span className="text-[8px] text-red-500/60 font-black">+91 {v.userPhone}</span>
                        </div>
                        <p className="text-xs text-red-400/80 mt-1">Blocked Text: <span className="italic font-mono bg-red-500/10 px-1 rounded">"{v.blockedText}"</span></p>
                        <p className="text-[8px] text-slate-600 uppercase font-bold mt-1.5">{v.timestamp}</p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="bg-red-500 text-white font-black text-[10px]">AUTO-BLOCKED</Badge>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black flex items-center gap-2 text-orange-400 uppercase tracking-[0.2em] mb-4">
              <AlertTriangle className="size-4" />
              Pending Community Reports (Manual)
            </h2>
            <div className="grid gap-3">
              {reports.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 italic">
                  No pending community reports.
                </div>
              ) : (
                reports.map((r) => (
                  <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between group hover:border-orange-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <History className="size-5 text-orange-400" />
                      <div>
                        <p className="font-bold text-sm">{r.reportedUserName}</p>
                        <p className="text-xs text-slate-400">+91 {r.reportedUserPhone}</p>
                        <p className="text-[10px] text-orange-500 font-black uppercase mt-1">Reason: {r.reason}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-500/10" onClick={() => onDeleteUser(r.reportedUserId)}>
                         <Trash className="size-4 mr-2" /> PURGE
                       </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
           <div className="grid gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between hover:border-primary/30 group transition-all">
                <div className="flex items-center gap-4 overflow-hidden">
                  <Avatar className="size-12 border border-slate-700">
                    <AvatarImage src={post.userAvatar} />
                    <AvatarFallback>{post.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate group-hover:text-primary">{post.userName}</p>
                    <p className="text-xs text-slate-400 truncate mt-1 italic opacity-80">"{post.content}"</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[8px] bg-slate-800 px-2 py-0.5 rounded-full font-black text-slate-400 uppercase">{post.type}</span>
                      <span className="text-[8px] text-slate-600 font-bold">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="text-red-400 hover:bg-red-400/10" onClick={() => onDeletePost(post.id)}>
                  <Trash2 className="size-5" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
