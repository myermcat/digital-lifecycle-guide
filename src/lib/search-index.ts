export type SearchIndexRecord = {
  id: string;
  pageTitle: string;
  pagePath: string;
  sectionId: string;
  sectionHeading: string;
  lifecyclePhase: string;
  text: string;
  /** Extra terms for search (e.g. former page titles). */
  keywords?: string;
};

let cachedRecords: SearchIndexRecord[] | null = null;

export async function loadSearchIndex(): Promise<SearchIndexRecord[]> {
  if (cachedRecords) return cachedRecords;
  const res = await fetch(`${import.meta.env.BASE_URL}search-index.json`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to load search index (${res.status})`);
  }
  const json = (await res.json()) as SearchIndexRecord[];
  cachedRecords = json;
  return json;
}

