import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/outreach")({
  head: () => ({
    meta: [
      { title: "Outreach — ElevateX Founder OS" },
      { name: "description", content: "Outreach workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Outreach — ElevateX Founder OS" },
      { property: "og:description", content: "Outreach workspace inside ElevateX Founder OS." },
    ],
  }),
  component: OutreachPage,
});

function OutreachPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Outreach" subtitle="Coming up next in the build." />
      <SectionCard title="Outreach">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
