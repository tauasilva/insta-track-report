import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Smile, Meh, Frown } from "lucide-react";

const sentimentData = [
  { name: 'Positivo', value: 65, color: 'hsl(var(--success))', icon: Smile },
  { name: 'Neutro', value: 20, color: 'hsl(var(--warning))', icon: Meh },
  { name: 'Negativo', value: 15, color: 'hsl(var(--destructive))', icon: Frown },
];

const topComments = {
  positive: [
    "Que foto incrível! 😍",
    "Parabéns pelo conteúdo, sempre inspirador! 👏",
    "Amei esse look! Onde você comprou? 💕"
  ],
  negative: [
    "Não gostei dessa abordagem...",
    "Acho que você poderia ter feito melhor",
    "Esse conteúdo não faz sentido"
  ]
};

const frequentWords = [
  { word: "incrível", count: 234 },
  { word: "linda", count: 187 },
  { word: "parabéns", count: 156 },
  { word: "amei", count: 143 },
  { word: "inspirador", count: 98 },
  { word: "top", count: 87 },
];

export function SentimentAnalysis() {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Análise de Sentimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Porcentagem']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-4 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium">{item.name}</span>
                <Badge variant="outline" className="text-xs">
                  {item.value}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="w-5 h-5" />
            Destaques dos Comentários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium text-success mb-3 flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Comentários Positivos
            </h4>
            <div className="space-y-2">
              {topComments.positive.map((comment, index) => (
                <div key={index} className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-foreground">{comment}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-destructive mb-3 flex items-center gap-2">
              <Frown className="w-4 h-4" />
              Comentários Negativos
            </h4>
            <div className="space-y-2">
              {topComments.negative.map((comment, index) => (
                <div key={index} className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm text-foreground">{comment}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-3">Palavras Mais Frequentes</h4>
            <div className="flex flex-wrap gap-2">
              {frequentWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {word.word} ({word.count})
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}