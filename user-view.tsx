
"use client"

import { useState, useCallback } from 'react';
import { UserProfile, Post, Notification, ChatSession } from '@/lib/types';
import { 
  Home, 
  Video, 
  PlusSquare, 
  Bell, 
  User, 
  MessageSquare,
  Heart, 
  MessageCircle, 
  Share2, 
  CheckCircle2,
  Download,
  MoreVertical,
  Search,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ShortsView } from './shorts-view';
import { ChatView } from './chat-view';
import { SettingsView } from './settings-view';
import { TermsView } from './terms-view';

interface UserViewProps {
  user: UserProfile;
  posts: Post[];
  chats: ChatSession[];
  notifications: Notification[];
  onLogout: () => void;
  onSendMessage: (text: string, chatId: string) => boolean;
  onReportUser: (userId: string) => void;
  onCreatePost: (content: string) => void;
  onStartCall: (name: string) => void;
  onInstall: () => void;
  canInstall: boolean;
}

export function UserView({ 
  user, 
  posts, 
  chats, 
  notifications, 
  onLogout, 
  onSendMessage,
  onReportUser,
  onCreatePost, 
  onStartCall,
  onInstall,
  canInstall
}: UserViewProps) {
  const [activeTab, setActiveTab] = useState('feed');
  const [postContent, setPostContent] = useState('');

  const imagePosts = posts.filter(p => p.type === 'image');
  const shortPosts = posts.filter(p => p.type === 'short');

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const showHeader = !['shorts', 'settings', 'terms', 'chats'].includes(activeTab);

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-background relative pb-20 overflow-x-hidden">
      {/* Header */}
      {showHeader && (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b flex items-center justify-between px-4 h-16 shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-primary italic tracking-tighter cursor-default">INDIAN CLUB</h1>
          </div>
          <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" onClick={onInstall} className="text-primary hover:bg-primary/10">
               <Download className="size-5" />
             </Button>
             <Button variant="ghost" size="icon" onClick={() => handleTabChange('notifications')} className={activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'}>
               <Bell className="size-6" />
             </Button>
             <Button variant="ghost" size="icon" onClick={() => handleTabChange('chats')} className={activeTab === 'chats' ? 'text-primary' : 'text-muted-foreground'}>
               <MessageSquare className="size-6" />
             </Button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-[calc(100vh-128px)]">
        {activeTab === 'feed' && (
          <div className="space-y-4 py-4 animate-slide-up">
            {imagePosts.map(post => (
              <div key={post.id} className="bg-card border-b pb-4 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border border-primary/20 shadow-sm">
                      <AvatarImage src={post.userAvatar} />
                      <AvatarFallback>{post.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm flex items-center gap-1">
                        {post.userName}
                        <CheckCircle2 className="size-3.5 text-blue-500 fill-blue-500" />
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">{post.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:bg-red-50"
                      onClick={() => onReportUser(post.userId)}
                    >
                      <ShieldAlert className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                </div>
                {post.imageUrl && (
                  <div className="w-full relative aspect-[4/5] bg-muted overflow-hidden">
                    <img src={post.imageUrl} alt="Post" className="object-cover w-full h-full" loading="lazy" />
                  </div>
                )}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-4 mb-2">
                    <button className="flex items-center gap-1.5 text-primary active:scale-125 transition-transform duration-150">
                      <Heart className="size-6" />
                      <span className="text-xs font-black">{(post.likes / 1000).toFixed(1)}k</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="size-6" />
                      <span className="text-xs font-black">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground ml-auto hover:text-primary transition-colors">
                      <Share2 className="size-6" />
                    </button>
                  </div>
                  <p className="text-sm leading-snug"><span className="font-bold mr-2">{post.userName}</span>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'shorts' && <ShortsView shorts={shortPosts} />}

        {activeTab === 'chats' && <ChatView chats={chats} onStartCall={onStartCall} onSendMessage={onSendMessage} onReport={onReportUser} />}

        {activeTab === 'notifications' && (
          <div className="divide-y divide-muted/30 animate-slide-up">
            <div className="px-6 py-8">
              <h2 className="text-3xl font-black">Activity</h2>
            </div>
            {notifications.map(n => (
              <div key={n.id} className={`p-4 flex gap-4 items-center transition-colors hover:bg-muted/10 ${!n.read ? 'bg-primary/5' : ''}`}>
                <Avatar className="size-12 border shadow-sm">
                  <AvatarImage src={`https://picsum.photos/seed/${n.id}/100`} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{n.content}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black mt-1">{n.timestamp}</p>
                </div>
                {!n.read && <div className="size-2 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="pb-20 animate-slide-up">
            <div className="p-6 flex flex-col items-center text-center space-y-5">
              <div className="w-full flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => handleTabChange('settings')} className="text-slate-900 bg-slate-100 rounded-full">
                  <Settings className="size-6" />
                </Button>
              </div>
              <div className="relative">
                <Avatar className="size-32 border-4 border-primary/20 shadow-2xl">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1.5 border-4 border-background shadow-lg">
                  <CheckCircle2 className="size-5 fill-white text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black">{user.name}</h2>
                <p className="text-sm text-muted-foreground font-medium mt-1">Digital Creator | Social Elite 🇮🇳</p>
              </div>
              
              <div className="flex gap-8 w-full justify-center py-4 border-y border-muted/20">
                <div className="text-center">
                  <p className="font-black text-xl">{posts.length}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-black text-xl">{(user.followers / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-black text-xl">{user.following}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Following</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <Button className="bg-primary text-white hover:bg-primary/90 h-11 rounded-xl font-bold active:scale-95 transition-transform shadow-md">Edit Profile</Button>
                <Button variant="outline" className="border-slate-100 h-11 rounded-xl font-bold active:scale-95 transition-transform bg-slate-50">Share Profile</Button>
              </div>
            </div>

            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full bg-transparent border-y border-muted/20 rounded-none h-14">
                <TabsTrigger value="posts" className="flex-1 rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">
                  <PlusSquare className="size-6" />
                </TabsTrigger>
                <TabsTrigger value="reels" className="flex-1 rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">
                  <Video className="size-6" />
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1 rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all">
                  <Heart className="size-6" />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-0 focus-visible:ring-0">
                <div className="grid grid-cols-3 gap-0.5">
                  {imagePosts.map(p => (
                    <div key={p.id} className="aspect-square bg-muted overflow-hidden relative group cursor-pointer">
                       <img src={p.imageUrl} alt="" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'settings' && (
          <SettingsView user={user} onLogout={onLogout} onNavigate={handleTabChange} onInstall={onInstall} />
        )}

        {activeTab === 'terms' && (
          <TermsView onBack={() => handleTabChange('settings')} />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-xl border-t flex items-center justify-around px-4 z-[60] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => handleTabChange('feed')} className={`p-2 transition-all duration-200 active:scale-125 ${activeTab === 'feed' ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
          <Home className="size-7" strokeWidth={activeTab === 'feed' ? 2.5 : 2} />
        </button>
        <button onClick={() => handleTabChange('shorts')} className={`p-2 transition-all duration-200 active:scale-125 ${activeTab === 'shorts' ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
          <Video className="size-7" strokeWidth={activeTab === 'shorts' ? 2.5 : 2} />
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-[0.85] transition-all hover:shadow-xl saffron-gradient">
              <PlusSquare className="size-7" strokeWidth={2.5} />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] rounded-2xl p-6 border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-black">New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Textarea 
                placeholder="Share your story..." 
                className="min-h-[140px] rounded-2xl border-muted bg-muted/20 focus-visible:ring-primary text-base"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <Button 
                onClick={() => { onCreatePost(postContent); setPostContent(''); }} 
                className="w-full bg-primary h-12 text-lg font-black rounded-2xl saffron-gradient shadow-lg active:scale-95 transition-all"
                disabled={!postContent.trim()}
              >
                POST NOW
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <button onClick={() => handleTabChange('chats')} className={`p-2 transition-all duration-200 active:scale-125 ${activeTab === 'chats' ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
          <Search className="size-7" strokeWidth={activeTab === 'chats' ? 2.5 : 2} />
        </button>
        <button onClick={() => handleTabChange('profile')} className={`p-2 transition-all duration-200 active:scale-125 ${['profile', 'settings', 'terms'].includes(activeTab) ? 'text-primary scale-110' : 'text-muted-foreground'}`}>
          <User className="size-7" strokeWidth={['profile', 'settings', 'terms'].includes(activeTab) ? 2.5 : 2} />
        </button>
      </nav>
    </div>
  );
}
