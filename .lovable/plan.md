# Phase 2 — Functional Activation of Every Founder Tab

Current state: `Overview` is the only implemented page. Every other Founder route (`daily-mission`, `leads`, `leads/$leadId`, `pipeline`, `demos`, `outreach`, `tasks`, `my-tasks`, `content`, `content/approvals`, `calendar`, `analytics`, `team`, `activity`, `notes`, `settings`, `weekly-review`, `social`, `co-overview`) is a 26-line placeholder rendering "Not built yet".

The backend, design system, and logic layer are already in place and will not be redesigned: database schema with RLS, `src/lib/data.ts` query/mutation hooks, `src/lib/queries.ts`, `src/lib/automation.ts` (stage order, next-best-action, checklists, bottlenecks, productivity score), `src/lib/app-utils.ts`, and `src/components/app/primitives.tsx` (cards, KPI cards, badges, progress bars, loading/empty states). dnd-kit, recharts, date-fns, and zod are installed.

So this phase is page implementation on top of existing foundations — no new colour system, sidebar, typography, or card styles.

## Shared building blocks (added first)

- `DataTableShell`: search + filter selects + sort + pagination, collapsing to stacked cards on mobile.
- `RecordDialog`: form wrapper (zod validation, inline field errors, saving state, success toast).
- `ConfirmDelete`: "This action cannot be undone" dialog used for every destructive action.
- `ErrorState` + reuse of existing `LoadingRows` / `LoadingCards` / `EmptyState` on every page.
- `StageProgress`: horizontal 12-stage rail with an "Advance to X" action.
- One shared `logActivity` + `notify` writer (already in `data.ts`) called from every mutation path so Activity and Notifications fill automatically without duplicates.

## Build order

**Batch 1 — Leads, Lead Workspace, Pipeline**
- Leads: create/edit/delete/view, search, filters (stage, priority, assignee, source), sort, tags, assignment, lead score, toasts, delete confirmation, pagination.
- `/leads/$leadId` workspace: stage rail with next-stage action, tabs for Overview, Research, Demo, Outreach, Follow-ups, Notes, Activity — all editable, all writing activity logs.
- Pipeline: dnd-kit Kanban over all 12 stages; drop updates the lead, logs activity, invalidates counters, toasts. On mobile each card gets a stage picker instead of drag.
- Cards show business name, industry, score, priority, demo status, outreach status, next follow-up.

**Batch 2 — Demos, Outreach, Follow-ups**
- Demos: tracker table (lead, status, Lovable/Vercel/demo URLs, created, deployed), checklist toggles, open/copy URL actions, create + update records.
- Outreach: CRM table with channel, message, status, first/last contact, next follow-up, reply, meeting, outcome; actions for mark contacted, record reply, record meeting, set outcome.
- Follow-ups #1/#2/#3 with date, channel, note, status (pending/completed/skipped); "Due today" queue surfaced on both Overview and Outreach; notification created when one becomes due.

**Batch 3 — Tasks, Timer, Content, Calendar, Notes**
- Tasks: full CRUD, subtasks, recurrence, priority, deadline, lead link, assignment to Co-Founder, views (All / Today / Upcoming / Overdue / Completed) and filters (status, priority, assignee, date, lead).
- Timer: start / pause / resume / stop persisted to `task_time_entries` and restored after refresh; Today / This week / Total rollups.
- Content: approval centre with dynamic Pending / Approved / Scheduled / Published counts, prominent "Needs your review" queue, approve / reject / request changes / feedback / edit / schedule — each writing content feedback, activity, and a Co-Founder notification.
- Calendar: month / week / day views over tasks, follow-ups, meetings, content schedules and deadlines; event creation form; clicking an event opens its record.
- Notes: CRUD, pin, tags, search, linking to lead/task/content, useful empty states.

**Batch 4 — Daily Mission, Analytics, Team, Activity, Settings, Notifications, Search**
- Daily Mission: editable daily goals (lead/demo/deploy/outreach targets), today's queue with complete / status change / notes / timer, live completion percentage from records.
- Analytics: live lead counts (today/week/month), funnel with conversion percentages, productivity rollups, hours worked, date filters (Today / 7d / 30d / custom), recharts visuals.
- Team: Founder + Co-Founder cards with tasks today, completed, pending, overdue, content submitted/approved, last activity; drill-in summary; "Assign task" action.
- Activity: audit feed with user / action / object / date filters.
- Settings: profile (name, avatar, email), daily targets, notification toggles, existing theme controls untouched.
- Notifications: real records, mark read / mark all read, click-through to the related item.
- Global search: already wired to leads/tasks/content/notes/activity — extend to demos and outreach with grouped results and direct navigation.

**Batch 5 — Accuracy and consistency pass**
- Verify every Overview and Analytics number derives from records (nothing hardcoded), mutations invalidate all related query keys so counters move without manual refresh, related records stay in sync (pipeline↔lead, task completion↔dashboard, content approval↔status, follow-up completion↔outreach), and each page has loading, empty, error, and success states plus a working mobile layout.

## Technical notes

- No schema migration is expected; the existing tables (including `automation_settings`, `automation_log`, `content_schedule`) already cover this scope. If a gap appears, it ships as one migration with GRANTs, RLS, and founder/owner policies matching current patterns.
- All reads stay TanStack Query hooks in `src/lib/data.ts` / `src/lib/queries.ts`; mutations invalidate related keys. No realtime subscriptions — invalidation plus focus refetch keeps it fast and cheap.
- Automation stays event-driven inside the existing mutation flow, using an idempotency guard so equivalent open tasks/follow-ups are never duplicated.
- Column-scoped queries and pagination on the large tables; no page loads a full dataset.

## Not in this phase

Gemini/AI features, social-media API integrations, automatic sending or publishing. The `social`, `weekly-review`, and `co-overview` routes are Co-Founder/AI-adjacent and get functional-but-minimal treatment now, with depth in the next phase.
