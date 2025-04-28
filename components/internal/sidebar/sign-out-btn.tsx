"use client";

import { signOut } from "@/actions/auth.action";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutBtn() {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await signOut();

    if (res) toast.error(res.error);

    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="hover:cursor-pointer"
          onClick={handleSignOut}>
          <LogOut className="size-4" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
