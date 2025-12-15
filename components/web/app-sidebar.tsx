"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Tag } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGlobalContext } from "./context-api";

import { Snippet } from "@/app/types/types";

export function AppSidebar() {
  const {
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();

  // Filter snippets
  const trashSnippets = allSnippets.filter((s: Snippet) => s.isTrash);
  const activeSnippets = allSnippets.filter((s: Snippet) => !s.isTrash);
  // Ensure saved snippets are NOT in trash
  const savedSnippets = activeSnippets.filter((s: Snippet) => s.isSaved);

  // Group by language
  const snippetsByLanguage = activeSnippets.reduce(
    (acc: Record<string, Snippet[]>, snippet: Snippet) => {
      const lang = snippet.language || "other";
      if (!acc[lang]) {
        acc[lang] = [];
      }
      acc[lang].push(snippet);
      return acc;
    },
    {} as Record<string, Snippet[]>
  );

  const sortedLanguages = Object.keys(snippetsByLanguage).sort();

  return (
    <Sidebar
      // collapsible="icon"
      className="mt-17 px-12 py-8 h-[calc(100%-68px)] min-w-1/4 border-none"
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
        {/* All Snippets List*/}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-sm hover:text-foreground">
            <Link href="/snippets">Snippets</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="pr-4">
            <SidebarMenu>
              {activeSnippets.map((snippet) => (
                <SidebarMenuItem key={snippet.id}>
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

        {/* Saved Snippets */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-sm hover:text-foreground">
            <Link href="/snippets/saved">Saved</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="pr-4">
            <SidebarMenu>
              {savedSnippets.map((snippet) => (
                <SidebarMenuItem key={snippet.id}>
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
              {savedSnippets.length === 0 && (
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  No saved snippets
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Trash */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-sm hover:text-foreground">
            <Link href="/snippets/trash">Trash</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="pr-4">
            <SidebarMenu>
              {trashSnippets.map((snippet) => (
                <SidebarMenuItem key={snippet.id}>
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
              {trashSnippets.length === 0 && (
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  Trash is empty
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
