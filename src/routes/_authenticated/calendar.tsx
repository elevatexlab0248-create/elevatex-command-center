import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — ElevateX Founder OS" },
      { name: "description", content: "Calendar workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Calendar — ElevateX Founder OS" },
      { property: "og:description", content: "Calendar workspace inside ElevateX Founder OS." },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Calendar" subtitle="Coming up next in the build." />
      <SectionCard title="Calendar">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
