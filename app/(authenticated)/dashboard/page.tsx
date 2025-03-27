import ActionItemsCard from "@/components/dashboard/action-items-card";
import MonthlyUsageCard from "@/components/dashboard/monthly-usage-card";
import RecentUploadsCard from "@/components/dashboard/recent-uploads-card";

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-24 border">
      <div className="pt-[26px]">
        <header className="text-4xl font-bold mb-5">Overview</header>
        <div className="grid grid-cols-[220px_220px_220px] gap-4">
          <RecentUploadsCard />
          <ActionItemsCard />
          <MonthlyUsageCard />
        </div>
      </div>
      <div>
        <header className="text-4xl font-bold mb-5">Upcoming deadlines</header>
        <div></div>
      </div>
    </section>
  );
}
