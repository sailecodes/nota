import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AuthSidebar from "@/components/auth-layout/auth-sidebar";
import { Separator } from "@/components/ui/separator";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="min-w-screen bg-primary-foreground">
      <AuthSidebar />
      <main className="w-full bg-background rounded-md m-2">
        <SidebarTrigger className="mx-4 mt-2" />
        <Separator className="my-2" />
        {children}
      </main>
    </SidebarProvider>
  );
}
