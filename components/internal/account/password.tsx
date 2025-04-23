import PasswordResetBtn from "./password-reset-btn";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { IPasswordProps } from "@/schemas";

export default async function Password({ user }: IPasswordProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PasswordResetBtn user={user} />
        <p className="text-xs text-muted-foreground">
          You&apos;ll receive a secure link to reset your password. Note that resetting your password will log you out
          of your account.
        </p>
      </CardContent>
    </Card>
  );
}
