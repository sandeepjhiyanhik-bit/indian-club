"use client"

import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Old Legacy CRM',
    creationDate: '2022-01-15',
    lastUpdatedDate: '2023-05-10',
    lastAccessedDate: '2023-06-01',
    activeUsersLast90Days: 0,
    apiCallsLast90Days: 12,
    storageUsedGB: 45.2,
    customTags: ['legacy', 'php'],
    status: 'active'
  },
  {
    id: 'p2',
    name: 'Marketing Landing Page v1',
    creationDate: '2023-11-20',
    lastUpdatedDate: '2023-11-20',
    lastAccessedDate: '2024-01-05',
    activeUsersLast90Days: 2,
    apiCallsLast90Days: 50,
    storageUsedGB: 2.1,
    status: 'active'
  },
  {
    id: 'p3',
    name: 'Internal Hackathon Project',
    creationDate: '2024-02-14',
    lastUpdatedDate: '2024-02-16',
    lastAccessedDate: '2024-02-16',
    activeUsersLast90Days: 0,
    apiCallsLast90Days: 0,
    storageUsedGB: 12.8,
    status: 'active'
  },
  {
    id: 'p4',
    name: 'Customer Dashboard Prototype',
    creationDate: '2024-03-01',
    lastUpdatedDate: '2024-04-12',
    lastAccessedDate: '2024-04-15',
    activeUsersLast90Days: 125,
    apiCallsLast90Days: 15000,
    storageUsedGB: 8.4,
    status: 'active'
  },
  {
    id: 'p5',
    name: 'Temporary Log Aggregator',
    creationDate: '2024-01-10',
    lastUpdatedDate: '2024-01-15',
    lastAccessedDate: '2024-01-15',
    activeUsersLast90Days: 0,
    apiCallsLast90Days: 5,
    storageUsedGB: 156.0,
    customTags: ['temp', 'expensive'],
    status: 'active'
  },
  {
    id: 'p6',
    name: 'Decommissioned Auth Service',
    creationDate: '2021-06-20',
    lastUpdatedDate: '2022-12-30',
    lastAccessedDate: '2023-01-01',
    activeUsersLast90Days: 0,
    apiCallsLast90Days: 0,
    storageUsedGB: 34.5,
    status: 'active'
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const activeProjects = projects.filter(p => p.status === 'active');
  const trashedProjects = projects.filter(p => p.status === 'trash');
  
  const totalStorageRecovered = projects
    .filter(p => p.status === 'trash' || p.status === 'purged')
    .reduce((acc, curr) => acc + curr.storageUsedGB, 0);

  const estimatedCostSaved = totalStorageRecovered * 0.02; // Hypothetical $0.02 per GB

  const moveToTrash = useCallback((ids: string[]) => {
    setProjects(prev => prev.map(p => 
      ids.includes(p.id) 
        ? { ...p, status: 'trash', purgedDate: new Date().toISOString() } 
        : p
    ));
    setSelectedIds(new Set());
    toast({
      title: "Projects moved to recovery",
      description: `${ids.length} project(s) will be permanently deleted in 30 days.`
    });
  }, []);

  const restoreFromTrash = useCallback((ids: string[]) => {
    setProjects(prev => prev.map(p => 
      ids.includes(p.id) 
        ? { ...p, status: 'active', purgedDate: undefined } 
        : p
    ));
    toast({
      title: "Projects restored",
      description: `${ids.length} project(s) have been brought back to life.`
    });
  }, []);

  const purgePermanently = useCallback((ids: string[]) => {
    setProjects(prev => prev.map(p => 
      ids.includes(p.id) 
        ? { ...p, status: 'purged' } 
        : p
    ));
    toast({
      title: "Projects purged",
      description: "Storage space has been immediately released.",
      variant: "destructive"
    });
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    if (selectedIds.size === activeProjects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(activeProjects.map(p => p.id)));
    }
  }, [activeProjects, selectedIds.size]);

  return {
    projects,
    activeProjects,
    trashedProjects,
    selectedIds,
    totalStorageRecovered,
    estimatedCostSaved,
    moveToTrash,
    restoreFromTrash,
    purgePermanently,
    toggleSelect,
    selectAll,
  };
}