import { Heart, MessageCircle, Eye, Image, Video, Grid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";

interface Post {
  id: string;
  imageUrl: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
  type: 'image' | 'video' | 'carousel';
}

const mockPosts: Post[] = [
  {
    id: '1',
    imageUrl: post1,
    date: '2 horas atrás',
    likes: 2847,
    comments: 156,
    views: 12543,
    type: 'image'
  },
  {
    id: '2',
    imageUrl: post2,
    date: '1 dia atrás',
    likes: 1923,
    comments: 87,
    views: 8934,
    type: 'video'
  },
  {
    id: '3',
    imageUrl: post3,
    date: '2 dias atrás',
    likes: 3456,
    comments: 234,
    views: 15678,
    type: 'carousel'
  },
  {
    id: '4',
    imageUrl: post1,
    date: '3 dias atrás',
    likes: 1678,
    comments: 92,
    views: 7823,
    type: 'image'
  },
  {
    id: '5',
    imageUrl: post2,
    date: '4 dias atrás',
    likes: 2234,
    comments: 145,
    views: 9876,
    type: 'video'
  },
  {
    id: '6',
    imageUrl: post3,
    date: '5 dias atrás',
    likes: 1892,
    comments: 78,
    views: 6543,
    type: 'carousel'
  }
];

function PostCard({ post }: { post: Post }) {
  const getTypeIcon = () => {
    switch (post.type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'carousel': return <Grid className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (post.type) {
      case 'video': return 'bg-info';
      case 'carousel': return 'bg-warning';
      default: return 'bg-success';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Card className="group cursor-pointer hover:shadow-medium transition-all duration-200 border-0 shadow-soft">
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt="Post"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className={`absolute top-3 right-3 ${getTypeColor()} text-white p-1.5 rounded-full`}>
          {getTypeIcon()}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">{post.date}</div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-medium">{formatNumber(post.likes)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <MessageCircle className="w-4 h-4 text-info" />
              <span className="font-medium">{formatNumber(post.comments)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{formatNumber(post.views)}</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {post.type === 'image' ? 'Imagem' : post.type === 'video' ? 'Reels' : 'Carrossel'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentPosts() {
  return (
    <Card className="shadow-soft border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          Últimas Postagens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}