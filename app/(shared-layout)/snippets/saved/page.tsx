"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { useGlobalContext } from "@/components/web/context-api";
import SnippetCard from "@/components/web/snippet-card";
import { ArrowRight, FolderCode } from "lucide-react";
import Link from "next/link";

export default function SavedSnippets() {
  const {
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();

  const savedSnippets = allSnippets.filter((snippet) => snippet.isSaved);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Saved Snippets</h1>
        <p className="text-muted-foreground">
          Your collection of favorite and frequently used snippets.
        </p>
      </div>
      <Separator />

      {savedSnippets.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>No Saved Snippets</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t saved any snippets yet. Bookmark snippets to
              access them quickly here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Link href="/snippets">
                <Button>
                  Browse Snippets
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {savedSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
