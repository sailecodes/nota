import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-sm text-muted-foreground font-medium xs:flex-row">
            <div className="flex-1 leading-none space-y-2">
              <span className="block">First name</span>
              <Skeleton className="w-full h-[36px]" />
            </div>
            <div className="flex-1 leading-none space-y-2">
              <span className="block">Last name</span>
              <Skeleton className="w-full h-[36px]" />
            </div>
            <Button
              disabled
              variant="secondary"
              className="w-[158px] xs:self-end">
              Update information
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full bg-background">
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col justify-between gap-4 xs:flex-row">
            <div className="flex-1 space-y-2">
              <span className="flex items-center gap-1 text-sm text-muted-foreground font-medium leading-none">
                Primary <Skeleton className="size-4" />
              </span>
              <Skeleton className="w-full h-[36px]" />
            </div>
            <Button
              type="submit"
              variant="secondary"
              disabled
              className="xs:self-end w-[158px]">
              Change email
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            You'll receive a verification email to confirm before any permanent change is shown.
          </p>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            disabled
            variant="secondary"
            className="hover:cursor-pointer w-[158px]">
            Reset password
          </Button>
          <p className="text-xs text-muted-foreground">
            You&apos;ll receive a secure link to reset your password. Note that resetting your
            password will log you out of your account.
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-full border-red-400">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data.
          </span>
          <div>
            <Button
              disabled
              variant="destructive"
              className="w-[158px] hover:cursor-pointer">
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
