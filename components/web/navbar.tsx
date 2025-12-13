import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { SearchInput } from "./search-input";

export function Navbar() {
  const isAuthenticated = false;
  const isLoading = false;
  return (
    <div className="flex justify-between py-4 border-b px-4 sm md:px-12 fixed w-full top-0 left-0 z-1 bg-background/20 backdrop-blur-md">
      {/* left */}
      <div className="gap-4 flex items-center">
        {/* logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src={"/ezsnippet.svg"}
              alt="ezsnippet"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-bold hidden md:flex">ezSnippet</h1>
        </Link>

        {/* nav tabs */}
        <nav className="hidden md:flex">
          <ul>
            <li>
              <Link
                href={"/snippets"}
                className={`text-muted-foreground hover:text-foreground duration-100`}
              >
                Snippets
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* right */}
      <div className="flex gap-2 items-center">
        {/* global search input */}
        <SearchInput />

        {/* auth buttons */}
        {/* if user authenticated display logout btn */}
        {isLoading ? null : isAuthenticated ? (
          <Button>Logout</Button>
        ) : (
          // if user not authenticated, display login and signup btn
          <>
            <Link href={"/auth/sign-up"} className={buttonVariants()}>
              Sign up
            </Link>
            <Link
              href={"/auth/login"}
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          </>
        )}

        {/* theme toggle: default set to system */}
        <ThemeToggle />
      </div>
    </div>
  );
}
