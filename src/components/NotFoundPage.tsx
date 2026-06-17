import { Link } from "@tanstack/react-router";
import { AnimalIllustrationPanel } from "@/components/AnimalIllustrationPanel";
import { GuideLayout } from "@/components/GuideLayout";
import { guideProse } from "@/lib/guide-typography";

export function NotFoundPage() {
  return (
    <GuideLayout bare>
      <AnimalIllustrationPanel animal="bear">
        <header className="mb-6 md:mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">404</p>
          <h1 className="mt-4 font-serif text-4xl md:text-[2.75rem] font-semibold tracking-tight text-foreground leading-[1.1]">
            This page wandered off
          </h1>
          <div className="mx-auto md:mx-0 mt-5 h-px w-16 bg-border" />
        </header>

        <div className="space-y-6">
          <p className={guideProse}>
            The page you are looking for does not exist, or it may have moved. Either way, it is not
            here.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to home
            </Link>
          </div>
        </div>
      </AnimalIllustrationPanel>
    </GuideLayout>
  );
}
