import ActionItemsCard from "@/components/internal/overview/action-items-card";
import MonthlyUsageCard from "@/components/internal/overview/monthly-usage-card";
import RecentUploadsCard from "@/components/internal/overview/recent-uploads-card";

export default function Dashboard() {
  return (
    <section className="grid grid-cols-[minmax(0,408px)] md:grid-cols-[1fr_1fr_1fr] justify-center gap-3 max-w-7xl mx-auto p-4">
      <RecentUploadsCard />
      <ActionItemsCard />
      <MonthlyUsageCard />
    </section>
  );
}
