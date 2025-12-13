"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/schemas/auth";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function Signup() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit() {
    startTransition(() => {});
  }
  return (
    <div className="relative px-4 sm md:px-12 py-8 max-w-4xl mx-auto flex flex-col gap-8 items-start">
      <Link href={"/"} className={`${buttonVariants({ variant: "outline" })}`}>
        <ArrowLeft />
        Go Back
      </Link>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Sign Up</FieldLegend>
            <FieldDescription>
              Fill the form below to create an account
            </FieldDescription>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Arun Kushwaha"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="arunkushwaha@gmail.com"
                    {...field}
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    {...field}
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <Spinner />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Sign up</span>
              )}
            </Button>
            <FieldSeparator />
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
