export const SOO_VS_SOW_PATH = "/reference/soo-vs-sow";

export const MANAGING_WHAT_YOU_BOUGHT_PATH = "/reference/managing-what-you-bought";

export const OPTIONS_ANALYSIS_PATH = "/reference/options-analysis";

export const DESIGN_FOR_WHOLE_JOURNEY_PATH = "/reference/design-for-the-whole-journey";

export const TREASURY_BOARD_SUBMISSION_PATH = "/thread/funding/treasury-board-submission";

export const COSTING_A_SERVICE_PATH = "/thread/funding/costing-a-service";

export const STAYING_FUNDED_PATH = "/thread/funding/staying-funded";

export const FUNDING_THE_EXIT_PATH = "/thread/funding/funding-the-exit";

export const FUNDING_SUBPAGE_PATHS = [
  TREASURY_BOARD_SUBMISSION_PATH,
  COSTING_A_SERVICE_PATH,
  STAYING_FUNDED_PATH,
  FUNDING_THE_EXIT_PATH,
] as const;

/** @deprecated Former /reference/ URL; redirects to the Funding sub-page. */
export const TREASURY_BOARD_SUBMISSION_LEGACY_PATH = "/reference/treasury-board-submission";

/** @deprecated Former /reference/ URL; redirects to the Funding sub-page. */
export const COSTING_A_SERVICE_LEGACY_PATH = "/reference/costing-a-service";

/** @deprecated Former /reference/ URL; redirects to the Funding sub-page. */
export const STAYING_FUNDED_LEGACY_PATH = "/reference/staying-funded";

/** @deprecated Former /reference/ URL; redirects to the Funding sub-page. */
export const FUNDING_THE_EXIT_LEGACY_PATH = "/reference/funding-the-exit";

/** @deprecated Redirects to /create; approval journey content lives on the Create phase page. */
export const APPROVAL_JOURNEY_PATH = "/reference/approval-journey";

export const GOOD_CONTRACT_PATH = "/thread/procurement/good-contract";

/** @deprecated Flat Create-route URL from an earlier build. */
export const DESIGN_FOR_WHOLE_JOURNEY_FLAT_LEGACY_PATH = "/create-design-for-the-whole-journey";

/** @deprecated Nested Create-route URL from an earlier build. */
export const DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH = "/create/design-for-the-whole-journey";
