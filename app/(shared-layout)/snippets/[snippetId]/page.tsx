"use client";

import { Snippet } from "@/app/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGlobalContext } from "@/components/web/context-api";
import { CopyButton } from "@/components/web/copy-button";
import { SnippetEditor } from "@/components/web/snippet-editor";
import { Bookmark, PencilLine, RefreshCw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

export default function SnippetPage() {
  const { snippetId } = useParams();
  const {
    openSnippetEditorObject: { openSnippetEditor, setOpenSnippetEditor },
    selectedSnippetObject: { selectedSnippet, setSelectedSnippet },
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();

  const [snippet, setSnippet] = useState<Snippet | undefined>(undefined);

  useEffect(() => {
    if (snippetId) {
      const foundSnippet = allSnippets.find((s) => s.id === snippetId);
      if (foundSnippet) {
        setSnippet(foundSnippet);
        setSelectedSnippet(foundSnippet);
      }
    }
  }, [snippetId, allSnippets, setSelectedSnippet]);

  useEffect(() => {
    if (selectedSnippet) {
      setSnippet(selectedSnippet);
    }
  }, [selectedSnippet]);
  return (
    <div className="flex gap-6">
      <div className={`space-y-8 ${openSnippetEditor ? "w-1/2" : "w-full"}`}>
        {/* title, desc and created at */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">{snippet?.title}</h1>
          <p className="text-muted-foreground">{snippet?.description}</p>
          <Badge variant="outline" className="text-muted-foreground">
            Created at: {snippet?.createdAt}
          </Badge>
        </div>

        <Separator />

        {/* explanation */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Explanation / Notes</h1>
          <p className="whitespace-pre-wrap line-clamp-5 text-muted-foreground">
            {snippet?.body}
          </p>
        </div>

        <Separator />

        {/* action buttons */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {/* save and delete buttons */}
            <div className="flex gap-2">
              <Button
                className={`${buttonVariants({
                  variant: "secondary",
                })} border`}
              >
                <Bookmark
                  className={`${snippet?.isSaved ? "text-primary" : null}`}
                />
                <p className="hidden md:block">
                  {snippet?.isSaved ? "Saved" : "Save"}
                </p>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className={`${buttonVariants({
                      variant: `${
                        snippet?.isTrash ? "default" : "destructive"
                      }`,
                    })} border`}
                  >
                    {snippet?.isTrash ? (
                      <>
                        <p>Restore</p>
                        <RefreshCw />
                      </>
                    ) : (
                      <>
                        <p>Delete</p>
                        <Trash />
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {snippet?.isTrash ? "Restore" : "Delete"} this snippet?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {snippet?.isTrash
                        ? "This action will move the snippet out of the trash."
                        : "This action will move the snippet into the trash. The snippet will be permanently deleted after 30 days."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className={`${buttonVariants({
                        variant: snippet?.isTrash ? "default" : "destructive",
                      })}`}
                    >
                      {snippet?.isTrash ? "Restore" : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* copy and edit buttons */}
            <div className="flex gap-2 items-center">
              <Button
                className={`${buttonVariants({
                  variant: "secondary",
                })} border hidden lg:flex`}
                onClick={() => setOpenSnippetEditor(!openSnippetEditor)}
              >
                <PencilLine />
              </Button>
              <CopyButton codeExample={snippet?.code} />
            </div>
          </div>

          {/* tags */}
          <div className="flex gap-2 flex-wrap">
            {snippet?.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="px-4 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* code */}
        <SyntaxHighlighter
          language="javascript"
          style={prism}
          showLineNumbers
          showInlineLineNumbers
          customStyle={{
            backgroundColor: "var(--secondary)",
            border: "1px solid var(--border)",
            fontSize: "14px",
            borderRadius: "8px",
          }}
          children={snippet?.code || ""}
        />
      </div>
      <SnippetEditor />
    </div>
  );
}
