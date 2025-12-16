import connectDB from "@/app/lib/db";
import Snippet from "@/app/models/snippet-schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ snippetId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { snippetId } = await params;

  await connectDB();
  const snippet = await Snippet.findOne({
    _id: snippetId,
    clerkUserId: userId,
  });

  if (!snippet) {
    return new NextResponse("Snippet not found", { status: 404 });
  }

  return NextResponse.json({ snippet });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ snippetId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { snippetId } = await params;
  const body = await req.json();

  await connectDB();
  const snippet = await Snippet.findOneAndUpdate(
    { _id: snippetId, clerkUserId: userId },
    body,
    { new: true }
  );

  if (!snippet) {
    return new NextResponse("Snippet not found", { status: 404 });
  }

  return NextResponse.json({ snippet });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ snippetId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { snippetId } = await params;

  await connectDB();
  const snippet = await Snippet.findOneAndDelete({
    _id: snippetId,
    clerkUserId: userId,
  });

  if (!snippet) {
    return new NextResponse("Snippet not found", { status: 404 });
  }

  return NextResponse.json({ message: "Snippet deleted" });
}
