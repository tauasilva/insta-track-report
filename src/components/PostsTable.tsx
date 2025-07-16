import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Image, 
  Video, 
  Grid, 
  TrendingUp, 
  TrendingDown,
  Hash
} from "lucide-react";
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";

interface PostData {
  id: string;
  date: string;
  type: 'image' | 'video' | 'carousel';
  performance: number;
  hashtags: string[];
  time: string;
  duration?: string;
  thumbnail: string;
  likes: number;
  comments: number;
  views: number;
}

const mockPostsData: PostData[] = [
  {
    id: '1',
    date: '21/01/2024',
    type: 'image',
    performance: 12.5,
    hashtags: ['#lifestyle', '#inspiration', '#monday'],
    time: '18:30',
    thumbnail: post1,
    likes: 2847,
    comments: 156,
    views: 12543
  },
  {
    id: '2',
    date: '20/01/2024',
    type: 'video',
    performance: -2.3,
    hashtags: ['#tutorial', '#tips', '#sunday'],
    time: '15:45',
    duration: '0:32',
    thumbnail: post2,
    likes: 1923,
    comments: 87,
    views: 8934
  },
  {
    id: '3',
    date: '19/01/2024',
    type: 'carousel',
    performance: 8.7,
    hashtags: ['#photoday', '#memories', '#weekend'],
    time: '12:00',
    thumbnail: post3,
    likes: 3456,
    comments: 234,
    views: 15678
  },
  {
    id: '4',
    date: '18/01/2024',
    type: 'image',
    performance: 5.2,
    hashtags: ['#worklife', '#office', '#friday'],
    time: '09:15',
    thumbnail: post1,
    likes: 1678,
    comments: 92,
    views: 7823
  },
  {
    id: '5',
    date: '17/01/2024',
    type: 'video',
    performance: -5.8,
    hashtags: ['#workout', '#fitness', '#health'],
    time: '07:30',
    duration: '1:15',
    thumbnail: post2,
    likes: 2234,
    comments: 145,
    views: 9876
  },
];

export function PostsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  
  const totalPages = Math.ceil(mockPostsData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = mockPostsData.slice(startIndex, startIndex + postsPerPage);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-info" />;
      case 'carousel': return <Grid className="w-4 h-4 text-warning" />;
      default: return <Image className="w-4 h-4 text-success" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Reels';
      case 'carousel': return 'Carrossel';
      default: return 'Imagem';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance > 0) return 'text-success';
    if (performance < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getPerformanceIcon = (performance: number) => {
    if (performance > 0) return <TrendingUp className="w-4 h-4" />;
    if (performance < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Card className="shadow-soft border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Detalhes das Postagens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Post</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Engajamento</TableHead>
                <TableHead>Hashtags</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <img 
                      src={post.thumbnail} 
                      alt="Post thumbnail"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(post.type)}
                      <span className="text-sm">{getTypeLabel(post.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${getPerformanceColor(post.performance)}`}>
                      {getPerformanceIcon(post.performance)}
                      <span className="font-medium">
                        {post.performance > 0 ? '+' : ''}{post.performance}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-sm">
                        <span>❤️ {formatNumber(post.likes)}</span>
                        <span>💬 {formatNumber(post.comments)}</span>
                        <span>👁️ {formatNumber(post.views)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.hashtags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.hashtags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {post.time}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {post.duration || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(startIndex + postsPerPage, mockPostsData.length)} de {mockPostsData.length} posts
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-8 h-8"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}