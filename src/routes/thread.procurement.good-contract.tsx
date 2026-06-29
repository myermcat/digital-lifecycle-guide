import { createFileRoute } from "@tanstack/react-router";
import { GoodContractPage } from "@/components/GoodContractPage";
import { GOOD_CONTRACT } from "@/lib/good-contract-content";

export const Route = createFileRoute("/thread/procurement/good-contract")({
  head: () => ({
    meta: [
      { title: `${GOOD_CONTRACT.title} — Procurement — The Digital Lifecycle Guide` },
      {
        name: "description",
        content: GOOD_CONTRACT.lead[0].text,
      },
    ],
  }),
  component: GoodContractPage,
});
