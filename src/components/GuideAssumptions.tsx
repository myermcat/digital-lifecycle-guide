export const GUIDE_ASSUMPTIONS_TEXT =
  "You are already working to the GC Digital Standards and the relevant law on privacy, security, and accessibility. You are designing your service to be reused and to scale across government, not as a one-off for your team alone. The playbook builds on these rather than repeating them.";

export function GuideAssumptions({ className }: { className?: string }) {
  return (
    <div className={`space-y-2 text-sm leading-[1.7] text-muted-foreground/50 ${className ?? ""}`}>
      <p className="text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/35">
        Assumptions this page makes
      </p>
      <p className="text-muted-foreground/40">{GUIDE_ASSUMPTIONS_TEXT}</p>
    </div>
  );
}
