# ElevateX Founder OS — V1 Build Plan

A private, role-based operating dashboard for running the agency: leads, demos, outreach, tasks, time, content approvals, and co-founder oversight — in a premium dark SaaS interface.

## What you get

**Two experiences, one backend**
- Founder: full access — Overview, Daily Mission, Leads, Pipeline, Demos, Outreach, Tasks, Content, Calendar, Analytics, Team, Activity, Notes, Settings.
- Co-Founder: Overview, My Tasks, Social Activity, Content, Calendar, Activity, Settings.
- Login/signup with roles stored server-side; permissions enforced in the database, not just hidden in the UI.

**Founder command center (home page)**
- "Good morning, Hamid" header with today's date.
- Today's Mission block with progress bars for Leads, Demos, Deployments, Outreach against daily targets.
- 8 clickable KPI cards: Leads, Demos, Websites Deployed, Outreach, Replies, Meetings, Clients, Productivity.
- "What should I do next?" panel that picks the highest-priority incomplete step on the most advanced lead and deep-links to it.
- Co-Founder activity feed, content awaiting approval, follow-ups due today, overdue tasks.
- Quick actions: Add Lead, Create Task, Add Content, Add Note, Add Follow-up.

**Lead engine**
- CRM table with search, filters, sorting, tags, bulk select and bulk stage/priority updates. Full field set including score (0-100), priority (Hot/Warm/Cold), source, decision maker, socials, assignee.
- Kanban pipeline with drag-and-drop across New → Analyzing → Prompt Ready → Demo Building → Deployed → Message Ready → Contacted → Follow-up → Replied → Meeting → Won/Lost.
- Lead detail workspace with tabs: Overview, Research, Demo, Outreach, Activity, Notes.
- Demo tracker per lead: 5-step checklist, Lovable/Vercel/Demo URLs, open + copy buttons, dates.
- Personalized outreach message editor: save, copy, mark ready, mark sent (no AI calls in V1, field structure ready for it).

**Outreach CRM**
- Per-lead message, channel, first contact, follow-ups 1-3, reply, meeting, outcome; status set as specified.
- "Follow-ups Due Today" queue.

**Tasks + time**
- Full CRUD, assignment, priority, deadline, notes, subtasks, recurring (daily/weekly/monthly/custom), status incl. Blocked.
- Optional link to a lead; next logical task suggested when a lead changes stage (never auto-completes).
- Focus timer per task (start/pause/resume/stop) with time entries, plus a distraction-free Focus Mode screen.

**Content workflow**
- Shared workspace: Idea → Draft → Submitted → Under Review → Approved/Rejected → Scheduled → Published.
- Co-Founder creates, drafts, uploads media, submits, sees feedback, edits and resubmits.
- Founder approval center: preview, Approve / Reject / Request Changes / Comment / Schedule.
- Content calendar with day/week/month views and manual scheduling. No social APIs in V1.

**Oversight and insight**
- Activity page with filtering; automatic activity records for meaningful actions.
- Team page with per-member cards (current tasks, completed today, pending, productivity, last active) and drill-down.
- Analytics: lead metrics, conversion funnel with auto-calculated percentages, productivity metrics, Today / 7 / 30 day ranges.
- Weekly Review page with totals, best day, most productive and most time-consuming task, and weekly notes.
- Unified calendar showing tasks, deadlines, follow-ups, meetings, content, recurring items with distinct indicators.
- Notification center with unread badge, covering all listed event types.
- Notes module: create/edit/delete, search, pin, tags, optional link to lead/task/content.
- Global search grouped by Leads, Tasks, Content, Notes, Activity.

**Polish**
- Dark navy/near-black canvas, elevated cards, blue/violet accent, 16-20px radii, soft shadows, Inter/Geist typography, Lucide icons, restrained clay depth on cards, subtle hover and motion.
- Skeleton loaders, error states, success toasts, confirmation dialogs, and a designed empty state on every page.
- Desktop-first, fully responsive: collapsible sidebar on tablet, mobile nav, stacked KPIs, touch-friendly Kanban.
- Realistic seeded demo data across leads, tasks, demos, outreach, content, notifications, activity, calendar — flagged as sample.

## Technical approach

- Lovable Cloud for database, auth, and storage. Roles live in a dedicated `user_roles` table with a security-definer `has_role()` helper — never on profiles.
- Tables: profiles, user_roles, leads, lead_activities, lead_notes, tasks, task_subtasks, task_time_entries, outreach, follow_ups, demos, content, content_feedback, content_schedule, notifications, calendar_events, notes, activity_logs, daily_goals, weekly_reviews. All with id/created_at/updated_at, plus created_by/assigned_to/status/priority where relevant.
- RLS on every table: founders full access via `has_role`; co-founder scoped to own tasks, own activity, content they authored, assigned work, and relevant calendar. No role self-modification, no lead deletion, no access to founder-only analytics tables.
- Data reads/writes through TanStack Start server functions with auth middleware; protected pages under the authenticated route subtree; public landing + `/auth` stay public.
- Derived counters, progress, funnel percentages, overdue and follow-up-due lists computed from queries rather than duplicated columns. Activity log rows written by database triggers so history is never missed.
- Shared component library: Card, Button variants, Modal, DataTable, KanbanCard, StatusBadge, ProgressBar, TaskItem, ActivityItem, Chart wrappers, form fields. TypeScript throughout.
- Media uploads to a storage bucket with owner-scoped policies.
- AI hooks left as clearly marked seams (lead analysis, scoring, message generation, daily planning, weekly review) with no external AI calls in V1.

## Build order

1. Cloud enablement, schema, RLS, seed data, auth + role routing and app shell.
2. Leads CRM, pipeline, lead detail, demo tracker.
3. Tasks, subtasks, timers, Focus Mode, Daily Mission.
4. Outreach CRM and follow-up queue.
5. Content workflow, approval center, content calendar.
6. Founder Overview command center, next-action engine, notifications, activity, team.
7. Analytics, weekly review, unified calendar, notes, global search.
8. Responsive pass, empty/loading/error states, polish.
