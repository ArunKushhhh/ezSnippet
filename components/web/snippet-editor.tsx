import { ChevronDown, PencilLine, X } from "lucide-react";
import { Button } from "../ui/button";
import { useGlobalContext } from "./context-api";
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
} from "../ui/alert-dialog";
import { Field, FieldGroup, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { snippetSchema } from "@/app/schemas/snippet";
import { TagsInput } from "./tags-input";

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

type SnippetFormValues = z.infer<typeof snippetSchema>;

export function SnippetEditor() {
  const {
    openSnippetEditorObject: { openSnippetEditor, setOpenSnippetEditor },
    selectedSnippetObject: { selectedSnippet, setSelectedSnippet },
    allSnippetsObject: { allSnippets, setAllSnippets },
  } = useGlobalContext();

  const form = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: selectedSnippet?.title || "",
      description: selectedSnippet?.description || "",
      language: selectedSnippet?.language || "javascript",
      body: selectedSnippet?.body || "",
      code: selectedSnippet?.code || "",
      tags: selectedSnippet?.tags || [],
    },
  });

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  useEffect(() => {
    if (selectedSnippet) {
      form.reset({
        title: selectedSnippet.title,
        description: selectedSnippet.description,
        language: selectedSnippet.language,
        body: selectedSnippet.body,
        code: selectedSnippet.code,
        tags: selectedSnippet.tags || [],
      });
    }
  }, [selectedSnippet, form]);

  const onSubmit = (data: SnippetFormValues) => {
    if (!selectedSnippet) return;

    const updatedSnippet = {
      ...selectedSnippet,
      title: data.title,
      description: data.description,
      language: data.language,
      body: data.body,
      code: data.code,
      tags: data.tags,
    };

    // Update in allSnippets
    const updatedAllSnippets = allSnippets.map((s) =>
      s.id === selectedSnippet.id ? updatedSnippet : s
    );
    setAllSnippets(updatedAllSnippets);

    // Update selectedSnippet
    setSelectedSnippet(updatedSnippet);

    // Close editor
    setOpenSnippetEditor(false);
    setOpenAlertDialog(false);
  };

  const selectedLanguage = form.watch("language");

  return (
    <div
      className={`w-1/2 h-auto bg-secondary/30 border ${
        openSnippetEditor ? "block" : "hidden"
      } relative rounded-md`}
    >
      {/* header: Edit snippet details, language and close */}
      <div className="flex justify-between bg-background overflow-hidden rounded-t-md items-center border-b px-3 py-2">
        <div className="flex gap-2 items-center">
          <PencilLine className="size-4" />
          <p className="text-sm">Edit Snippet</p>
        </div>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={"sm"} className="p-0 capitalize">
                <p>{selectedLanguage || "Select Language"}</p>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-[200px] overflow-y-auto"
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
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => setOpenSnippetEditor(false)}
          >
            <X />
          </Button>
        </div>
      </div>

      <div className="flex flex-col px-3 py-2">
        {selectedSnippet && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="Snippet Title"
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
                      placeholder="Snippet Description"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* tags */}
              <div className="space-y-4">
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
                      placeholder="Snippet Explanation"
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
                  <Field className="gap-1">
                    <FieldLabel>Code</FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Snippet Code"
                      className="leading-relaxed min-h-[300px]"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Separator />

            {/* cancel and save btn */}
            <div className="flex justify-end gap-2">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setOpenSnippetEditor(false)}
              >
                Cancel
              </Button>
              {/* save btn that triggers alert dialog */}
              <AlertDialog
                open={openAlertDialog}
                onOpenChange={setOpenAlertDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button type="button">Save</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will update the snippet details.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
