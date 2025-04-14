import ProfileInformation from "@/components/internal/account/profile-information";
import EmailAddress from "@/components/internal/account/email-address";
import { createClient } from "@/utils/supabase/server";
import Password from "@/components/internal/account/password";
import SubscriptionAndBilling from "@/components/internal/account/subscription-and-billing";
import Danger from "@/components/internal/account/danger";

export default async function AccountPage() {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
      {!user && (
        // FIXME:
        <span className="text-lg font-semibold">
          Uh...something went wrong. Please refresh the page.
        </span>
      )}
      {user && (
        <>
          <ProfileInformation user={user} />
          <EmailAddress user={user} />
          <Password user={user} />
          <SubscriptionAndBilling />
          <Danger />
        </>
      )}
    </div>
  );
}
