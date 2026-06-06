import * as React from "react";
import { cn } from "@/lib/utils";
import { chatChannelOrder, channelUrl, channelLabel, type ChatChannel } from "@/lib/contact";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.886 9.885zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.49-8.413z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.231-.696.063-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function ChannelIcon({ channel, className }: { channel: ChatChannel; className?: string }) {
  return channel === "whatsapp" ? <WhatsAppIcon className={className} /> : <TelegramIcon className={className} />;
}

interface ChatLauncherProps {
  locale: string;
  variant?: "pill" | "block" | "compact";
  className?: string;
}

export function ChatLauncher({ locale, variant = "pill", className }: ChatLauncherProps) {
  const channels = chatChannelOrder(locale);

  if (variant === "block") {
    return (
      <div className={cn("grid sm:grid-cols-2 gap-3", className)}>
        {channels.map((c) => (
          <a
            key={c}
            href={channelUrl(c)}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-4 rounded-3xl bg-white border border-ink-900/8 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={cn(
              "size-12 rounded-2xl grid place-items-center text-white shrink-0",
              c === "whatsapp" ? "bg-[oklch(0.65_0.15_150)]" : "bg-[oklch(0.65_0.15_230)]"
            )}>
              <ChannelIcon channel={c} className="size-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-ink-900">{channelLabel(c)}</div>
              <div className="text-sm text-ink-500">Open chat in a new tab</div>
            </div>
          </a>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        {channels.map((c) => (
          <a
            key={c}
            href={channelUrl(c)}
            target="_blank"
            rel="noopener"
            aria-label={channelLabel(c)}
            className="size-9 grid place-items-center rounded-full bg-ink-900/5 hover:bg-brand-500/10 text-ink-700 hover:text-brand-700 transition-colors"
          >
            <ChannelIcon channel={c} className="size-4" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {channels.map((c) => (
        <a
          key={c}
          href={channelUrl(c)}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-pill bg-white/70 hover:bg-white text-ink-700 hover:text-brand-700 text-xs font-semibold border border-ink-900/8 shadow-xs transition-all"
        >
          <ChannelIcon channel={c} className="size-3.5" />
          <span>{channelLabel(c)}</span>
        </a>
      ))}
    </div>
  );
}
