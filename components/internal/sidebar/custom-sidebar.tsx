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
import {
  CircleHelp,
  FileText,
  LayoutDashboardIcon,
  MessageCircle,
  Route,
  PlusCircle,
  User,
  Wallet,
} from "lucide-react";
import CustomSidebarGroup from "./custom-sidebar-group";
import CustomSidebarSingle from "./custom-sidebar-single";
import { Button } from "../../ui/button";
import CustomSidebarHeader from "./custom-sidebar-header";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useUploadThing } from "@/lib/utils/uploadthing";
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
      {
        icon: Wallet,
        title: "Subscription",
        href: "/dashboard/subscription",
      },
    ],
    inSidebarContent: true,
  },
  support: {
    content: [
      {
        icon: CircleHelp,
        title: "FAQ",
        href: "/dashboard/faq",
      },
      {
        icon: MessageCircle,
        title: "Feedback",
        href: "/dashboard/feedback",
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
                  <UploadButton />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <CustomSidebarSingle data={sidebarData.dashboard} />
        <CustomSidebarGroup data={sidebarData.workspace} />
        <CustomSidebarGroup data={sidebarData.preferences} />
        <CustomSidebarGroup
          className="mt-auto"
          data={sidebarData.support}
        />
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
