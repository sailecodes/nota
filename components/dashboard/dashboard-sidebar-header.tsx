import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function DashboardSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center hover:cursor-pointer">
              <div className="flex items-center justify-center size-8 rounded-lg bg-sidebar-primary">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col">
                <span>Workspace</span>
                <span className="text-xs text-muted-foreground">Subscription</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex size-6 items-center shrink-0 justify-center rounded-sm border ">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <span className="line-clamp-1">Workspace</span>
              <DropdownMenuShortcut>1</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 hover:cursor-pointer">
              <div className="flex size-6 items-center justify-center bg-background border rounded-sm">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add workspace</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
