import MeetingCard from "@/components/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/meetings/meeting-card-skeleton";

const meetingsData = [
  {
    id: "1",
    title: "powercoms-standup-022425.mp3",
    status: "Processing",
    uploadedBy: "Elias R.",
    dateUploaded: "Feb 24, 2025",
    summary:
      "Outlined deliverables for sprint 14, identified blockers, and delegated tasks to team members.",
    numOfActionItems: 2,
  },
  {
    id: "2",
    title: "Client Onboarding Call – Acme Inc.",
    status: "Completed",
    uploadedBy: "Sandra R.",
    dateUploaded: "Mar 20, 2025",
    summary:
      "Reviewed onboarding steps, shared documentation, and scheduled next check-in for the implementation phase.",
    numOfActionItems: 5,
  },
  {
    id: "3",
    title: "Sprint Planning",
    status: "Completed",
    uploadedBy: "Raphael R.",
    dateUploaded: "Mar 19, 2025",
    summary:
      "Outlined deliverables for sprint 14, identified blockers, and delegated tasks to team members.",
    numOfActionItems: 2,
  },
  {
    id: "4",
    title: "Team Retrospective",
    status: "Failed",
    uploadedBy: "Criz P.",
    dateUploaded: "Mar 18, 2025",
    summary:
      "Analyzed team performance during the sprint, discussed wins and pain points, and defined process improvements.",
    numOfActionItems: 1,
  },
  {
    id: "5",
    title: "Sales Enablement Briefing",
    status: "Processing",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
];

export default function Meetings() {
  return (
    <section className="grid grid-cols-3 auto-rows-[300px] gap-3 max-w-7xl mx-auto p-4">
      {/* TODO: Implement search bar and filter */}
      {meetingsData.map((meeting) =>
        meeting.status === "Processing" ? (
          <MeetingCardSkeleton
            key={meeting.id}
            title={meeting.title}
            uploadedBy={meeting.uploadedBy}
            dateUploaded={meeting.dateUploaded}
          />
        ) : (
          <MeetingCard
            key={meeting.id}
            id={meeting.id}
            title={meeting.title}
            status={meeting.status}
            uploadedBy={meeting.uploadedBy}
            dateUploaded={meeting.dateUploaded}
            summary={meeting.summary}
            numOfActionItems={meeting.numOfActionItems}
          />
        )
      )}
    </section>
  );
}
