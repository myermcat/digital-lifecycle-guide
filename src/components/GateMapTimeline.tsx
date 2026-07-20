/** Horizontal Create → Live → Sunset duration map in the guide warm palette. */
export function GateMapTimeline({ className }: { className?: string }) {
  return (
    <div
      className={
        className ??
        "rounded-lg border border-border bg-card px-4 py-3 md:px-5 md:py-4 mb-6 md:mb-8"
      }
    >
      <svg
        viewBox="0 0 900 194"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Timeline showing Discovery, Alpha, and Beta making up the Create phase (about 6 to 12 months), then Live and Sunset as open-ended"
        className="w-full h-auto block"
      >
        <text
          x="0"
          y="14"
          className="fill-muted-foreground"
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          HOW LONG IT TAKES
        </text>
        <defs>
          <pattern
            id="gate-map-hatch"
            width="8"
            height="8"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="8" height="8" className="fill-muted" />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              className="stroke-border"
              strokeWidth="4"
            />
          </pattern>
        </defs>

        <line
          x1="410"
          y1="50"
          x2="410"
          y2="124"
          className="stroke-primary"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text
          x="410"
          y="43"
          textAnchor="middle"
          className="fill-primary"
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          LAUNCH
        </text>

        <text
          x="78"
          y="63"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}
        >
          Discovery
        </text>
        <text
          x="78"
          y="77"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 11 }}
        >
          weeks to months
        </text>
        <rect x="22" y="84" width="112" height="40" rx="4" className="fill-primary" />

        <text
          x="176"
          y="63"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}
        >
          Alpha
        </text>
        <text
          x="176"
          y="77"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 11 }}
        >
          weeks
        </text>
        <rect x="140" y="84" width="72" height="40" rx="4" className="fill-primary" />

        <text
          x="311"
          y="63"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}
        >
          Beta
        </text>
        <text
          x="311"
          y="77"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 11 }}
        >
          months
        </text>
        <rect
          x="218"
          y="84"
          width="186"
          height="40"
          rx="4"
          className="fill-primary"
          opacity="0.85"
        />

        <text
          x="560"
          y="63"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}
        >
          Live
        </text>
        <text
          x="560"
          y="77"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 11 }}
        >
          ongoing (years)
        </text>
        <rect
          x="418"
          y="84"
          width="284"
          height="40"
          rx="4"
          fill="url(#gate-map-hatch)"
          className="stroke-border"
        />

        <text
          x="800"
          y="63"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}
        >
          Sunset
        </text>
        <text
          x="800"
          y="77"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 11 }}
        >
          when it comes
        </text>
        <rect
          x="710"
          y="84"
          width="180"
          height="40"
          rx="4"
          fill="url(#gate-map-hatch)"
          className="stroke-border"
        />

        <path
          d="M22,134 Q22,142 30,142 L205,142 Q213,142 213,150 Q213,142 221,142 L396,142 Q404,142 404,134"
          fill="none"
          className="stroke-foreground"
          strokeWidth="1.5"
        />
        <text
          x="213"
          y="168"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontFamily: "Georgia, serif", fontSize: 12.5, fontWeight: 700 }}
        >
          Create - the project part
        </text>
        <text
          x="213"
          y="182"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 11 }}
        >
          about 6 to 12 months (varies widely)
        </text>

        <text
          x="654"
          y="148"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 11,
            fontStyle: "italic",
          }}
        >
          open-ended - as long as the service is needed
        </text>
      </svg>
    </div>
  );
}
