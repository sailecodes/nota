"use client";

import Link from "next/link";
import CustomField from "@/components/general/custom-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/actions/auth.action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { CheckCircle2, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

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
    try {
      setIsSigningIn(true);

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(`${result.error}`);
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSigningIn(false);
    }
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
      <span className="text-sm text-muted-foreground text-center col-span-full">
        Not registered yet?{" "}
        <Link
          href="/sign-up"
          className="text-primary underline">
          Sign up
        </Link>
      </span>
    </main>
  );
}
