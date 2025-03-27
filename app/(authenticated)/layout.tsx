import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AuthSidebar from "@/components/auth-layout/auth-sidebar";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AuthSidebar />
      <main className="px-6 py-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
