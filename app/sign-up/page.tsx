"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/actions/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  const emailWatch = signUpForm.watch(["email"]);

  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [signUpErrMessage, setSignUpErrMessage] = useState<string>("");

  const router = useRouter();

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setIsSigningUp(true);

    const res = await signUp(data);

    setIsSigningUp(false);

    if (res && typeof res === "object" && "errMessage" in res) {
      setSignUpErrMessage("Email already exists");
    } else {
      toast.success("Check your inbox!", {
        description: `We've sent you a confirmation email at ${emailWatch}.`,
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });

      router.push("/dashboard/overview");
    }
  };

  return (
    <main className="flex flex-col justify-center min-h-screen max-w-xl space-y-8 p-6 mx-auto my-auto">
      <div className="flex flex-col gap-2 items-center">
        <header className="text-4xl font-bold">Nota</header>
        {/* <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className={"text-primary underline"}>
            Log in
          </Link>
        </p> */}
      </div>
      <Form {...signUpForm}>
        <form
          className="grid grid-cols-2 gap-6 mb-4"
          onSubmit={signUpForm.handleSubmit(handleSignUp)}>
          <FormField
            control={signUpForm.control}
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
                <FormMessage>{signUpErrMessage}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
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
          <FormField
            control={signUpForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Sponge"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Bob"
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
            disabled={isSigningUp}>
            Sign up
          </Button>
        </form>
      </Form>
      <p className="text-xs text-muted-foreground text-center">
        {/* TODO: Add dummy Terms of Service and Privacy Policy text */}
        By clicking Sign up, you agree to our <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className={"text-primary underline"}>
          Log in
        </Link>
      </p>
    </main>
  );
}
