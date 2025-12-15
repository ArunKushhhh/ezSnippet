"use client"

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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  ArrowUpRightIcon,
  Bookmark,
  FolderCode,
  Plus,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import { useGlobalContext } from "@/components/web/context-api";

export default function SnippetsPage() {
  const {
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Snippets</h1>
        <p className="text-muted-foreground">
          Create, organize, and share reusable code snippets
        </p>
      </div>
      <Separator />
      {allSnippets === undefined ||
        (allSnippets.length === 0 && (
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
      {allSnippets && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allSnippets.map((snippet) => (
            <Card
              key={snippet.id}
              className=" p-6 hover:-translate-y-1 duration-300 ease-in-out bg-linear-to-br from-background to-card shadow-lg"
            >
              <CardHeader className="p-0">
                <CardTitle className="line-clamp-1 text-xl font-medium">
                  {snippet.title}
                </CardTitle>
                <CardDescription>{snippet.description}</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="p-0 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {snippet.tags &&
                    snippet.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={"secondary"}
                        className="py-1 px-3"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>

                <p className="whitespace-pre-wrap line-clamp-5 text-muted-foreground">
                  {snippet.body}
                </p>
                <SyntaxHighlighter
                  language="javascript"
                  style={prism}
                  showLineNumbers
                  showInlineLineNumbers
                  customStyle={{
                    backgroundColor: "var(--secondary)",
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
                  <Button
                    className={`${buttonVariants({
                      variant: "secondary",
                    })} border`}
                  >
                    <Bookmark
                      className={`${snippet.isSaved ? "text-primary" : null}`}
                    />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className={`${buttonVariants({
                          variant: "secondary",
                        })} border text-red-400`}
                      >
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this snippet?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will move the snippet into the trash. The
                          snippet will be permanently deleted after 30 days.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className={`${buttonVariants({
                            variant: "destructive",
                          })}`}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
