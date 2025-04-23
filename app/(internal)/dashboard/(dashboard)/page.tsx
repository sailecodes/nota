import ActionItemsCard from "@/components/internal/dashboard/action-items-card";
import MonthlyUsageCard from "@/components/internal/dashboard/monthly-usage-card";
import RecentUploadsCard from "@/components/internal/dashboard/recent-uploads-card";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user: sUser },
    error,
  } = await supabase.auth.getUser();

  const pUser = await prisma.user.findUnique({
    where: { sbId: sUser!.id },
    include: { uploads: true, actionItems: true },
  });

  return (
    <section
      className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))]
      justify-center gap-3 max-w-7xl mx-auto p-4 pb-[25px]">
      <RecentUploadsCard user={pUser} />
      <ActionItemsCard user={pUser} />
      <MonthlyUsageCard user={pUser} />
    </section>
  );
}
