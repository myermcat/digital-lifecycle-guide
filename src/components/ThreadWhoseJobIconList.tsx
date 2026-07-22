import {
  Briefcase,
  ClipboardCheck,
  ClipboardList,
  Code,
  Coins,
  Compass,
  FileText,
  Headset,
  LifeBuoy,
  Map,
  Megaphone,
  PenTool,
  Rocket,
  Scale,
  Server,
  ShieldCheck,
  Stamp,
  Users,
  Activity,
  type LucideIcon,
} from "lucide-react";
import {
  renderLinkedProse,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";

const iconTileClassName =
  "flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/[0.07] md:h-[4.25rem] md:w-[4.25rem]";

/** Map a whose-job role label to its lucide icon. */
export function whoseJobIconForRole(role: string): LucideIcon {
  const normalized = role.toLowerCase();

  if (normalized.includes("business owner")) {
    return Briefcase;
  }
  if (
    normalized.includes("finance team") ||
    normalized.includes("chief financial officer") ||
    normalized.includes("(cfo)")
  ) {
    return Coins;
  }
  if (normalized.includes("corporate services")) {
    return Users;
  }
  if (normalized.includes("legal team") || normalized.includes("legal services")) {
    return Scale;
  }
  if (normalized.includes("treasury board secretariat analyst") || normalized.includes("tbs analyst")) {
    return ClipboardCheck;
  }
  if (normalized.includes("responsible minister") || normalized.includes("the minister")) {
    return Stamp;
  }
  if (normalized.includes("product or service owner")) {
    return ClipboardList;
  }
  if (
    normalized.includes("product owner or delivery lead") ||
    normalized.includes("delivery lead")
  ) {
    return Compass;
  }
  if (normalized.includes("human resources") || normalized.includes("hiring managers")) {
    return Users;
  }
  if (
    normalized.includes("change lead or sponsor") ||
    normalized.includes("change sponsor")
  ) {
    return Megaphone;
  }
  if (normalized.includes("managers of the affected teams") || normalized.includes("affected teams")) {
    return Users;
  }
  if (normalized.includes("service team")) {
    return Code;
  }
  if (normalized.includes("product manager")) {
    return Activity;
  }
  if (normalized.includes("runs the service in production")) {
    return Headset;
  }
  if (normalized.includes("change management community")) {
    return LifeBuoy;
  }
  if (normalized.includes("team members")) {
    return Code;
  }
  if (normalized.includes("digital talent community")) {
    return LifeBuoy;
  }
  if (normalized.includes("service designer") || normalized.includes("user researcher")) {
    return Map;
  }
  if (normalized === "the team") {
    return Code;
  }
  if (normalized.includes("release engineer")) {
    return Rocket;
  }
  if (normalized.includes("operations") || normalized.includes("front-line")) {
    return Headset;
  }
  if (normalized.includes("data scientist") || normalized.includes("developer") || normalized.includes("architect")) {
    return Code;
  }
  if (normalized.includes("designer") || normalized.includes("content author")) {
    return PenTool;
  }
  if (normalized.includes("security specialist")) {
    return ShieldCheck;
  }
  if (normalized.includes("procurement") || normalized.includes("contracting")) {
    return FileText;
  }
  if (normalized.includes("operations")) {
    return Server;
  }
  if (normalized.includes("legal") || normalized.includes("privacy")) {
    return LifeBuoy;
  }

  return LifeBuoy;
}

export function ThreadWhoseJobIconList({ intro, roles, closing }: ThreadWhoseJobSection) {
  return (
    <div className={guideProse}>
      {intro ? <p>{intro}</p> : null}
      <ul className="mt-5 space-y-5 list-none pl-0">
        {roles.map((role) => {
          const Icon = whoseJobIconForRole(role.role);
          return (
            <li key={role.role} className="flex items-center gap-4 md:gap-5">
              <span className={iconTileClassName} aria-hidden>
                <Icon className="size-8 text-primary/55 md:size-9" strokeWidth={1.75} />
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
