import { GuideCallout } from "@/components/GuideCallout";

export function ProcurementScopeCallout({ text }: { text: string }) {
  return (
    <GuideCallout label="Scope" compact className="mt-8">
      {text}
    </GuideCallout>
  );
}
