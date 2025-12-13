import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/web/app-sidebar";
// import { cookies } from "next/headers";

// const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export default function SnippetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const cookieStore = await cookies();
  //   const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider
      // defaultOpen={defaultOpen}
      open
    >
      <div className="relative min-w-sm">
        <AppSidebar />
      </div>
      <main>{children}</main>
    </SidebarProvider>
  );
}
