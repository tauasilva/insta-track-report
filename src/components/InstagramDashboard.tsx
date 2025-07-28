import { ProfileHeader } from "@/components/ProfileHeader";
import { KPICards } from "@/components/KPICards";
import { RecentPosts } from "@/components/RecentPosts";
import { FollowersChart } from "@/components/FollowersChart";
import { SentimentAnalysis } from "@/components/SentimentAnalysis";
import { PostsTable } from "@/components/PostsTable";
import profileImage from "@/assets/profile-image.jpg";

const mockProfileData = {
  username: "lovable_dev",
  displayName: "Lovable Development",
  bio: "Criando aplicações incríveis com AI 🚀 | Desenvolvedor | Designer | Inovador",
  website: "https://lovable.dev",
  isVerified: true,
  profileImage: profileImage
};

export function InstagramDashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-instagram rounded-full"></div>
            <h1 className="text-lg font-semibold">Instagram Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Profile Header */}
        <ProfileHeader {...mockProfileData} />

        {/* KPI Cards */}
        <KPICards />

        {/* Recent Posts */}
        <RecentPosts />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FollowersChart />
          <div className="lg:col-span-1">
            <SentimentAnalysis />
          </div>
        </div>

        {/* Posts Table */}
        <PostsTable />
      </main>
    </div>
  );
}