"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/actions/auth.action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomField from "@/components/general/custom-field";
import { Separator } from "@/components/ui/separator";

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

    const res = await signUp(data);

    setIsSigningUp(false);

    if (res) {
      if (res.error === "Email already exists") setSignUpErrMessage("Email already exists");
      else
        toast.error(`${res.error}`, {
          icon: <CircleX className="w-4 h-4 stroke-red-300" />,
        });
    } else {
      // TODO: Confirmation email functionality can be added later on.
      //       Caveat of not knowing if email is duplicate
      // toast.success("Check your inbox!", {
      //   description: `We've sent you a confirmation email at ${emailWatch}.`,
      //   icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      // });
      toast.success("Welcome to Nota!", {
        description: `Get started by uploading a meeting.`,
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });

      router.push("/dashboard");
    }
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
