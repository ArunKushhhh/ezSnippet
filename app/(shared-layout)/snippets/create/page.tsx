"use client";

import { snippetSchema } from "@/app/schemas/snippet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGlobalContext } from "@/components/web/context-api";
import { TagsInput } from "@/components/web/tags-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "php",
  "ruby",
  "go",
  "rust",
  "html",
  "css",
  "sql",
  "json",
  "yaml",
  "markdown",
];

export default function CreateSnippetPage() {
  const {
    allSnippetsObject: { allSnippets },
    addSnippet,
  } = useGlobalContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "javascript",
      body: "",
      code: "",
      tags: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof snippetSchema>) => {
    try {
      await addSnippet({
        title: data.title,
        description: data.description || "",
        language: data.language,
        body: data.body || "",
        code: data.code,
        tags: data.tags,
        isSaved: false,
        isTrash: false,
      });
      router.push("/snippets");
    } catch (error) {
      // Error handled in context
      console.log(error);
    }
  };

  const selectedLanguage = form.watch("language");

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Create New Snippet</h1>
        <p className="text-muted-foreground">
          Add a new snippet to your collection.
        </p>
      </div>

      <Separator />

      {/* create form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FieldGroup className="gap-4">
          {/* snippet name */}
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel>Title</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g., Auth Middleware"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* snippet description */}
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel>Description</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g., Handles JWT verification and user session."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Selector */}
            <Controller
              control={form.control}
              name="language"
              render={({ field }) => (
                <Field className="gap-2">
                  <FieldLabel>Language</FieldLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between capitalize font-normal"
                      >
                        {selectedLanguage || "Select Language"}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-[200px] max-h-[300px] overflow-y-auto"
                    >
                      <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {languages.map((language) => (
                        <DropdownMenuItem
                          key={language}
                          onClick={() => form.setValue("language", language)}
                          className="capitalize"
                        >
                          {language}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Field>
              )}
            />

            {/* Tags Selector */}
            <Controller
              control={form.control}
              name="tags"
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel>Tags (Min 3)</FieldLabel>
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* snippet body */}
          <Controller
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel>Explanation / Notes</FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Add detailed notes or context about this snippet..."
                  className="min-h-[100px]"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* snippet code */}
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel>Code</FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="// Paste your code here..."
                  className="min-h-[300px] text-sm leading-relaxed"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Snippet</Button>
        </div>
      </form>
    </div>
  );
}
