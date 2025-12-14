"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CodePreview } from "./code-preview";
import Link from "next/link";
import { SignUpButton, useAuth } from "@clerk/nextjs";

export function Hero() {
  const { userId } = useAuth();
  return (
    <section className="relative overflow-x-hidden pb-20 pt-24 lg:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Powered by Gemini AI */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by Gemini AI</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your code snippets,{" "}
            <span className="text-primary">organized & explained</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Create, organize, and share reusable code snippets with syntax
            highlighting, AI-powered explanations, and lightning-fast search.
            Built for teams who ship fast.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {userId ? (
              <Link
                className={`${buttonVariants({ variant: "default" })}`}
                href={"/snippets"}
              >
                Go to Snippets
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className={`${buttonVariants({ variant: "default" })}`}>
                <SignUpButton>Get Started Free</SignUpButton>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <CodePreview />
        </div>
      </div>
    </section>
  );
}
