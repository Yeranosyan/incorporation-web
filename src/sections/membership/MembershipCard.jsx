import clsx from "clsx";
import { padNumber } from "@/lib/format";

const TONES = {
  graphite: "membership-card-graphite",
  glass: "membership-card-glass",
};

const MAX_VISIBLE_DEPTH = 2;

const stateOf = (depth) => {
  if (depth < 0) return "pending";
  if (depth === 0) return "front";
  if (depth > MAX_VISIBLE_DEPTH) return "buried";
  return "behind";
};

export function MembershipCard({ label, value, description, tone, index, total, depth }) {
  return (
    <div
      data-state={stateOf(depth)}
      className={clsx("membership-card", TONES[tone])}
      style={{ "--index": index, "--depth": Math.max(depth, 0) }}
    >
      <p className="membership-card-head">
        <span>{label}</span>
        <span className="tabular-nums">
          {padNumber(index + 1, 2)} / {padNumber(total, 2)}
        </span>
      </p>
      <div>
        <p className="membership-card-value">{value}</p>
        <p className="membership-card-description mt-3">{description}</p>
      </div>
    </div>
  );
}
