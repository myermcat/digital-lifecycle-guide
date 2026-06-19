import { useEffect, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { practiceCardGridCols, practiceCardLinkClassName } from "@/components/PracticeCard";
import { useHydrated } from "@/hooks/use-hydrated";
import { guideProse, guideSubsectionTitle } from "@/lib/guide-typography";

export type PhasePreviewCardData = {
  id: string;
  title: string;
  preview: string;
  popupBody: ReactNode;
};

export function PhasePreviewPopupCards({ cards }: { cards: PhasePreviewCardData[] }) {
  const hydrated = useHydrated();
  const [openId, setOpenId] = useState<string | null>(null);
  const openCard = cards.find((card) => card.id === openId);

  useEffect(() => {
    if (!openId) {
      document.body.style.pointerEvents = "";
    }
    return () => {
      document.body.style.pointerEvents = "";
    };
  }, [openId]);

  return (
    <>
      <ul
        className={`grid gap-3 list-none pl-0 ${practiceCardGridCols(cards.length)}`}
        aria-label="Security by lifecycle phase"
      >
        {cards.map((card) => (
          <li key={card.id}>
            <button
              type="button"
              onClick={() => setOpenId(card.id)}
              className={`${practiceCardLinkClassName} w-full text-left`}
              style={{ backgroundColor: "var(--phase-group)" }}
            >
              <span className={guideSubsectionTitle}>{card.title}</span>
              <span className={`mt-2 ${guideProse}`}>{card.preview}</span>
            </button>
          </li>
        ))}
      </ul>

      {hydrated && openCard ? (
        <Dialog open={openId !== null} onOpenChange={(open) => !open && setOpenId(null)}>
          <DialogContent className="sm:max-w-lg bg-card">
            <DialogHeader>
              <DialogTitle className={guideSubsectionTitle}>{openCard.title}</DialogTitle>
            </DialogHeader>
            <p className={guideProse}>{openCard.popupBody}</p>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
