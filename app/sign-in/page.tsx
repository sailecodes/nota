"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/actions/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, CircleX, Eye, EyeClosed } from "lucide-react";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    setIsSigningIn(true);

    const res = await signIn(data);

    setIsSigningIn(false);

    if (res) {
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
      <header className="text-4xl font-bold text-center">Nota</header>
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
                    type="email"
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
                <FormLabel className="flex items-center justify-between">
                  <span>Password</span>
                  <button
                    type="button"
                    className="grid place-items-center hover:cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
                  </button>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
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
          <p className="text-sm text-muted-foreground text-center col-span-full">
            Not registered yet?{" "}
            <Link
              href="/sign-in"
              className={"text-primary underline"}>
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </main>
  );
}
