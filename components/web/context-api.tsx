"use client";

import { Snippet } from "@/app/types/types";
import { createContext, useContext, useState } from "react";

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
  const [allSnippets, setAllSnippets] = useState<Snippet[]>([
    {
      id: "snippet-101",
      title: "JavaScript Fetch POST Request",
      description: "Basic example of making a POST request using fetch API.",
      body: "Demonstrates a server-side webhook handler using Next.js.",
      language: "javascript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `fetch("/api/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John" }),
});`,
      tags: ["javascript", "fetch", "post"],
    },
    {
      id: "snippet-102",
      title: "Axios GET Request Example",
      description: "Simple Axios GET request with async/await.",
      body: "Used to fetch data from REST APIs.",
      language: "javascript",
      isSaved: false,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `import axios from "axios";

const response = await axios.get("/api/users");
console.log(response.data);`,
      tags: ["javascript", "axios", "api"],
    },
    {
      id: "snippet-103",
      title: "React useEffect Data Fetch",
      description: "Fetching data in React using useEffect hook.",
      body: "Common pattern for client-side data loading.",
      language: "javascript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `useEffect(() => {
  fetch("/api/posts")
    .then(res => res.json())
    .then(setPosts);
}, []);`,
      tags: ["react", "useEffect", "fetch"],
    },
    {
      id: "snippet-104",
      title: "TypeScript Interface Example",
      description: "Basic TypeScript interface for user data.",
      body: "Improves type safety across the application.",
      language: "typescript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `interface User {
  id: string;
  email: string;
  isActive: boolean;
}`,
      tags: ["typescript", "interface"],
    },
    {
      id: "snippet-105",
      title: "MongoDB Mongoose Connection",
      description: "Reusable MongoDB connection helper using Mongoose.",
      body: "Used in server-side applications.",
      language: "javascript",
      isSaved: false,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
};`,
      tags: ["mongodb", "mongoose", "database"],
    },
    {
      id: "snippet-106",
      title: "Next.js API Route",
      description: "Basic API route using Next.js App Router.",
      body: "Handles GET requests.",
      language: "typescript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}`,
      tags: ["nextjs", "api", "server"],
    },
    {
      id: "snippet-107",
      title: "Tailwind Button Styles",
      description: "Reusable Tailwind CSS button styles.",
      body: "Common UI utility snippet.",
      language: "css",
      isSaved: false,
      isTrash: true,
      createdAt: new Date().toLocaleDateString(),
      code: `<button class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
  Click me
</button>`,
      tags: ["tailwind", "css", "ui"],
    },
    {
      id: "snippet-108",
      title: "Array Map Example",
      description: "Using map to transform arrays in JavaScript.",
      body: "Functional programming pattern.",
      language: "javascript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);`,
      tags: ["javascript", "array", "map"],
    },
    {
      id: "snippet-109",
      title: "Debounce Function",
      description: "Debounce utility to limit function calls.",
      body: "Useful for search inputs.",
      language: "javascript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
      tags: ["javascript", "performance", "debounce"],
    },
    {
      id: "snippet-110",
      title: "JWT Token Verification",
      description: "Verify JWT tokens on the server.",
      body: "Used in protected routes.",
      language: "javascript",
      isSaved: false,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `import jwt from "jsonwebtoken";

const decoded = jwt.verify(token, process.env.JWT_SECRET);`,
      tags: ["jwt", "auth", "security"],
    },
    {
      id: "snippet-111",
      title: "Express Middleware Example",
      description: "Simple logging middleware for Express.",
      body: "Runs before request handlers.",
      language: "javascript",
      isSaved: false,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});`,
      tags: ["express", "middleware"],
    },
    {
      id: "snippet-112",
      title: "React Conditional Rendering",
      description: "Conditionally render components in React.",
      body: "Basic JSX pattern.",
      language: "javascript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `{isLoggedIn && <Dashboard />}`,
      tags: ["react", "conditional"],
    },
    {
      id: "snippet-113",
      title: "Promise.all Example",
      description: "Run async tasks in parallel.",
      body: "Improves performance.",
      language: "javascript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `await Promise.all([
  fetch("/api/a"),
  fetch("/api/b"),
]);`,
      tags: ["javascript", "async", "promise"],
    },
    {
      id: "snippet-114",
      title: "Local Storage Usage",
      description: "Save and retrieve data from localStorage.",
      body: "Client-side persistence.",
      language: "javascript",
      isSaved: false,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `localStorage.setItem("token", token);
const saved = localStorage.getItem("token");`,
      tags: ["browser", "storage"],
    },
    {
      id: "snippet-115",
      title: "Clerk Webhook Handler",
      description: "Handle Clerk user.created webhook.",
      body: "Creates a user record in MongoDB.",
      language: "typescript",
      isSaved: true,
      isTrash: false,
      createdAt: new Date().toLocaleDateString(),
      code: `if (evt.type === "user.created") {
  await User.create({
    clerkUserId: evt.data.id,
    emailAddress: evt.data.email_addresses[0].email_address,
  });
}`,
      tags: ["clerk", "webhook", "auth"],
    },
  ]);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  return (
    <ContextProvider.Provider
      value={{
        NavbarMenuObject: { navbarMenu, setNavbarMenu },
        openSnippetEditorObject: { openSnippetEditor, setOpenSnippetEditor },
        allSnippetsObject: { allSnippets, setAllSnippets },
        selectedSnippetObject: { selectedSnippet, setSelectedSnippet },
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
