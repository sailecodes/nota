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
import AuthSidebarGroup from "./auth-sidebar-group";
import AuthSidebarSingle from "./auth-sidebar-single";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants } from "../ui/button";
import AuthSidebarHeader from "./auth-sidebar-header";

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

export default function AuthSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <AuthSidebarHeader />
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
        <AuthSidebarSingle data={sidebarData.dashboard} />
        <AuthSidebarGroup data={sidebarData.workspace} />
        <AuthSidebarGroup data={sidebarData.preferences} />
        <AuthSidebarGroup
          className="mt-auto"
          data={sidebarData.support}
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
