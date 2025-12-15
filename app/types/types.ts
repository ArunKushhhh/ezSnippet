export interface Snippet {
  id: string;
  title: string;
  description: string;
  body: string;
  language: string;
  code: string;
  tags: string[];
  isSaved: boolean;
  isTrash: boolean;
  createdAt: string;
}
