"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/actions/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [signInErrMessage, setSignInErrMessage] = useState<string>("");

  const router = useRouter();

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    setIsSigningIn(true);

    const res = await signIn(data);

    setIsSigningIn(false);

    console.log(res);

    if (res && typeof res === "object" && "errMsg" in res) {
      toast.error(`${res.errMsg}`, {
        icon: <CircleX className="w-4 h-4 stroke-red-300" />,
      });
    } else {
      toast.success("Welcome back!", {
        description: ``,
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });

      router.push("/dashboard/overview");
    }
  };

  return (
    <main className="flex flex-col justify-center min-h-screen max-w-xl space-y-8 p-6 mx-auto my-auto">
      <div className="flex flex-col gap-2 items-center">
        <header className="text-4xl font-bold">Nota</header>
        <p className="text-sm text-muted-foreground">
          Not registered yet?{" "}
          <Link
            href="/sign-in"
            className={"text-primary underline"}>
            Sign up
          </Link>
        </p>
      </div>
      <Form {...signInForm}>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={signInForm.handleSubmit(handleSignIn)}>
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="example@domain.co"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="mysecret123"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="col-span-full mt-1 hover:cursor-pointer"
            disabled={isSigningIn}>
            Sign in
          </Button>
        </form>
      </Form>
    </main>
  );
}
