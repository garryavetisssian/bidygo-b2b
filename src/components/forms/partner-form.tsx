"use client";

import * as React from "react";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Input, Label } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { submitPartnerApplication, type PartnerFormState } from "@/app/actions/partner";
import { cn } from "@/lib/utils";

export function PartnerForm() {
  const t = useTranslations("forms.partner");
  const [state, formAction, pending] = useActionState<PartnerFormState, FormData>(
    submitPartnerApplication,
    null
  );

  if (state?.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="mx-auto size-16 rounded-full bg-mint-500/15 grid place-items-center mb-5">
          <CheckCircle2 className="size-8 text-mint-500" strokeWidth={2.5} />
        </div>
        <h3 className="display-3 text-pretty">{t("successTitle")}</h3>
        <p className="mt-4 text-ink-600 text-lg max-w-md mx-auto leading-relaxed">{state.message}</p>
        <p className="mt-6 text-sm text-ink-500">
          {t.rich("successFallback", {
            email: (chunks) => (
              <a href="mailto:partners@bidygo.com" className="text-brand-700 font-semibold underline-offset-2 hover:underline">
                {chunks}
              </a>
            ),
          })}
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">{t("title")}</h3>
        <p className="text-ink-600 mt-2">{t("subtitle")}</p>
      </div>

      <AnimatePresence>
        {state && !state.ok && state.message && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-[oklch(0.95_0.05_15)] border border-[oklch(0.65_0.22_15)]/30 p-4 flex items-start gap-3 text-sm"
          >
            <AlertCircle className="size-5 [color:oklch(0.55_0.20_15)] shrink-0 mt-0.5" />
            <p className="text-ink-900">{t("errorBanner")}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("name")} name="name" required error={errOf(state, "name")}>
          <Input name="name" autoComplete="name" required placeholder={t("namePlaceholder")} />
        </Field>
        <Field label={t("company")} name="company" required error={errOf(state, "company")}>
          <Input name="company" autoComplete="organization" required placeholder={t("companyPlaceholder")} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("email")} name="email" required error={errOf(state, "email")}>
          <Input name="email" type="email" autoComplete="email" required placeholder={t("emailPlaceholder")} />
        </Field>
        <Field label={t("phone")} name="phone" required error={errOf(state, "phone")}>
          <Input name="phone" type="tel" autoComplete="tel" required placeholder={t("phonePlaceholder")} />
        </Field>
      </div>

      <Field label={t("country")} name="country" required error={errOf(state, "country")}>
        <Input name="country" autoComplete="country-name" required placeholder={t("countryPlaceholder")} />
      </Field>

      <input
        type="text"
        name="hp_field"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[10000px] opacity-0"
        aria-hidden
      />

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-2">
        <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
          {pending ? t("submitting") : t("submit")} <ArrowRight />
        </Button>
        <p className="text-xs text-ink-500 leading-relaxed">
          {t.rich("consent", {
            privacy: (chunks) => (
              <a href="/privacy" className="underline underline-offset-2">{chunks}</a>
            ),
          })}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className={cn(error && "text-[oklch(0.55_0.20_15)]")}>
        {label}
        {required && <span className="text-brand-600 ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <span className="text-xs [color:oklch(0.55_0.20_15)] mt-1.5 inline-flex items-center gap-1">
          <AlertCircle className="size-3" /> {error}
        </span>
      )}
    </div>
  );
}

function errOf(state: PartnerFormState, key: string): string | undefined {
  if (!state || state.ok) return undefined;
  return state.fieldErrors?.[key as never];
}
