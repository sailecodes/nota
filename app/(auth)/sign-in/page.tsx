"use client";

import Link from "next/link";
import CustomField from "@/components/general/custom-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServerActionResult, signInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { customFetch } from "@/utils";

export default function SignIn() {
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    setIsSigningIn(true);

    const { result, status } = await customFetch<
      z.infer<typeof signInSchema>,
      ServerActionResult<null>
    >("/api/auth/sign-in", data);

    if (result && "success" in result && !result.success) {
      console.error("[Sign in error] ", result.error);
      if (result.source === "action") toast.error(result.error);
      else toast.error("Something went wrong. Please try again.");
    } else if (!status) {
      toast.error(`Something went wrong. Please try again.`);
    } else {
      toast.success("Welcome back!");
      router.push("/dashboard");
    }

    setIsSigningIn(false);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-8 min-h-screen max-w-xl p-6 mx-auto my-auto">
      <header className="flex flex-col text-4xl font-bold text-center">Nota</header>
      <Form {...signInForm}>
        <form
          className="grid grid-cols-[400px] gap-6"
          onSubmit={signInForm.handleSubmit(handleSignIn)}>
          <CustomField
            control={signInForm.control}
            name="email"
            label="Email"
            type="email"
            placeholder="pparker@bugle.co"
          />
          <CustomField
            control={signInForm.control}
            name="password"
            label="Password"
            type="password"
            placeholder="mySecret123"
          />
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="col-span-full mt-1 hover:cursor-pointer"
            disabled={isSigningIn}>
            {isSigningIn ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
      <Separator />
      <div className="text-sm text-muted-foreground text-center col-span-full">
        <span>Not registered yet? </span>
        <Link
          href="/sign-up"
          className="text-primary underline">
          Sign up
        </Link>
      </div>
    </main>
  );
}
