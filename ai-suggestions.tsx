"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, ShieldAlert, Loader2 } from "lucide-react";
import { identifyStaleProjects } from "@/ai/flows/identify-stale-projects";
import { Project, StaleRecommendation } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface AISuggestionsProps {
  projects: Project[];
  onApplyAction: (ids: string[]) => void;
}

export function AISuggestions({ projects, onApplyAction }: AISuggestionsProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<StaleRecommendation[]>([]);

  const analyze = async () => {
    setLoading(true);
    try {
      const result = await identifyStaleProjects({
        projects: projects.map(p => ({
          id: p.id,
          name: p.name,
          creationDate: p.creationDate,
          lastUpdatedDate: p.lastUpdatedDate,
          lastAccessedDate: p.lastAccessedDate,
          activeUsersLast90Days: p.activeUsersLast90Days,
          apiCallsLast90Days: p.apiCallsLast90Days,
          storageUsedGB: p.storageUsedGB,
          customTags: p.customTags
        })),
        stalenessCriteria: {
          inactivityMonths: 3,
          minActiveUsers: 5,
          maxApiCalls: 100
        }
      });
      setRecommendations(result.staleProjects);
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-primary/5 border-primary/20 dissolve-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-primary font-headline">
            <Sparkles className="w-5 h-5" />
            Stale Content Intelligence
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            AI-driven insights detecting inactivity and resource waste.
          </CardDescription>
        </div>
        <Button 
          onClick={analyze} 
          disabled={loading}
          variant="outline"
          className="border-primary/20 hover:bg-primary/10 text-primary"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Run Deep Analysis
        </Button>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-white/5 transition-all hover:border-primary/30">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-accent">{rec.name}</h4>
                    <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] font-bold">
                      {Math.round(rec.confidenceScore * 100)}% CONFIDENCE
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => onApplyAction([rec.id])}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Purge
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => onApplyAction(recommendations.map(r => r.id))}
              >
                Bulk Purge All AI Suggestions
              </Button>
            </div>
          </div>
        ) : !loading && (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <ShieldAlert className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">Initiate analysis to uncover stale project candidates.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}