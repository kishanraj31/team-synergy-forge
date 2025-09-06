import { Home, FolderOpen, CheckSquare, Users, Settings, LogOut } from "lucide-react";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigation = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Team", url: "/team", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            S
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">SynergySphere</span>
            <span className="text-xs text-sidebar-foreground/70">Team Collaboration</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 items-center justify-between group-data-[collapsible=icon]:hidden">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
              <span className="text-xs text-sidebar-foreground/70">john@example.com</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}