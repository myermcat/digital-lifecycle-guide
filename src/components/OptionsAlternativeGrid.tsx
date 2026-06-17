import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guideProseTight } from "@/lib/guide-typography";

type OptionsAlternativeItem = {
  lead: string;
  body: string;
};

/**
 * Procurement journey accordion style — stacked bordered rows, serif titles, expandable body.
 * Same component shell as "How a procurement goes", without step numbers.
 */
export function OptionsAlternativeGrid({ items }: { items: OptionsAlternativeItem[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
      {items.map((item) => (
        <AccordionItem key={item.lead} value={item.lead}>
          <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
            <span className="font-serif text-base font-semibold text-primary">{item.lead}</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4">
            <p className={guideProseTight}>{item.body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
