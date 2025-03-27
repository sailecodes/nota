import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";

interface AuthSidebarSingle {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  href: string;
  inSidebarContent: boolean;
}

export default function AuthSidebarSingle({ data }: { data: AuthSidebarSingle }) {
  return (
    <AuthSidebarSingleHelper inSidebarContent={data.inSidebarContent}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={data.href}>
              <data.icon />
              <span>{data.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </AuthSidebarSingleHelper>
  );
}

function AuthSidebarSingleHelper({ inSidebarContent, children }: { inSidebarContent: boolean; children: ReactNode }) {
  return (
    <>
      {inSidebarContent && (
        <SidebarGroup>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </SidebarGroup>
      )}
      {!inSidebarContent && children}
    </>
  );
}
