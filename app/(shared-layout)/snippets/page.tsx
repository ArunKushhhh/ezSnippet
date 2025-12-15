"use client";

import { Snippet } from "@/app/types/types";
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
import { ArrowUpRightIcon, FolderCode, Plus } from "lucide-react";

export default function SnippetsPage() {
  const {
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();

  const activeSnippets = allSnippets.filter((s: Snippet) => !s.isTrash);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Snippets</h1>
        <p className="text-muted-foreground">
          Create, organize, and share reusable code snippets
        </p>
      </div>
      <Separator />
      {activeSnippets === undefined ||
        (activeSnippets.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderCode />
              </EmptyMedia>
              <EmptyTitle>No Snippets Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any snippets yet. Get started by
                creating your first snippet.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button>
                  <Plus />
                  Create Project
                </Button>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-foreground"
                  size="sm"
                >
                  Learn More <ArrowUpRightIcon />
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        ))}
      {activeSnippets && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
