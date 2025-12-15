import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Plus, Search, X } from "lucide-react";
import { useState } from "react";

const defaultTags = [
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "css",
  "html",
  "nodejs",
  "backend",
  "frontend",
  "database",
  "auth",
  "api",
  "hooks",
];

interface TagsInputProps {
  value?: string[];
  onChange: (tags: string[]) => void;
  errorMessage?: string;
}

export function TagsInput({
  value = [],
  onChange,
  errorMessage,
}: TagsInputProps) {
  const [availableTags, setAvailableTags] = useState<string[]>(defaultTags);
  const [tagSearch, setTagSearch] = useState("");

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleAddTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setTagSearch("");
  };

  const handleCreateTag = () => {
    if (tagSearch && !availableTags.includes(tagSearch)) {
      setAvailableTags([...availableTags, tagSearch]);
      handleAddTag(tagSearch);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = value.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex h-auto min-h-10 w-full flex-wrap items-center justify-start gap-2 rounded-md border border-input dark:bg-input/30 bg-transparent  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-text",
            value.length === 0 && "text-muted-foreground"
          )}
        >
          {value.length === 0 && <span>Select tags...</span>}

          {/* selected tags */}
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 capitalize">
              {tag}
              <div
                className="ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
              >
                <X className="size-3 text-muted-foreground hover:text-foreground" />
              </div>
            </Badge>
          ))}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[200px]">
        <div onClick={(e) => e.stopPropagation()} className="p-2">
          <div className="flex items-center border rounded-md">
            <Search className="w-4 h-4 mr-2 opacity-50" />
            <input
              className="flex h-9 w-full rounded-md bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search tags..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[200px] overflow-y-auto">
          {filteredTags.map((tag) => (
            <DropdownMenuItem
              key={tag}
              onClick={() => handleAddTag(tag)}
              className="capitalize cursor-pointer"
              disabled={value.includes(tag)}
            >
              {tag}
              {value.includes(tag) && (
                <span className="ml-auto opacity-50">Selected</span>
              )}
            </DropdownMenuItem>
          ))}
          {filteredTags.length === 0 && tagSearch && (
            <DropdownMenuItem
              onClick={handleCreateTag}
              className="cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create "{tagSearch}"
            </DropdownMenuItem>
          )}
          {filteredTags.length === 0 && !tagSearch && (
            <div className="p-2 text-sm text-muted-foreground text-center">
              No tags found
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
