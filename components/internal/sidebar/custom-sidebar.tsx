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
        <span className="text-2xl font-bold p-2 pb-0">Nota</span>
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
