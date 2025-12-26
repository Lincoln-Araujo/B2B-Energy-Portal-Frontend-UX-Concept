type Tone = "ok" | "attention" | "critical" | "neutral";

const toneStyles: Record<
  Tone,
  {
    card: string;
    badge: string;
    label: string;
  }
> = {
  ok: {
    card: "border-emerald-200 hover:shadow-emerald-100/50",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    label: "OK",
  },
  attention: {
    card: "border-amber-200 hover:shadow-amber-100/50",
    badge: "bg-amber-50 text-amber-900 border-amber-200",
    label: "Attention",
  },
  critical: {
    card: "border-rose-200 hover:shadow-rose-100/50",
    badge: "bg-rose-50 text-rose-900 border-rose-200",
    label: "Critical",
  },
  neutral: {
    card: "border-gray-200 hover:shadow-gray-100/50",
    badge: "bg-gray-50 text-gray-800 border-gray-200",
    label: "Info",
  },
};

type SidebarCalloutProps = {
  title: string;
  description: string;
  tone?: Tone;
};

export function SidebarCallout({
  title,
  description,
  tone = "neutral",
}: SidebarCalloutProps) {
  const s = toneStyles[tone];

  return (
    <div
      className={[
        "mt-6 rounded-md border bg-white p-3",
        "transition-shadow transition-transform duration-700 ease-out",
        "hover:-translate-y-[1px] hover:shadow-md",
        s.card,
      ].join(" ")}
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-gray-900">{title}</p>

        <span
          className={[
            "rounded-full border px-2 py-0.5",
            "text-[11px] font-medium leading-relaxed",
            s.badge,
          ].join(" ")}
          aria-label={`Status: ${s.label}`}
        >
          {s.label}
        </span>
      </div>

      <p className="mt-1 text-xs text-gray-600">{description}</p>
    </div>
  );
}
