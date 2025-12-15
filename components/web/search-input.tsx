"use client";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { useGlobalContext } from "./context-api";

export function SearchInput() {
  const {
    allSnippetsObject: { allSnippets },
  } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Search Logic
  const results = useMemo(() => {
    if (!searchTerm || searchTerm.length <= 2) return undefined;

    const lowerTerm = searchTerm.toLowerCase();

    return allSnippets
      .map((snippet) => {
        let score = 0;
        let context = "";

        // Priority 1: Title
        if (snippet.title.toLowerCase().includes(lowerTerm)) {
          score = 4;
          context = snippet.description; // Show description as context for title match
        }
        // Priority 2: Tags
        else if (
          snippet.tags?.some((tag) => tag.toLowerCase().includes(lowerTerm))
        ) {
          score = 3;
          const matchedTags = snippet.tags.filter((tag) =>
            tag.toLowerCase().includes(lowerTerm)
          );
          context = `Tags: ${matchedTags.join(", ")}`;
        }
        // Priority 3: Description
        else if (snippet.description.toLowerCase().includes(lowerTerm)) {
          score = 2;
          context = snippet.description;
        }
        // Priority 4: Body
        else if (snippet.body.toLowerCase().includes(lowerTerm)) {
          score = 1;
          // Truncate logic for body match could be improved, but simply showing the body line-clamped is a good start
          context = snippet.body;
        }

        if (score > 0) {
          return { id: snippet.id, title: snippet.title, body: context, score };
        }
        return null;
      })
      .filter(
        (
          item
        ): item is { id: string; title: string; body: string; score: number } =>
          item !== null
      )
      .sort((a, b) => b.score - a.score);
  }, [searchTerm, allSnippets]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setOpen(true);
  }

  return (
    <div className="relative min-w-3xs hidden sm:flex z-10 w-full max-w-sm">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={handleInputChange}
          value={searchTerm}
          placeholder="Search snippets..."
          className="pl-8 bg-background text-sm w-full"
          onFocus={() => {
            if (searchTerm.length > 2) setOpen(true);
          }}
          onBlur={() => {
            // Delay closing to allow clicking on results
            setTimeout(() => setOpen(false), 200);
          }}
        />
      </div>

      {open && searchTerm.length > 2 && (
        <div className="absolute top-full left-0 w-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 overflow-hidden">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Spinner className="mr-2 h-4 w-4" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="py-2 max-h-[300px] overflow-y-auto">
              {results.map((result) => (
                <Link
                  className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                  href={`/snippets/${result.id}`}
                  key={result.id}
                  onClick={() => {
                    setOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <p className="font-medium line-clamp-1 truncate">
                    {result.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 truncate">
                    {result.body}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
