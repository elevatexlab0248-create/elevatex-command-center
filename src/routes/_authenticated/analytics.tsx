import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — ElevateX Founder OS" },
      { name: "description", content: "Analytics workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Analytics — ElevateX Founder OS" },
      { property: "og:description", content: "Analytics workspace inside ElevateX Founder OS." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Analytics" subtitle="Coming up next in the build." />
      <SectionCard title="Analytics">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
