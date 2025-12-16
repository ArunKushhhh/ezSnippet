import connectDB from "@/app/lib/db";
import Snippet from "@/app/models/snippet-schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();
  const snippets = await Snippet.find({ clerkUserId: userId });

  return NextResponse.json({ snippets });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { title, description, body, language, code, tags, isSaved, isTrash } =
    await req.json();

  await connectDB();
  const snippet = await Snippet.create({
    clerkUserId: userId,
    title,
    description,
    body,
    language,
    code,
    tags,
    isSaved,
    isTrash,
  });

  return NextResponse.json({ snippet });
}
