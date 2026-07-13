import type { Status } from "@/content/types";

interface StatusBadgeProps {
  status: Status;
}

const labels: Record<Status, string> = {
  ACTIVE: "ACTIVE",
  COMING_SOON: "COMING SOON",
};

const styles: Record<Status, string> = {
  // Solid gold for active, muted/outlined for coming soon — visually distinct (FR-016).
  ACTIVE: "bg-gold text-ink",
  COMING_SOON: "bg-ink/80 text-gold-bright ring-1 ring-inset ring-gold/60 backdrop-blur-sm",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      data-status={status}
      className={`inline-flex items-center rounded-[3px] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
