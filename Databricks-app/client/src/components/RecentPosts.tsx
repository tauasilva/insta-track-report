import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case "positivo":
      return "bg-green-100 text-green-800";
    case "negativo":
      return "bg-red-100 text-red-800";
    case "neutro":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const InstagramPostCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      {data.map((post, index) => (
        <Card key={index} className="shadow-soft border-0 overflow-hidden">
          <CardHeader className="p-0">
            <img
              src={post.imageUrl}
              alt="Post do Instagram"
              className="w-60 h-60 object-cover"
            />
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
            <p className="text-sm text-foreground">{post.description}</p>
            <Badge className={`text-xs ${getSentimentColor(post.sentiment)}`}>
              Sentimento: {post.sentiment}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
