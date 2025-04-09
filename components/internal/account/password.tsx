"use client";

import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { sendPasswordResetLink } from "@/actions/account.actions";
import { CheckCircle2, CircleX } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface PasswordProps {
  user: User;
}

export default function Password({ user }: PasswordProps) {
  const handleResetPassword = async () => {
    const res = await sendPasswordResetLink();

    if (res) {
      console.error("Password reset error: ", res.msg);
      toast.error(res.msg, { icon: <CircleX className="w-4 h-4 stroke-red-300" /> });
    } else {
      toast.success("Password reset link sent!", {
        // TODO: Change description
        description: `We've sent you a reset link at ${user.email}.`,
        icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
      });
    }
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* TODO: Button can be separate client component to make Password component server */}
        <Button
          variant="secondary"
          onClick={handleResetPassword}
          className="hover:cursor-pointer w-[158px]">
          Reset password
        </Button>
        <p className="text-xs text-muted-foreground">
          You&apos;ll receive a secure link to reset your password. Note that resetting your
          password will log you out of your account.
        </p>
      </CardContent>
    </Card>
  );
}
