import { 
  BarChart3, 
  Users, 
  Image, 
  MessageSquare, 
  Hash, 
  TrendingUp, 
  Download,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Visão Geral", url: "/", icon: Home },
  { title: "Seguidores", url: "/followers", icon: Users },
  { title: "Postagens", url: "/posts", icon: Image },
  { title: "Sentimentos", url: "/sentiments", icon: MessageSquare },
  { title: "Hashtags", url: "/hashtags", icon: Hash },
  { title: "Comparar", url: "/compare", icon: TrendingUp },
  { title: "Exportar", url: "/export", icon: Download },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className={isCollapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="w-8 h-8 bg-gradient-instagram rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-foreground">Instagram Analytics</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavClass}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}