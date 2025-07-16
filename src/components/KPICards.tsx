import { TrendingUp, TrendingDown, Users, Heart, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
}

function KPICard({ title, value, change, changeLabel, icon: Icon, trend }: KPICardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card className="shadow-soft border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}
              className="gap-1 text-xs"
            >
              {getTrendIcon()}
              {change > 0 ? '+' : ''}{change}%
            </Badge>
            <span className="text-sm text-muted-foreground">{changeLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  const kpis = [
    {
      title: "Total de Seguidores",
      value: "128.304",
      change: 3.5,
      changeLabel: "nos últimos 7 dias",
      icon: Users,
      trend: 'up' as const
    },
    {
      title: "Seguidores Ganhos",
      value: "+1.208",
      change: 12.3,
      changeLabel: "últimos 7 dias",
      icon: TrendingUp,
      trend: 'up' as const
    },
    {
      title: "Engajamento Médio",
      value: "4,2%",
      change: -0.8,
      changeLabel: "por post",
      icon: Heart,
      trend: 'down' as const
    },
    {
      title: "Frequência de Posts",
      value: "3 posts",
      change: 0,
      changeLabel: "por semana",
      icon: Calendar,
      trend: 'neutral' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}