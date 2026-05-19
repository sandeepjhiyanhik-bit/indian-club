"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Zap, DollarSign, Database, Trash2 } from "lucide-react";

interface AnalyticsViewProps {
  storageRecovered: number;
  costSaved: number;
  trashedCount: number;
}

export function AnalyticsView({ storageRecovered, costSaved, trashedCount }: AnalyticsViewProps) {
  const data = [
    { name: 'Used', value: 850, color: 'hsl(var(--secondary))' },
    { name: 'Recovered', value: storageRecovered, color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card/50 border-white/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">Storage Recovered</CardTitle>
          <Database className="w-4 h-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{storageRecovered.toFixed(1)} GB</div>
          <p className="text-xs text-muted-foreground">Across {trashedCount} items</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-white/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">Est. Cost Savings</CardTitle>
          <DollarSign className="w-4 h-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">${costSaved.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Monthly reduction</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-white/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">System Efficiency</CardTitle>
          <Zap className="w-4 h-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{(storageRecovered / 10).toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Optimization increase</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-white/5 col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">Purge Velocity</CardTitle>
          <Trash2 className="w-4 h-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">High</div>
          <p className="text-xs text-muted-foreground">Ready for next cycle</p>
        </CardContent>
      </Card>

      <Card className="col-span-full bg-card/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-lg">Storage Allocation Recovery</CardTitle>
          <CardDescription>Visual breakdown of space reclaimed versus current footprint.</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}