import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — ElevateX Founder OS" },
      { name: "description", content: "Tasks workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Tasks — ElevateX Founder OS" },
      { property: "og:description", content: "Tasks workspace inside ElevateX Founder OS." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Tasks" subtitle="Coming up next in the build." />
      <SectionCard title="Tasks">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
