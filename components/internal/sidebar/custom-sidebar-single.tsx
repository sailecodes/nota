import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";

interface CustomSidebarSingle {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  href: string;
  inSidebarContent: boolean;
}

export default function CustomSidebarSingle({ data }: { data: CustomSidebarSingle }) {
  return (
    <CustomSidebarSingleHelper inSidebarContent={data.inSidebarContent}>
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
    </CustomSidebarSingleHelper>
  );
}

function CustomSidebarSingleHelper({
  inSidebarContent,
  children,
}: {
  inSidebarContent: boolean;
  children: ReactNode;
}) {
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
