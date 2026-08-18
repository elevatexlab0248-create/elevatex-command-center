import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/activity")({
  head: () => ({
    meta: [
      { title: "Activity — ElevateX Founder OS" },
      { name: "description", content: "Activity workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Activity — ElevateX Founder OS" },
      { property: "og:description", content: "Activity workspace inside ElevateX Founder OS." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Activity" subtitle="Coming up next in the build." />
      <SectionCard title="Activity">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
