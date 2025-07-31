import { Bell, Download, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  username: string;
  displayName: string;
  bio: string;
  website?: string;
  isVerified?: boolean;
  profileImage: string;
}

export const ProfileHeader = ({ data }) => {


  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={data.profileImage} 
              alt={`${data.username} profile`}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-medium"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">@{data.username}</h1>
              {data.isVerified && (
                <CheckCircle className="w-6 h-6 text-info" />
              )}
            </div>
            
            <h2 className="text-lg font-medium text-muted-foreground">{data.displayName}</h2>
            
            <p className="text-sm text-muted-foreground max-w-md">{data.bio}</p>
            
            {data.website && (
              <div className="flex items-center gap-1 text-sm text-info hover:underline">
                <ExternalLink className="w-4 h-4" />
                <a href={data.website} target="_blank" rel="noopener noreferrer">
                  {data.website.replace(/https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </Card>
  );
}