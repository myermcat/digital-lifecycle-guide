import type { LucideIcon } from "lucide-react";
import { renderLinkedProse, type ThreadLinkedProse } from "@/lib/thread-rich-content";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";

export type SubphaseTeamRole = {
  role: string;
  icon: LucideIcon;
  body: ThreadLinkedProse;
};

export function SubphaseTeamRoles({
  id,
  title,
  intro,
  keepTeam,
  rolesIntro,
  roles,
  closing,
}: {
  id?: string;
  title: string;
  intro: ThreadLinkedProse;
  keepTeam?: ThreadLinkedProse;
  rolesIntro?: ThreadLinkedProse;
  roles: readonly SubphaseTeamRole[];
  closing?: ThreadLinkedProse;
}) {
  const iconTileClassName =
    "flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/[0.07] md:h-[4.25rem] md:w-[4.25rem]";

  return (
    <section id={id} className="mt-10 md:mt-12 scroll-mt-24">
      <h2 className={`${guideSectionTitle} mb-2`}>{title}</h2>
      <div className={guideProse}>
        <p>{renderLinkedProse(intro)}</p>
        {keepTeam ? <p className="mt-4">{renderLinkedProse(keepTeam)}</p> : null}
        {rolesIntro ? <p className="mt-4">{renderLinkedProse(rolesIntro)}</p> : null}
        <ul className="mt-5 space-y-5 list-none pl-0">
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.role} className="flex items-center gap-4 md:gap-5">
                <span className={iconTileClassName} aria-hidden>
                  <Icon className="size-8 text-primary/55 md:size-9" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-semibold text-foreground/90">{item.role}</span>{" "}
                  {renderLinkedProse(item.body)}
                </span>
              </li>
            );
          })}
        </ul>
        {closing ? <p className="mt-4">{renderLinkedProse(closing)}</p> : null}
      </div>
    </section>
  );
}
