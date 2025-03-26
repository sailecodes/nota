import Link from "next/link";
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
} from "../ui/sidebar";
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
import DashboardSidebarGroup from "./dashboard-sidebar-group";
import DashboardSidebarSingle from "./dashboard-sidebar-single";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants } from "../ui/button";
import DashboardSidebarHeader from "./dashboard-sidebar-header";

const dashboardSidebarData = {
  dashboard: {
    icon: LayoutDashboardIcon,
    title: "Dashboard",
    href: "/dashboard",
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

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <DashboardSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/upload"
                    className={buttonVariants({})}>
                    <PlusCircle />
                    <span>Upload meeting</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DashboardSidebarSingle data={dashboardSidebarData.dashboard} />
        <DashboardSidebarGroup data={dashboardSidebarData.workspace} />
        <DashboardSidebarGroup data={dashboardSidebarData.preferences} />
        <DashboardSidebarGroup
          className="mt-auto"
          data={dashboardSidebarData.support}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-fit">
              <UserButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
