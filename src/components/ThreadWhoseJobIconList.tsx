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

/**
 * Map a whose-job role label to its lucide icon.
 *
 * This lives in a component, so the French build cannot swap it: it has to read both
 * languages. Matching on English alone sent every role on every French thread page to
 * the fallback glyph. The order of the tests is the order of the English original, so
 * English behaviour is unchanged; each test gains the French wording beside it.
 */
export function whoseJobIconForRole(role: string): LucideIcon {
  const normalized = role.toLowerCase().replace(/[\u2019\u02bc]/g, "'");
  const has = (...needles: string[]) => needles.some((n) => normalized.includes(n));

  if (has("business owner", "responsable operationnel", "responsable opérationnel")) {
    return Briefcase;
  }
  if (has("finance team", "chief financial officer", "(cfo)", "equipe des finances",
          "équipe des finances", "dirigeant principal des finances", "(dpf)")) {
    return Coins;
  }
  if (has("corporate services", "services ministeriels", "services ministériels")) {
    return Users;
  }
  if (has("legal team", "legal services", "equipe juridique", "équipe juridique",
          "services juridiques")) {
    return Scale;
  }
  if (has("treasury board secretariat analyst", "tbs analyst",
          "analyste du secretariat du conseil du tresor",
          "analyste du secrétariat du conseil du trésor", "analyste du sct")) {
    return ClipboardCheck;
  }
  if (has("responsible minister", "the minister", "ministre responsable", "le ministre")) {
    return Stamp;
  }
  if (has("product or service owner", "responsable de produit ou de service")) {
    return ClipboardList;
  }
  if (has("product owner or delivery lead", "delivery lead", "chef de la livraison",
          "gestionnaire de la livraison")) {
    return Compass;
  }
  if (has("human resources", "hiring managers", "ressources humaines",
          "gestionnaires d'embauche")) {
    return Users;
  }
  if (has("change lead or sponsor", "change sponsor", "responsable du changement",
          "parrain du changement")) {
    return Megaphone;
  }
  if (has("managers of the affected teams", "affected teams", "equipes touchees",
          "équipes touchées")) {
    return Users;
  }
  if (has("service team", "equipe du service", "équipe du service")) {
    return Code;
  }
  if (has("product manager", "gestionnaire de produit")) {
    return Activity;
  }
  if (has("runs the service in production", "exploite le service en production")) {
    return Headset;
  }
  if (has("change management community", "collectivite de gestion du changement",
          "collectivité de gestion du changement")) {
    return LifeBuoy;
  }
  if (has("team members", "membres de l'equipe", "membres de l'équipe")) {
    return Code;
  }
  if (has("digital talent community", "collectivite des talents numeriques",
          "collectivité des talents numériques")) {
    return LifeBuoy;
  }
  if (has("service designer", "user researcher", "concepteur de services",
          "concepteurs de services", "chercheur en experience utilisateur",
          "chercheur en expérience utilisateur", "chercheurs en experience utilisateur",
          "chercheurs en expérience utilisateur")) {
    return Map;
  }
  if (normalized === "the team" || normalized === "l'equipe" || normalized === "l'équipe") {
    return Code;
  }
  if (has("release engineer", "mise en production")) {
    return Rocket;
  }
  if (has("operations", "front-line", "premiere ligne", "première ligne")) {
    return Headset;
  }
  if (has("data scientist", "developer", "architect", "scientifiques des donnees",
          "scientifiques des données", "developpeur", "développeur", "architecte",
          "technologue")) {
    return Code;
  }
  if (has("designer", "content author", "concepteur", "redacteur de contenu",
          "rédacteur de contenu", "rédacteurs de contenu")) {
    return PenTool;
  }
  if (has("security specialist", "specialistes de la securite",
          "spécialistes de la sécurité")) {
    return ShieldCheck;
  }
  if (has("procurement", "contracting", "approvisionnement", "autorite contractante",
          "autorité contractante")) {
    return FileText;
  }
  if (has("operations", "exploitation")) {
    return Server;
  }
  if (has("legal", "privacy", "juridique", "vie privee", "vie privée")) {
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
