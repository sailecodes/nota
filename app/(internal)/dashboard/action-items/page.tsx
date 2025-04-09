import ActionItemCard from "@/components/internal/action-items/action-item-card";

const actionItemsData = [
  {
    id: "1",
    action: "Review Q2 Strategy Deck",
    status: "New",
    from: "Q2 Strategy Sync",
    dueDate: "Apr 10, 2025",
    assignedTo: "Raphael R.",
  },
  {
    id: "2",
    action: "Prepare budget forecast for Q3",
    status: "Upcoming",
    from: "Budget Planning Meeting",
    dueDate: "Apr 15, 2025",
    assignedTo: "Raphael R.",
  },
  {
    id: "3",
    action: "Follow up with marketing team on new campaign",
    status: "Due soon",
    from: "Marketing Sync",
    dueDate: "Mar 28, 2025",
    assignedTo: "Raphael R.",
  },
  {
    id: "4",
    action: "Finalize product roadmap for Q2",
    status: "Overdue",
    from: "Product Strategy Meeting",
    dueDate: "Mar 22, 2025",
    assignedTo: "Raphael R.",
  },
  {
    id: "5",
    action: "Complete customer feedback analysis",
    status: "Completed",
    from: "Customer Insights Session",
    dueDate: "Mar 20, 2025",
    assignedTo: "Raphael R.",
  },
];

export default function ActionItems() {
  return (
    <section className="grid auto-rows-[175px] gap-3 max-w-7xl mx-auto p-4">
      {actionItemsData.map((item) => (
        <ActionItemCard
          key={item.action}
          id={item.id}
          action={item.action}
          status={item.status}
          from={item.from}
          dueDate={item.dueDate}
          assignedTo={item.assignedTo}
        />
      ))}
    </section>
  );
}
