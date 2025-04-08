import AccountSkeleton from "@/components/account/account-skeleton";
import ProfileInformation from "@/components/account/profile-information";
import EmailAddress from "@/components/account/email-address";
import { createClient } from "@/lib/utils/supabase/server";
import Password from "@/components/account/password";
import SubscriptionAndBilling from "@/components/account/subscription-and-billing";
import Danger from "@/components/account/danger";

export default async function AccountPage() {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  return (
    <div className="grid grid-cols-2 gap-3 max-w-7xl mx-auto p-4">
      {!user && <AccountSkeleton />}
      {user && (
        <>
          <ProfileInformation user={user} />
          <EmailAddress user={user} />
          <Password user={user} />
          <SubscriptionAndBilling />
          <Danger />
        </>
      )}
      {/* 
         

        
      
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
