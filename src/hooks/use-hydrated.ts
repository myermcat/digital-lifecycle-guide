import { useEffect, useState } from "react";

/** True after the client has mounted — use to skip SSR-only-incompatible UI (e.g. Radix portals). */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
