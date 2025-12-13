"use client";

import { useState } from "react";
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
import {
  Calendar,
  Check,
  ChevronsUpDown,
  Home,
  Inbox,
  Search,
  Settings,
  Tag,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const snippets = [
  {
    id: "snippet-101",
    title:
      "Basic JavaScript Fetch POST Request Basic JavaScript Fetch POST Request Basic JavaScript Fetch POST Request",
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      // collapsible="icon"
      className="mt-17 px-12 py-8 h-[calc(100%-68px)] min-w-sm border-none"
    >
      <SidebarHeader className="px-0 py-4 ">
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
