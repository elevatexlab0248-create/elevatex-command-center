import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/daily-mission")({
  head: () => ({
    meta: [
      { title: "Daily mission — ElevateX Founder OS" },
      { name: "description", content: "Daily mission workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Daily mission — ElevateX Founder OS" },
      { property: "og:description", content: "Daily mission workspace inside ElevateX Founder OS." },
    ],
  }),
  component: DailyMissionPage,
});

function DailyMissionPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Daily mission" subtitle="Coming up next in the build." />
      <SectionCard title="Daily mission">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
