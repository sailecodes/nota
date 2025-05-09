import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { FileText, LayoutDashboardIcon, Route, User } from "lucide-react";
import CustomSidebarGroup from "./custom-sidebar-group";
import CustomSidebarSingle from "./custom-sidebar-single";
import CustomSidebarHeader from "./custom-sidebar-header";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import UploadButton from "./upload-btn";

const sidebarData = {
  dashboard: {
    icon: LayoutDashboardIcon,
    title: "Overview",
    href: "/dashboard/overview",
    inSidebarContent: true,
  },
  workspace: {
    header: "Workspace",
    content: [
      {
        icon: FileText,
        title: "Meetings",
        href: "/dashboard/meetings",
      },
      {
        icon: Route,
        title: "Action Items",
        href: "/dashboard/action-items",
      },
    ],
    inSidebarContent: true,
  },
  preferences: {
    header: "Preferences",
    content: [
      {
        icon: User,
        title: "Account",
        href: "/dashboard/account",
      },
    ],
    inSidebarContent: true,
  },
};

export default function CustomSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <CustomSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  {/* Upload button for meetings */}
                  <UploadButton />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <CustomSidebarSingle data={sidebarData.dashboard} />
        <CustomSidebarGroup data={sidebarData.workspace} />
        <CustomSidebarGroup data={sidebarData.preferences} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-fit">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
