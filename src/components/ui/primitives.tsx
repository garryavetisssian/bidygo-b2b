import * as React from "react";
import { cn } from "@/lib/utils";

/* ============================== Container ============================== */

export function Container({
  className,
  children,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide" | "full";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[88rem]",
        size === "full" && "max-w-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ============================== Section ============================== */

type Tone = "default" | "muted" | "cream" | "cocoa" | "brand" | "spotlight";

export function Section({
  className,
  children,
  tone = "default",
  containerSize = "default",
  noContainer = false,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  containerSize?: "narrow" | "default" | "wide" | "full";
  noContainer?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-16 sm:py-20 lg:py-24",
        tone === "muted" && "bg-cream-100",
        tone === "cream" && "bg-cream-50",
        tone === "cocoa" && "bg-cocoa-700 text-cream-50",
        tone === "brand" && "bg-brand-500 text-white",
        tone === "spotlight" && "bg-spotlight",
        className
      )}
      {...props}
    >
      {noContainer ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        align === "center" && "items-center text-center mx-auto",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="display-2 text-pretty">{title}</h2>
      {description ? (
        <p className="text-base sm:text-lg text-ink-600 text-pretty leading-relaxed max-w-2xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ============================== Badge ============================== */

type BadgeVariant = "default" | "brand" | "mint" | "ink" | "outline" | "subtle";

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold tracking-tight",
        variant === "default" && "bg-cream-200 text-ink-700",
        variant === "brand" && "bg-brand-500/12 text-brand-700",
        variant === "mint" && "bg-mint-500/15 text-[oklch(0.45_0.12_165)]",
        variant === "ink" && "bg-ink-900 text-cream-50",
        variant === "outline" && "border border-ink-900/15 text-ink-700",
        variant === "subtle" && "bg-cream-100 text-ink-600 border border-ink-900/5",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* ============================== Card ============================== */

export function Card({
  className,
  children,
  interactive = false,
  elevated = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  /** Slightly stronger initial shadow for premium feel. */
  elevated?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white border border-ink-900/[0.06]",
        "shadow-[0_1px_0_0_oklch(1_0_0/0.6)_inset,0_2px_6px_-1px_oklch(0.155_0.018_36/0.06),0_1px_2px_-1px_oklch(0.155_0.018_36/0.04)]",
        elevated && "shadow-elevated",
        interactive &&
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-500/25",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 p-6 sm:p-7", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl sm:text-2xl font-bold tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-ink-600 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 sm:p-7 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 sm:p-7 pt-4 border-t border-ink-900/5 mt-auto", className)} {...props}>
      {children}
    </div>
  );
}

/* ============================== Form ============================== */

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-12 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-2",
      "text-base text-ink-900 placeholder:text-ink-400 shadow-xs transition-all duration-150",
      "focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3",
      "text-base text-ink-900 placeholder:text-ink-400 resize-y shadow-xs transition-all duration-150",
      "focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-ink-800 mb-1.5 inline-block", className)}
    {...props}
  />
));
Label.displayName = "Label";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-12 w-full appearance-none rounded-xl border border-ink-900/10 bg-white px-4 pr-10 py-2",
      "text-base text-ink-900 cursor-pointer shadow-xs transition-all duration-150",
      "focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15",
      "bg-no-repeat bg-[right_0.85rem_center] bg-[length:1rem]",
      "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%237A6F62%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>')]",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

/* ============================== Divider ============================== */

export function Divider({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-ink-900/10 to-transparent",
        className
      )}
    />
  );
}
