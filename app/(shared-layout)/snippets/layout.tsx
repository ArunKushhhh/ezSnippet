import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/web/app-sidebar";
import { Crumbs } from "@/components/web/crumbs";
import { cookies } from "next/headers";

// const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export default async function SnippetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      // open
    >
      <AppSidebar />
      <main className="py-20 space-y-4 flex-1 px-4 md:pr-12 overflow-x-hidden">
        <div className="flex gap-4 items-center">
          <SidebarTrigger className="flex md:hidden" />
          <Crumbs />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
