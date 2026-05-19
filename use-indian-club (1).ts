
"use client"

import { useState, useCallback, useEffect } from 'react';
import { UserProfile, Post, Notification, ChatSession, Violation, UserReport } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

const ADMIN_PHONE = "9015050494";
const ADMIN_PASSWORD = "Sandeep@123";
const PROFANITY_LIST = ['badword', 'abuse', 'spam', 'scam', 'hate', 'fake'];

const MOCK_USERS: UserProfile[] = [
  { id: 'u1', name: 'Aravind Swamy', phone: '9876543211', role: 'USER', avatar: 'https://picsum.photos/seed/arav/100', followers: 1200, following: 150, verified: true, loginCount: 12, status: 'active', violationCount: 0 },
  { id: 'u2', name: 'Priya Rajan', phone: '9876543212', role: 'USER', avatar: 'https://picsum.photos/seed/priya/100', followers: 850, following: 400, verified: false, loginCount: 5, status: 'active', violationCount: 0 },
  { id: 'u3', name: 'Rahul Varma', phone: '9876543213', role: 'USER', avatar: 'https://picsum.photos/seed/rahul/100', followers: 2300, following: 10, verified: true, loginCount: 45, status: 'active', violationCount: 0 },
];

const MOCK_POSTS: Post[] = [
  { id: '1', userId: 'u1', userName: 'Aravind Swamy', userAvatar: 'https://picsum.photos/seed/arav/100', content: 'Exploring Kerala! 🌴 #Travel', imageUrl: 'https://picsum.photos/seed/kerala/800/1000', likes: 1240, comments: 45, timestamp: '2h ago', type: 'image' },
  { id: 's1', userId: 'u3', userName: 'Rahul Varma', userAvatar: 'https://picsum.photos/seed/rahul/100', content: 'Himalayan Drive 🏔️', likes: 8500, comments: 230, timestamp: '1h ago', type: 'short', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mountain-landscape-with-a-flowing-river-32530-large.mp4' }
];

export function useIndianClub() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [chats, setChats] = useState<ChatSession[]>([{ id: 'c1', participantId: 'u1', participantName: 'Aravind Swamy', participantAvatar: 'https://picsum.photos/seed/arav/100', lastMessage: 'Let\'s catch up!', timestamp: '10:30 AM', messages: [] }]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [isCalling, setIsCalling] = useState(false);
  const [callingUser, setCallingUser] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); setDeferredPrompt(e); });
  }, []);

  const login = useCallback((phone: string, pass: string) => {
    if (phone === ADMIN_PHONE && pass === ADMIN_PASSWORD) {
      const admin = { id: 'admin', name: 'Bro', phone, role: 'ADMIN' as const, avatar: 'https://picsum.photos/seed/admin/100', followers: 1000000, following: 0, verified: true, loginCount: 1, status: 'active' as const, violationCount: 0 };
      setUser(admin); setIsAuthenticated(true); toast({ title: "Namaste Admin" });
    } else {
      const u = allUsers.find(x => x.phone === phone);
      if (u && u.status === 'active') {
        const updated = { ...u, loginCount: (u.loginCount || 0) + 1 };
        setUser(updated); setAllUsers(prev => prev.map(it => it.id === updated.id ? updated : it));
        setIsAuthenticated(true); toast({ title: "Welcome back!" });
      } else {
        toast({ title: "Login Failed", variant: "destructive" });
      }
    }
  }, [allUsers]);

  const signup = useCallback((name: string, phone: string, pass: string, avatar: string) => {
    const newUser: UserProfile = { id: `u-${Date.now()}`, name, phone, role: 'USER', avatar, followers: 0, following: 0, verified: false, loginCount: 0, status: 'active', violationCount: 0 };
    setAllUsers(prev => [...prev, newUser]); toast({ title: "Registered Successfully!" }); return true;
  }, []);

  const handleSendMessage = useCallback((text: string, chatId: string) => {
    if (!user) return false;
    if (PROFANITY_LIST.some(w => text.toLowerCase().includes(w))) {
      const v: Violation = { id: `v-${Date.now()}`, userId: user.id, userName: user.name, userPhone: user.phone, blockedText: text, timestamp: new Date().toLocaleString() };
      setViolations(prev => [v, ...prev]);
      toast({ title: "Violation Detected", variant: "destructive" });
      return false;
    }
    toast({ title: "Sent" }); return true;
  }, [user]);

  const toggleUserStatus = (id: string) => setAllUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
  const deleteUser = (id: string) => setAllUsers(prev => prev.filter(u => u.id !== id));
  const reportUser = (id: string) => { const u = allUsers.find(x => x.id === id); if(u) setReports(prev => [{ id: `r-${Date.now()}`, reportedUserId: u.id, reportedUserName: u.name, reportedUserPhone: u.phone, reason: "Manual Report", timestamp: new Date().toLocaleString() }, ...prev]); toast({ title: "Reported" }); };
  const createPost = (content: string) => { const p: Post = { id: `p-${Date.now()}`, userId: user?.id || 'g', userName: user?.name || 'G', userAvatar: user?.avatar || '', content, likes: 0, comments: 0, timestamp: 'Just now', type: 'image', imageUrl: `https://picsum.photos/seed/${Date.now()}/800/1000` }; setPosts(prev => [p, ...prev]); toast({ title: "Posted" }); };

  return { isAuthenticated, user, allUsers, posts, chats, violations, reports, isCalling, callingUser, login, signup, logout: () => { setIsAuthenticated(false); setUser(null); }, handleSendMessage, reportUser, toggleUserStatus, deleteUser, createPost, deletePost: (id: string) => setPosts(prev => prev.filter(p => p.id !== id)), startCall: (n: string) => { setCallingUser(n); setIsCalling(true); }, endCall: () => { setIsCalling(false); setCallingUser(null); }, installPWA: () => deferredPrompt?.prompt(), canInstall: !!deferredPrompt, notifications: [{ id: 'n1', type: 'like', content: 'New post activity', timestamp: '5m ago', read: false }] };
}
