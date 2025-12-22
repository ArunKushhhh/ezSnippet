"use client";

import { buttonVariants } from "@/components/ui/button";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  const { userId } = useAuth();
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-16 lg:py-24">
          <div className="relative">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to organize your code?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Join thousands of developers who save hours every week with
              ezSnippy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {userId ? (
                <Link
                  className={`${buttonVariants({ variant: "secondary" })}`}
                  href={"/snippets"}
                >
                  Go to Snippets
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className={`${buttonVariants({ variant: "secondary" })}`}>
                  <SignUpButton>Get Started Free</SignUpButton>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
