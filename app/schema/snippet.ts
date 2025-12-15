import z from "zod";

export const snippetSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  body: z.string().min(10, "Body is required"),
  language: z.string().min(1, "Language is required"),
  code: z.string().min(3, "Code is required"),
  tags: z.array(z.string()).min(3, "At least 3 tags are required"),
});
