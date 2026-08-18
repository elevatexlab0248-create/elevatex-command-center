import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/content/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — ElevateX Founder OS" },
      { name: "description", content: "Founder approval queue for submitted content." },
      { property: "og:title", content: "Approvals — ElevateX Founder OS" },
      { property: "og:description", content: "Founder approval queue for submitted content." },
    ],
  }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Approvals" subtitle="Review, approve or request changes." />
      <SectionCard title="Approval queue">
        <EmptyState title="Not built yet" description="The approval queue is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
