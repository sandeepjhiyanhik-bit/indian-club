"use client"

import { Project } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Trash2, History, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RecoverySafetyNetProps {
  trashedProjects: Project[];
  onRestore: (ids: string[]) => void;
  onPermanentDelete: (ids: string[]) => void;
}

export function RecoverySafetyNet({ trashedProjects, onRestore, onPermanentDelete }: RecoverySafetyNetProps) {
  if (trashedProjects.length === 0) {
    return (
      <Card className="bg-card/20 border-white/5 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <History className="w-12 h-12 mb-4 opacity-10" />
          <p className="text-sm">Recovery vault is currently empty.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 dissolve-in">
      <Alert className="bg-amber-950/20 border-amber-900/30 text-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Auto-Purge Window Active</AlertTitle>
        <AlertDescription className="text-xs opacity-80">
          Projects in the safety net are permanently deleted after 30 days of inactivity.
        </AlertDescription>
      </Alert>

      <div className="grid gap-3">
        {trashedProjects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-white/5 transition-all hover:bg-white/[0.02]">
            <div>
              <h4 className="font-medium text-accent">{project.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Moved to vault on {project.purgedDate?.split('T')[0]} • {project.storageUsedGB} GB
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-xs border-white/10" onClick={() => onRestore([project.id])}>
                <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                Restore
              </Button>
              <Button size="sm" variant="ghost" className="text-xs text-destructive hover:bg-destructive/10" onClick={() => onPermanentDelete([project.id])}>
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Final Purge
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {trashedProjects.length > 1 && (
        <div className="flex justify-end pt-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => onPermanentDelete(trashedProjects.map(p => p.id))}>
            Empty Vault Permanently
          </Button>
        </div>
      )}
    </div>
  );
}