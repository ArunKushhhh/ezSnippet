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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGlobalContext } from "@/components/web/context-api";
import { ArrowRight, Bookmark, RefreshCw, Trash } from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  const {
    allSnippetsObject: { allSnippets, setAllSnippets },
  } = useGlobalContext();

  function handleSave() {
    if (snippet.isTrash) return;

    const updatedSnippets = allSnippets.map((s) => {
      if (s.id === snippet.id) {
        return { ...s, isSaved: !s.isSaved };
      }
      return s;
    });

    setAllSnippets(updatedSnippets);
  }

  function handleDelete() {
    const updatedSnippets = allSnippets.map((s) => {
      if (s.id === snippet.id) {
        // If restoring, set isTrash false and verify isSaved is false
        if (s.isTrash) {
          return { ...s, isTrash: false, isSaved: false };
        }
        // If deleting, set isTrash true and Remove from saved
        return { ...s, isTrash: true, isSaved: false };
      }
      return s;
    });
    setAllSnippets(updatedSnippets);
  }

  function handleDeleteForever() {
    const updatedSnippets = allSnippets.filter((s) => s.id !== snippet.id);
    setAllSnippets(updatedSnippets);
  }

  return (
    <Card
      key={snippet.id}
      className={`p-6 hover:-translate-y-1 duration-300 ease-in-out bg-linear-to-br from-background to-card shadow-lg ${
        snippet.isTrash ? "opacity-80 hover:opacity-100" : ""
      }`}
    >
      <CardHeader className="p-0">
        <CardTitle className="line-clamp-1 text-xl font-medium">
          {snippet.title}
        </CardTitle>
        <CardDescription>{snippet.description}</CardDescription>
        <Badge variant="outline" className="text-muted-foreground">
          {snippet.isTrash ? "Deleted At: " : "Created At: "}
          {snippet.createdAt}
        </Badge>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 space-y-6">
        <div className="flex flex-wrap gap-2">
          {snippet.tags &&
            snippet.tags.map((tag) => (
              <Badge
                key={tag}
                variant={"secondary"}
                className="py-1 px-3 capitalize"
              >
                {tag}
              </Badge>
            ))}
        </div>

        <p className="whitespace-pre-wrap line-clamp-5 text-muted-foreground">
          {snippet.body}
        </p>
        <SyntaxHighlighter
          language={snippet.language}
          style={prism}
          showLineNumbers
          showInlineLineNumbers
          customStyle={{
            backgroundColor: "var(--secondary)",
            border: "1px solid var(--border)",
            overflow: "auto",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "8",
            fontSize: "14px",
            borderRadius: "8px",
          }}
          children={snippet.code}
        />
      </CardContent>
      <Separator />
      <CardFooter className="p-0 flex justify-between items-center">
        <Link
          href={`/snippets/${snippet.id}`}
          className={`${buttonVariants({ variant: "ghost" })}`}
        >
          View Full Snippet
          <ArrowRight />
        </Link>
        <div className="flex gap-2">
          {!snippet.isTrash && (
            <Button
              className={`${buttonVariants({
                variant: "secondary",
              })} border`}
              onClick={handleSave}
            >
              <Bookmark
                className={snippet.isSaved ? "text-chart-2" : undefined}
              />
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={`${buttonVariants({
                  variant: `${snippet?.isTrash ? "default" : "destructive"}`,
                })} border`}
              >
                {snippet?.isTrash ? <RefreshCw /> : <Trash />}
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
                  onClick={snippet.isTrash ? handleDelete : handleDelete}
                >
                  {snippet?.isTrash ? "Restore" : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {snippet.isTrash && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete forever?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the snippet.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={handleDeleteForever}
                  >
                    Delete Forever
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
