import {
  Users,
  TrendingUp,
  TrendingDown,
  Heart,
  Calendar
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mapeia o nome do ícone (string) para o componente real
const iconMap = {
  Users,
  TrendingUp,
  TrendingDown,
  Heart,
  Calendar
};

export const KPICard = ({ data }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icon];

        return (
          <Card key={index} className="shadow-soft border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              {IconComponent && <IconComponent className="w-5 h-5 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      kpi.trend === "up"
                        ? "default"
                        : kpi.trend === "down"
                        ? "destructive"
                        : "secondary"
                    }
                    className="gap-1 text-xs"
                  >
                    {getTrendIcon(kpi.trend)}
                    {kpi.change > 0 ? "+" : ""}
                    {kpi.change}%
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {kpi.changeLabel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
