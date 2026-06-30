import { createFileRoute } from "@tanstack/react-router";
import { TreasuryBoardSubmissionPage } from "@/components/TreasuryBoardSubmissionPage";
import { THREADS } from "@/lib/guide-strings";
import {
  TREASURY_BOARD_SUBMISSION,
  treasuryBoardSubmissionLeadPlainText,
} from "@/lib/treasury-board-submission-content";

export const Route = createFileRoute("/thread/funding/treasury-board-submission")({
  head: () => ({
    meta: [
      {
        title: `${TREASURY_BOARD_SUBMISSION.title} — ${THREADS.funding.title} — The Digital Lifecycle Guide`,
      },
      {
        name: "description",
        content: treasuryBoardSubmissionLeadPlainText(TREASURY_BOARD_SUBMISSION.lead),
      },
    ],
  }),
  component: TreasuryBoardSubmissionPage,
});
