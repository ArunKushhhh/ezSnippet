"use client";

import { Snippet } from "@/app/types/types";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface navbarMenu {
  id: string;
  title: string;
  isSelected: boolean;
}

interface GlobalContextType {
  NavbarMenuObject: {
    navbarMenu: navbarMenu[];
    setNavbarMenu: React.Dispatch<React.SetStateAction<navbarMenu[]>>;
  };
  openSnippetEditorObject: {
    openSnippetEditor: boolean;
    setOpenSnippetEditor: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allSnippetsObject: {
    allSnippets: Snippet[];
    setAllSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  };
  selectedSnippetObject: {
    selectedSnippet: Snippet | null;
    setSelectedSnippet: React.Dispatch<React.SetStateAction<Snippet | null>>;
  };
  addSnippet: (snippet: Omit<Snippet, "id" | "createdAt">) => Promise<void>;
  updateSnippet: (id: string, snippet: Partial<Snippet>) => Promise<void>;
  deleteSnippet: (id: string) => Promise<void>;
  isLoading: boolean;
}

const ContextProvider = createContext<GlobalContextType>({
  NavbarMenuObject: {
    navbarMenu: [],
    setNavbarMenu: () => {},
  },
  openSnippetEditorObject: {
    openSnippetEditor: false,
    setOpenSnippetEditor: () => {},
  },
  allSnippetsObject: {
    allSnippets: [],
    setAllSnippets: () => {},
  },
  selectedSnippetObject: {
    selectedSnippet: null,
    setSelectedSnippet: () => {},
  },
  addSnippet: async () => {},
  updateSnippet: async () => {},
  deleteSnippet: async () => {},
  isLoading: false,
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navbarMenu, setNavbarMenu] = useState<navbarMenu[]>([
    {
      id: "snippets",
      title: "Snippets",
      isSelected: false,
    },
    {
      id: "saved",
      title: "Saved",
      isSelected: false,
    },
    {
      id: "trash",
      title: "Trash",
      isSelected: false,
    },
  ]);
  const [openSnippetEditor, setOpenSnippetEditor] = useState(false);
  const [allSnippets, setAllSnippets] = useState<Snippet[]>([]);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isSignedIn } = useAuth();

  const fetchAllSnippets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/snippets");
      if (!response.ok) {
        throw new Error("Failed to fetch snippets");
      }
      const data = await response.json();
      // Map _id to id
      const mappedSnippets = data.snippets.map((s: any) => ({
        ...s,
        id: s._id,
      }));
      setAllSnippets(mappedSnippets);
    } catch (error) {
      console.error("Error fetching snippets:", error);
      toast.error("Error fetching snippets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchAllSnippets();
    }
  }, [isSignedIn]);

  const addSnippet = async (snippetData: Omit<Snippet, "id" | "createdAt">) => {
    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetData),
      });

      if (!response.ok) {
        throw new Error("Failed to create snippet");
      }

      const { snippet } = await response.json();
      const newSnippet = { ...snippet, id: snippet._id };
      setAllSnippets((prev) => [...prev, newSnippet]);
      toast.success("Snippet created successfully");
    } catch (error) {
      console.error("Error creating snippet:", error);
      toast.error("Error creating snippet");
      throw error;
    }
  };

  const updateSnippet = async (id: string, snippetData: Partial<Snippet>) => {
    try {
      const response = await fetch(`/api/snippets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetData),
      });

      if (!response.ok) {
        throw new Error("Failed to update snippet");
      }

      const { snippet } = await response.json();
      const updatedSnippet = { ...snippet, id: snippet._id };

      setAllSnippets((prev) =>
        prev.map((s) => (s.id === id ? updatedSnippet : s))
      );

      if (selectedSnippet && selectedSnippet.id === id) {
        setSelectedSnippet(updatedSnippet);
      }
      toast.success("Snippet updated successfully");
    } catch (error) {
      console.error("Error updating snippet:", error);
      toast.error("Error updating snippet");
      throw error;
    }
  };

  const deleteSnippet = async (id: string) => {
    try {
      const response = await fetch(`/api/snippets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete snippet");
      }

      setAllSnippets((prev) => prev.filter((s) => s.id !== id));
      if (selectedSnippet && selectedSnippet.id === id) {
        setSelectedSnippet(null);
      }
      toast.success("Snippet deleted successfully");
    } catch (error) {
      console.error("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
      throw error;
    }
  };

  return (
    <ContextProvider.Provider
      value={{
        NavbarMenuObject: { navbarMenu, setNavbarMenu },
        openSnippetEditorObject: { openSnippetEditor, setOpenSnippetEditor },
        allSnippetsObject: { allSnippets, setAllSnippets },
        selectedSnippetObject: { selectedSnippet, setSelectedSnippet },
        addSnippet,
        updateSnippet,
        deleteSnippet,
        isLoading,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
