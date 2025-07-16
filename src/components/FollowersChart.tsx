import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar } from "lucide-react";

// Mock data for followers over time
const mockData = {
  '7d': [
    { date: '2024-01-15', followers: 126834 },
    { date: '2024-01-16', followers: 127156 },
    { date: '2024-01-17', followers: 127398 },
    { date: '2024-01-18', followers: 127623 },
    { date: '2024-01-19', followers: 127891 },
    { date: '2024-01-20', followers: 128156 },
    { date: '2024-01-21', followers: 128304 },
  ],
  '30d': [
    { date: '2023-12-23', followers: 121456 },
    { date: '2023-12-28', followers: 122345 },
    { date: '2024-01-02', followers: 123789 },
    { date: '2024-01-07', followers: 124892 },
    { date: '2024-01-12', followers: 126234 },
    { date: '2024-01-17', followers: 127398 },
    { date: '2024-01-21', followers: 128304 },
  ],
  '3m': [
    { date: '2023-10-21', followers: 115678 },
    { date: '2023-11-05', followers: 117234 },
    { date: '2023-11-20', followers: 118567 },
    { date: '2023-12-05', followers: 119890 },
    { date: '2023-12-20', followers: 121234 },
    { date: '2024-01-05', followers: 123456 },
    { date: '2024-01-21', followers: 128304 },
  ],
};

type Period = '7d' | '30d' | '3m';

export function FollowersChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('7d');

  const periodLabels = {
    '7d': 'Últimos 7 dias',
    '30d': 'Últimos 30 dias',
    '3m': 'Últimos 3 meses'
  };

  const data = mockData[selectedPeriod];

  const formatTooltip = (value: number, name: string) => {
    return [value.toLocaleString('pt-BR'), 'Seguidores'];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  return (
    <Card className="shadow-soft border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Seguidores ao Longo do Tempo
          </CardTitle>
          
          <div className="flex gap-2">
            {Object.entries(periodLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedPeriod === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(key as Period)}
                className="text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                className="text-xs"
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                className="text-xs"
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(label) => `Data: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="followers" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}