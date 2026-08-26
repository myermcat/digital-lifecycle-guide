import { Link } from "@tanstack/react-router";
import { guideLinkGcNetwork } from "@/lib/guide-typography";
import { SOURCE_COMING_SOON_PATH } from "@/lib/placeholder-sources";
import { UI } from "@/lib/ui-strings";

export function PlaceholderGcNetworkLink({
  source,
  children,
  part,
}: {
  source: string;
  children: string;
  part?: string;
}) {
  return (
    <Link
      to={SOURCE_COMING_SOON_PATH}
      search={{ source, part }}
      className={guideLinkGcNetwork}
      title={UI.onlyAvailableOnTheGovernmentOfCanadaNe}
    >
      {children}
    </Link>
  );
}
