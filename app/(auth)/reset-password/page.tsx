"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import CustomField from "@/components/general/custom-field";
import { passwordSchema } from "@/lib/schemas/account.schema";
import { resetPassword } from "@/actions/account.actions";
import { createClient } from "@/lib/utils/supabase/client";
import { toast } from "sonner";
import { CircleX } from "lucide-react";

export default function ResetPassword() {
  const supabase = createClient();

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });
  const [isResettingPassword, setIsResettingPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleResetPassword = async (data: z.infer<typeof passwordSchema>) => {
    setIsResettingPassword(true);

    const res = await resetPassword(data);

    setIsResettingPassword(false);

    if (res) {
      toast.error(`${res.msg}`, { icon: <CircleX className="w-4 h-4 stroke-red-300" /> });
    } else {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error("Reset password error: ", err);
        toast.error(`${err}`, { icon: <CircleX className="w-4 h-4 stroke-red-300" /> });
        // TODO: What to do in this case?
        router.push("/"); // temporary
      }

      router.push("/sign-in");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center gap-8 min-h-screen max-w-xl p-6 mx-auto my-auto">
      <header className="text-4xl font-bold text-center">Nota</header>
      <Form {...passwordForm}>
        <form
          className="grid grid-cols-[400px] gap-6"
          onSubmit={passwordForm.handleSubmit(handleResetPassword)}>
          {/* TODO: Add password visible toggler */}
          <CustomField
            control={passwordForm.control}
            name="newPassword"
            label="New password"
            type="password"
            placeholder="myNewSecret123"
          />
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="col-span-full mt-1 hover:cursor-pointer"
            disabled={isResettingPassword}>
            {isResettingPassword ? "Resetting..." : "Reset"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
