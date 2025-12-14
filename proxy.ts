import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes should be considered public (no auth required)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhooks(.*)",
]);

// Define which routes should be considered protected (auth required)
const isProtectedRoute = createRouteMatcher(["/snippets(.*)"]); // Add your specific protected routes here

export default clerkMiddleware(async (auth, req) => {
  // Check if the current request is for a public route
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Check if the current request is for a protected route
  if (isProtectedRoute(req)) {
    // If it's a protected route, enforce authentication
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
