import { buttonVariants } from "@/components/ui/button";
import { Github, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
                <Image src="/ezSnippy.svg" alt="Logo" fill />
              </div>
              <span className="text-5xl font-bold">ezSnippy</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The collaborative code snippet manager for modern development
              teams.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ezSnippy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={"https://github.com/ArunKushhhh/ezSnippy"}
              className={`flex gap-2 items-center px-4 py-4 ${buttonVariants({
                variant: "secondary",
              })} group`}
            >
              <Star className="size-4 group-hover:text-yellow-500 duration-300 ease-in-out" />
              Star Repository
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
