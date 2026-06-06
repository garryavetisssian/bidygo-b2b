import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap isolate",
    "font-semibold tracking-[-0.01em] select-none",
    "rounded-pill transition-all duration-200 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    "[&_svg]:size-[1.1em] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300",
    "hover:[&_svg:last-child]:translate-x-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "bg-gradient-to-b from-brand-500 to-brand-600",
          "shadow-[0_1px_0_0_oklch(1_0_0/0.20)_inset,0_8px_24px_-6px_oklch(0.700_0.196_42/0.35),0_2px_6px_-2px_oklch(0.155_0.018_36/0.10)]",
          "hover:from-brand-500 hover:to-brand-700",
          "hover:shadow-[0_1px_0_0_oklch(1_0_0/0.25)_inset,0_14px_36px_-8px_oklch(0.700_0.196_42/0.50),0_4px_12px_-2px_oklch(0.155_0.018_36/0.12)]",
          "hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        ].join(" "),
        secondary:
          "bg-ink-900 text-cream-50 shadow-md hover:bg-ink-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0",
        outline:
          "bg-transparent border border-ink-900/15 text-ink-900 hover:border-ink-900/35 hover:bg-ink-900/[0.04]",
        ghost: "bg-transparent text-ink-900 hover:bg-ink-900/5",
        link: "bg-transparent text-brand-700 hover:text-brand-600 underline-offset-4 hover:underline rounded-none px-0",
        white:
          "bg-white text-ink-900 shadow-[0_1px_0_0_oklch(0.155_0.018_36/0.06)_inset,0_8px_22px_-8px_oklch(0.155_0.018_36/0.18)] hover:shadow-[0_1px_0_0_oklch(0.155_0.018_36/0.08)_inset,0_14px_30px_-10px_oklch(0.155_0.018_36/0.22)] hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
        xl: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
