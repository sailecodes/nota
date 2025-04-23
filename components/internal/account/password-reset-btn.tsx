"use client";

import { toast } from "sonner";
import { sendPasswordResetLink } from "@/actions/account.action";
import { CheckCircle2, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPasswordProps } from "@/schemas";

export default function PasswordResetBtn({ user }: IPasswordProps) {
  const handleResetPassword = async () => {
    const res = await sendPasswordResetLink();

    if (res) {
      console.error("[Error while resetting password] ", res.error);
      toast.error(res.error, { icon: <CircleX className="w-4 h-4 stroke-red-300" /> });
    } else {
      toast.success("Password reset link sent!", {
        description: `We've sent you the link at ${user.email}.`,
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleResetPassword}
      className="hover:cursor-pointer w-[158px]">
      Reset password
    </Button>
  );
}
