import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import prisma from "@/utils/prisma";

const meetingsData = [
  {
    id: "1",
    title: "powercoms-standup-022425.mp3",
    status: "TRANSCRIBING",
    uploadedBy: "Elias R.",
    dateUploaded: "Feb 24, 2025",
    summary:
      "Outlined deliverables for sprint 14, identified blockers, and delegated tasks to team members.",
    numOfActionItems: 2,
  },
  {
    id: "2",
    title: "Client Onboarding Call – Acme Inc.",
    status: "COMPLETED",
    uploadedBy: "Sandra R.",
    dateUploaded: "Mar 20, 2025",
    summary:
      "Reviewed onboarding steps, shared documentation, and scheduled next check-in for the implementation phase.",
    numOfActionItems: 5,
  },
  {
    id: "3",
    title: "Sprint Planning",
    status: "COMPLETED",
    uploadedBy: "Raphael R.",
    dateUploaded: "Mar 19, 2025",
    summary:
      "Outlined deliverables for sprint 14, identified blockers, and delegated tasks to team members.",
    numOfActionItems: 2,
  },
  {
    id: "4",
    title: "Team Retrospective",
    status: "FAILED",
    uploadedBy: "Criz P.",
    dateUploaded: "Mar 18, 2025",
    summary:
      "Analyzed team performance during the sprint, discussed wins and pain points, and defined process improvements.",
    numOfActionItems: 1,
  },
  {
    id: "5",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "6",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "7",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "8",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "9",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "10",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "11",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "12",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "13",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "14",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "15",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
  {
    id: "16",
    title: "Sales Enablement Briefing",
    status: "EXTRACTING",
    uploadedBy: "Cayz P.",
    dateUploaded: "Mar 17, 2025",
    summary:
      "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs.",
    numOfActionItems: 0,
  },
];

export default async function Meetings() {
  const ms = await prisma.upload.findMany();

  console.log(ms);

  return (
    <section className="grid grid-cols-3 auto-rows-[300px] gap-3 max-w-7xl mx-auto p-4">
      {/* TODO: Implement search bar and filter */}
      {ms.map((upload) => (
        // upload.processStatus !== "COMPLETED" ? (
        //   <MeetingCardSkeleton
        //     key={meeting.id}
        //     title={meeting.title}
        //     status={meeting.status}
        //     uploadedBy={meeting.uploadedBy}
        //     dateUploaded={meeting.dateUploaded}
        //   />
        // ) :
        <MeetingCard
          key={upload.id}
          id={upload.id}
          title={upload.title}
          status={upload.processStatus}
          uploadedBy={upload.uploaderId}
          dateUploaded={upload.createdAt}
          summary={
            "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs."
          }
          numOfActionItems={3}
        />
      ))}
    </section>
  );
}
