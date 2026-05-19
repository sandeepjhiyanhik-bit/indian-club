"use client"

import { useState } from 'react';
import { Project } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Trash2, Archive, MoreHorizontal, Database, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  projects: Project[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onPurge: (ids: string[]) => void;
}

export function ProjectList({ projects, selectedIds, onToggleSelect, onSelectAll, onPurge }: ProjectListProps) {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleRapidDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      onPurge([id]);
      setDeletingId(null);
    }, 400);
  };

  return (
    <div className="space-y-4 dissolve-in">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/30 p-4 rounded-xl border border-white/5">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9 bg-background/50 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {selectedIds.size > 0 && (
            <Button 
              variant="destructive" 
              size="sm" 
              className="animate-in fade-in slide-in-from-right-2"
              onClick={() => onPurge(Array.from(selectedIds))}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Purge Selected ({selectedIds.size})
            </Button>
          )}
          <Button variant="outline" size="sm" className="border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-card/50 border-b border-white/5">
              <th className="p-4 w-12">
                <Checkbox 
                  checked={selectedIds.size === projects.length && projects.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </th>
              <th className="p-4 font-medium text-xs text-muted-foreground uppercase tracking-wider">Project Name</th>
              <th className="p-4 font-medium text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">Usage Metrics</th>
              <th className="p-4 font-medium text-xs text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Resource Size</th>
              <th className="p-4 font-medium text-xs text-muted-foreground uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((project) => (
              <tr 
                key={project.id} 
                className={cn(
                  "group transition-colors hover:bg-white/[0.02]",
                  deletingId === project.id && "wipe-out"
                )}
              >
                <td className="p-4">
                  <Checkbox 
                    checked={selectedIds.has(project.id)}
                    onCheckedChange={() => onToggleSelect(project.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-accent">{project.name}</span>
                    <span className="text-xs text-muted-foreground">Updated {project.lastUpdatedDate}</span>
                  </div>
                  {project.customTags && (
                    <div className="flex gap-1 mt-1">
                      {project.customTags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[9px] py-0 px-1 border-white/10 text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-4 hidden md:table-cell">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {project.activeUsersLast90Days}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Database className="w-3 h-3" />
                      {project.apiCallsLast90Days}
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <span className="text-xs font-code text-muted-foreground">{project.storageUsedGB} GB</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRapidDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 border-white/10 bg-card">
                        <DropdownMenuItem className="text-xs">
                          <Archive className="w-3.5 h-3.5 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs text-destructive focus:text-destructive" onClick={() => handleRapidDelete(project.id)}>
                          <Trash2 className="w-3.5 h-3.5 mr-2" />
                          Purge Now
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}