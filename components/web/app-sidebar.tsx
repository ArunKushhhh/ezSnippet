"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Tag } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const snippets = [
  {
    id: "snippet-101",
    title:
      "Basic JavaScript Fetch POST Request Basic JavaScript Fetch POST Request Basic JavaScript Fetch POST Request",
  },
];

export function AppSidebar() {
  const { user } = useUser();
  return (
    <Sidebar
      // collapsible="icon"
      className="mt-17 px-12 py-8 h-[calc(100%-68px)] min-w-sm border-none"
    >
      <SidebarHeader className="px-0 py-4">
        <Button
          variant="ghost"
          role="combobox"
          className="bg-linear-to-br from-transparent to-primary/15 border border-primary/30 justify-between h-auto p-4"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 border border-primary flex justify-center items-center rounded-md bg-primary/20 backdrop-blur-md">
              <Tag className="size-4 text-primary" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">Latest Version</p>
              <p className="text-xs text-muted-foreground">1.0.0</p>
            </div>
          </div>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-sm hover:text-foreground">
            <Link href="/snippets">Snippets</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="pr-4">
            <SidebarMenu>
              {snippets.map((snippet) => (
                <SidebarMenuItem key={snippet.title}>
                  <SidebarMenuButton
                    className={`hover:bg-transparent text-muted-foreground hover:text-foreground truncate`}
                    asChild
                  >
                    <Link href={`/snippets/${snippet.id}`}>
                      <span>{snippet.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user && (
        <SidebarFooter className="px-0 py-4">
          <div
            className={`flex justify-start items-center gap-2 h-auto py-4 bg-card ${buttonVariants(
              { variant: "ghost" }
            )}`}
          >
            <UserButton />
            <div>
              <p className="text-sm font-medium">{user?.fullName}</p>
              <p className="text-muted-foreground text-xs">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
