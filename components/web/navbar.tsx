import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { SearchInput } from "./search-input";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { useGlobalContext } from "./context-api";
import { NavMenu } from "./nav-menu";
import { Plus } from "lucide-react";

export async function Navbar() {
  const { isAuthenticated } = await auth();
  const isLoading = false;
  return (
    <div className="flex justify-between py-4 border-b px-4 sm md:px-12 fixed w-full top-0 left-0 z-1 bg-background/20 backdrop-blur-md">
      {/* left */}
      <div className="gap-4 flex items-center">
        {/* logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src={"/ezsnippy.svg"}
              alt="ezSnippy"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-bold hidden md:flex">ezSnippy</h1>
        </Link>

        {/* nav tabs */}
        <nav className="hidden md:flex">
          {isAuthenticated ? <NavMenu /> : null}
        </nav>
      </div>

      {/* right */}
      <div className="flex gap-2 items-center">
        {/* global search input */}
        <SearchInput />

        {/* auth buttons */}
        {/* if user authenticated display logout btn */}
        {isLoading ? null : isAuthenticated ? (
          <>
            <Link
              href={"/snippets/create"}
              className={`${buttonVariants({ variant: "default" })}`}
            >
              <Plus />
              <p className="hidden md:flex">Create Snippet</p>
            </Link>
            <UserButton />
          </>
        ) : (
          // if user not authenticated, display login and signup btn
          <>
            <div className={`${buttonVariants({ variant: "default" })}`}>
              <SignUpButton>Sign Up</SignUpButton>
            </div>
            <div className={`${buttonVariants({ variant: "outline" })}`}>
              <SignInButton>Login</SignInButton>
            </div>
          </>
        )}

        {/* theme toggle: default set to system */}
        <ThemeToggle />
      </div>
    </div>
  );
}
