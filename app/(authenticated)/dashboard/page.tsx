import ActionItemsCard from "@/components/dashboard/action-items-card";
import MonthlyUsageCard from "@/components/dashboard/monthly-usage-card";
import RecentUploadsCard from "@/components/dashboard/recent-uploads-card";

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-24 p-4">
      <div>
        {/* <header className="text-4xl font-bold mb-7">Activity summary</header> */}
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
          <RecentUploadsCard />
          <ActionItemsCard />
          <MonthlyUsageCard />
        </div>
      </div>
      {/* TODO: Implement data table */}
      <div>
        {/* <header className="text-4xl font-bold mb-5">Upcoming deadlines</header> */}
        {/* <div></div> */}
      </div>
    </section>
  );
}
