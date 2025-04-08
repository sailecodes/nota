import AccountSkeleton from "@/components/account/account-skeleton";
import ProfileInformation from "@/components/account/profile-information";
import EmailAddress from "@/components/account/email-address";
import { createClient } from "@/lib/utils/supabase/server";
import Password from "@/components/account/password";

export default async function AccountPage() {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
      {!user && <AccountSkeleton />}
      {user && (
        <>
          <ProfileInformation user={user} />
          <EmailAddress user={user} />
          <Password user={user} />
        </>
      )}
      {/* <ProfileInformation user={user} /> */}
      {/* <AccountSkeleton /> */}
      {/* <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
          <ProfileInformation
            user={user}
            isLoaded={isLoaded}
          />
          <EmailAddress
            user={user}
            isLoaded={isLoaded}
          />

          <Card className="bg-background">
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive a secure link to reset your password.
          </p>
          <Button variant="secondary">Reset password</Button>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">Starter</Badge>
                <span className="text-sm text-muted-foreground">Renews Apr 30, 2025</span>
              </div>
            </div>
            <Button variant="secondary">Manage Plan</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usage</p>
              <p className="text-sm font-medium mt-1">2 / 3 uploads used</p>
            </div>
            <Button
              variant="secondary"
              size="sm">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">Starter</Badge>
                <span className="text-sm text-muted-foreground">Renews Apr 30, 2025</span>
              </div>
            </div>
            <Button variant="secondary">Manage Plan</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usage</p>
              <p className="text-sm font-medium mt-1">2 / 3 uploads used</p>
            </div>
            <Button
              variant="secondary"
              size="sm">
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
      // Use alert dialog 
      <Card className="border-red-400">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}>
            Delete account
          </Button>
        </CardContent>
      </Card>
        </div> */}
    </div>
  );
}
