"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const [results, setResults] = useState<
    Array<{ id: string; title: string; body: string }> | undefined
  >(undefined);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setOpen(true);
  }
  return (
    <div className="relative min-w-3xs hidden sm:flex z-10">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={handleInputChange}
          value={searchTerm}
          placeholder="Search snippets..."
          className="pl-8 bg-background text-sm w-full"
        />
      </div>

      {open && searchTerm.length > 2 && (
        <div className="absolute top-full left-0 w-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4  text-sm text-muted-foreground">
              <Spinner />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="flex items-center justify-center p-4  text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="p-4">
              {results.map((result) => (
                <Link
                  className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  href={`/snippets/${result.id}`}
                  key={result.id}
                  onClick={() => {
                    setOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <p className="font-medium line-clamp-1">{result.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
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
