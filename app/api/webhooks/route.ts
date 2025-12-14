import connectDB from "@/app/lib/db";
import User from "@/app/models/user-schema";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SIGNING_SECRET is not set");
    return new Response("Webhook signing secret not configured", {
      status: 500,
    });
  }

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    if (!id || !email_addresses || email_addresses.length === 0) {
      console.log("Missing event data");
      return new Response("Missing event data", { status: 400 });
    }

    const newUser = {
      clerkUserId: id,
      emailAddress: email_addresses[0].email_address,
    };

    try {
      await connectDB();
      await User.create(newUser);
      return NextResponse.json(newUser, { status: 200 });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
