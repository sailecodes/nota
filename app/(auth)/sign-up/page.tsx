"use client";

import Link from "next/link";
import CustomField from "@/components/general/custom-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServerActionResult, signUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/actions/auth.action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { customFetch } from "@/utils";

// TODO: Redirect to dashboard if already logged in
// TODO: Confirmation email functionality can be added later on.
//       Caveat of not knowing if email is duplicate
// toast.success("Check your inbox!", {
//   description: `We've sent you a confirmation email at ${emailWatch}.`,
// });
export default function SignUp() {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  });
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [signUpErrMessage, setSignUpErrMessage] = useState<string>("");
  const router = useRouter();

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setIsSigningUp(true);

    const { result, status } = await customFetch<
      z.infer<typeof signUpSchema>,
      ServerActionResult<null>
    >("/api/auth/sign-up", data);

    if (result && "success" in result && !result.success) {
      console.error("[Sign up error] ", result.error);

      if (result.error.includes("Email")) setSignUpErrMessage(result.error);
      else if (result.source === "action") toast.error(result.error);
      else toast.error("Something went wrong. Please try again.");
    } else if (!status) {
      toast.error(`Something went wrong. Please try again.`);
    } else {
      toast.success("Welcome to Nota!", {
        description: `Get started by uploading a meeting.`,
      });
      router.push("/dashboard");
    }

    setIsSigningUp(false);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-8 min-h-screen max-w-xl p-6 mx-auto my-auto">
      <div className="flex flex-col gap-2 items-center">
        <header className="text-4xl font-bold">Nota</header>
      </div>
      <Form {...signUpForm}>
        <form
          className="grid grid-cols-[400px] gap-6"
          onSubmit={signUpForm.handleSubmit(handleSignUp)}>
          <CustomField
            control={signUpForm.control}
            name="email"
            label="Email"
            type="email"
            placeholder="pparker@bugle.co"
            error={signUpErrMessage}
          />
          <CustomField
            control={signUpForm.control}
            name="password"
            label="Password"
            type="password"
            placeholder="mySecret123"
          />
          <CustomField
            control={signUpForm.control}
            name="username"
            label="Username"
            placeholder="pparker"
          />
          <CustomField
            control={signUpForm.control}
            name="firstName"
            label="First name"
            placeholder="Peter"
          />
          <CustomField
            control={signUpForm.control}
            name="lastName"
            label="Last name"
            placeholder="Parker"
          />
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="col-span-full mt-1 hover:cursor-pointer"
            disabled={isSigningUp}>
            {isSigningUp ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </Form>
      {/* <p className="text-xs text-muted-foreground text-center w-[200px]">
        By signing up, you agree to our <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p> */}
      <Separator />
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
