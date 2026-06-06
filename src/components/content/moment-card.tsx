import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import type { Moment } from "@/data/moments";

// Facts:
// 1. Callers: src/app/[locale]/page.tsx (replacing analyst-stat tiles) + src/app/[locale]/stories/page.tsx (new Pulse section)
// 2. No equivalent: ls src/components/content returned 'no such file'; no MomentCard exists
// 3. IO: pure presentational; takes Moment prop; no file/network IO
// 4. User instruction verbatim: "start wave 2 fully"

export function MomentCard({ moment, className }: { moment: Moment; className?: string }) {
  return (
    <Card className={cn("p-0 overflow-hidden flex flex-col h-full", className)}>
      <div className={cn("h-32 grid place-items-center text-5xl", moment.bg)}>
        {moment.emoji}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-bold text-ink-900 text-base">{moment.name}</span>
          <span className="inline-flex items-center gap-1 text-ink-500">
            <MapPin className="size-3.5" />
            {moment.city}
          </span>
        </div>
        <div className="text-[0.7rem] uppercase tracking-wider font-bold text-brand-700">
          {moment.vertical}
        </div>
        <p className="text-ink-700 leading-relaxed text-sm flex-1">{moment.story}</p>
        <div className="mt-2 rounded-2xl bg-cream-100 px-4 py-3 text-sm font-semibold text-ink-900 leading-snug">
          {moment.metric}
        </div>
      </div>
    </Card>
  );
}
