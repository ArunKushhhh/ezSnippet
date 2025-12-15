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
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function TrashSnippets() {
  const {
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();

  const trashSnippets = allSnippets.filter((snippet) => snippet.isTrash);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Trash</h1>
        <p className="text-muted-foreground">
          Snippets in the trash will be permanently deleted after 30 days.
        </p>
      </div>
      <Separator />

      {trashSnippets.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Trash2 />
            </EmptyMedia>
            <EmptyTitle>Trash is Empty</EmptyTitle>
            <EmptyDescription>
              Your trash is currently empty. Items you delete will appear here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Link href="/snippets">
                <Button variant="outline">Back to Snippets</Button>
              </Link>
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trashSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
