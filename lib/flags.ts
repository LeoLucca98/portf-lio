/** Pending markers are a working aid: visible in development, never in production builds. */
export const showPending = process.env.NODE_ENV !== "production" && process.env.HIDE_PENDING !== "1";
/** Internal details that depend on authorization. Off unless explicitly enabled. */
export const showRestricted = process.env.SHOW_RESTRICTED === "1";

export function isVisible(item: { pending?: string; restricted?: boolean; paragraphs?: string[]; items?: unknown[] }) {
  if (item.restricted && !showRestricted) return false;
  const empty =
    (item.paragraphs !== undefined && item.paragraphs.length === 0) || (item.items !== undefined && item.items.length === 0);
  if (item.pending && empty) return showPending;
  return true;
}
