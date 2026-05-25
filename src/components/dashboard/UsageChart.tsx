// src/components/dashboard/UsageChart.tsx
// CINEVISION AI — USAGE CHART COMPONENT

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../ui';
import { cn } from '../../lib/utils';

interface UsageData {
  label: string;
  value: number;
  color?: string;
}

interface UsageChartProps {
  data: UsageData[];
  title?: string;
  description?: string;
  type?: 'bar' | 'horizontal';
  className?: string;
}

export function UsageChart({
  data,
  title = 'Uso por Categoria',
  description,
  type = 'bar',
  className,
}: UsageChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  const defaultColors = [
    'bg-amber-500',
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-pink-500',
    'bg-cyan-500',
  ];

  if (type === 'horizontal') {
    return (
      <Card className={className}>
        <CardHeader title={title} description={description} />
        <CardContent>
          <div className="space-y-4">
            {data.map((item, index) => {
              const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
              const color = item.color || defaultColors[index % defaultColors.length];

              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm font-medium text-white">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={cn('h-full rounded-full', color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Bar chart (vertical)
  return (
    <Card className={className}>
      <CardHeader title={title} description={description} />
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-40">
          {data.map((item, index) => {
            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            const color = item.color || defaultColors[index % defaultColors.length];

            return (
              <div key={item.label} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={cn('w-full rounded-t-lg', color)}
                  style={{ minHeight: item.value > 0 ? '8px' : '0' }}
                />
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-500 truncate max-w-full">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Weekly activity mini chart
export function WeeklyActivityChart({ data }: { data: number[] }) {
  const maxValue = Math.max(...data, 1);
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((value, index) => {
        const percentage = (value / maxValue) * 100;
        const isToday = index === data.length - 1;

        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(percentage, 10)}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn(
                'w-full rounded-sm',
                isToday ? 'bg-amber-500' : 'bg-white/20'
              )}
            />
            <span className="text-[10px] text-gray-500">{days[index]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default UsageChart;
