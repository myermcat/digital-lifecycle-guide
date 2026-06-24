import {
  Briefcase,
  Code,
  LifeBuoy,
  PenTool,
  Search,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  renderLinkedProse,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";

const iconTileClassName =
  "flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/[0.07] md:h-[4.75rem] md:w-[4.75rem]";

/** Map a whose-job role label to its lucide icon. */
export function whoseJobIconForRole(role: string): LucideIcon {
  const normalized = role.toLowerCase();

  if (normalized.includes("business owner")) {
    return Briefcase;
  }
  if (normalized.includes("user researcher") || normalized.includes("service designer")) {
    return Search;
  }
  if (normalized.includes("developer")) {
    return Code;
  }
  if (normalized.includes("designer") || normalized.includes("content author")) {
    return PenTool;
  }
  if (normalized.includes("security specialist")) {
    return ShieldCheck;
  }
  if (normalized.includes("operations")) {
    return Server;
  }

  return LifeBuoy;
}

export function ThreadWhoseJobIconList({ intro, roles, closing }: ThreadWhoseJobSection) {
  return (
    <div className={guideProse}>
      <p>{intro}</p>
      <ul className="mt-5 space-y-5 list-none pl-0">
        {roles.map((role) => {
          const Icon = whoseJobIconForRole(role.role);
          return (
            <li key={role.role} className="flex items-center gap-4 md:gap-5">
              <span className={iconTileClassName} aria-hidden>
                <Icon className="size-9 text-primary/55 md:size-10" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-semibold text-foreground/90">{role.role}</span>{" "}
                {renderLinkedProse(role)}
              </span>
            </li>
          );
        })}
      </ul>
      {closing ? (
        <p className="mt-4">
          {typeof closing === "string" ? closing : renderLinkedProse(closing)}
        </p>
      ) : null}
    </div>
  );
}
