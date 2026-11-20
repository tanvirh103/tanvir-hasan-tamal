"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Humans take longer than this to fill the form; bots usually submit almost instantly. */
const MIN_FILL_MS = 3000;
/** Minimum gap between two submissions from the same page view. */
const SUBMIT_COOLDOWN_MS = 30_000;
const MAX_BODY_CHARS = 5000;
const GENERIC_ERROR = "Sorry, your message couldn't be sent. Please try again in a moment.";

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  } else if (values.message.length > MAX_BODY_CHARS) {
    errors.message = `Please keep your message under ${MAX_BODY_CHARS} characters.`;
  }
  return errors;
}

/**
 * Floating-label controls: the placeholder is a single space, so `:placeholder-shown` tells
 * whether the field is empty and the label (a later sibling, `peer-*`) floats up when it is
 * focused or filled. Labels move with transform only.
 */
const controlClassName =
  "peer block w-full rounded-2xl border border-border bg-background/70 px-4 text-base text-foreground placeholder:text-transparent transition-[border-color,box-shadow,background-color] duration-300 ease-out-expo outline-none hover:border-border-strong focus:border-accent focus:bg-background focus:ring-4 focus:ring-accent-ring aria-[invalid=true]:border-red-600/70 dark:aria-[invalid=true]:border-red-400/70";

const labelClassName =
  "pointer-events-none absolute top-4 left-4 origin-top-left text-base text-muted transition-[translate,scale,color] duration-300 ease-out-expo peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75";

interface FieldControlProps {
  id: string;
  name: FieldName;
  placeholder: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  className: string;
}

interface FieldProps {
  name: FieldName;
  label: string;
  error?: string;
  optional?: boolean;
  /** Extra element ids describing the control (e.g. a character counter). */
  describedBy?: string;
  /** Content shown on the right below the control (e.g. a character counter). */
  meta?: ReactNode;
  children: (props: FieldControlProps) => ReactNode;
}

function Field({ name, label, error, optional, describedBy, meta, children }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const describedByIds = [error ? errorId : undefined, describedBy].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {children({
          id,
          name,
          placeholder: " ",
          "aria-invalid": Boolean(error),
          "aria-describedby": describedByIds || undefined,
          className: controlClassName,
        })}
        <label htmlFor={id} className={labelClassName}>
          {label}
          {optional && <span className="ml-1.5 text-subtle">(optional)</span>}
        </label>
      </div>
      {(error || meta) && (
        <div className="flex items-start justify-between gap-3 px-1">
          {error ? (
            <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : (
            <span />
          )}
          {meta}
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);
  const [messageLength, setMessageLength] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const restartedRef = useRef(false);
  // Set once when the form mounts (timing check) and after each send attempt (cooldown).
  const mountedAt = useRef(0);
  const lastSubmitAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Move focus to the result so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
      // Draw the check mark (Web Animations API, skipped with reduced motion).
      const path = checkRef.current;
      if (path && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
          duration: 700,
          delay: 150,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        });
      }
    } else if (status === "idle" && restartedRef.current) {
      restartedRef.current = false;
      formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus();
    }
  }, [status]);

  function clearFieldError(name: string) {
    if (name in errors) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name as FieldName];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const now = Date.now();

    // Bots fill the hidden honeypot field: silently pretend success.
    if (data.get("_honey")) {
      setStatus("success");
      return;
    }
    // Submitted almost instantly (bots, or very fast autofill): ask a human to retry.
    if (now - mountedAt.current < MIN_FILL_MS) {
      setErrorMessage("Please take a moment and try again.");
      setStatus("error");
      return;
    }

    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    const firstInvalid = Object.keys(fieldErrors)[0];
    if (firstInvalid) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (lastSubmitAt.current && now - lastSubmitAt.current < SUBMIT_COOLDOWN_MS) {
      const seconds = Math.ceil((SUBMIT_COOLDOWN_MS - (now - lastSubmitAt.current)) / 1000);
      setErrorMessage(
        `Please wait ${seconds} second${seconds === 1 ? "" : "s"} before sending another message.`,
      );
      setStatus("error");
      return;
    }
    lastSubmitAt.current = now;

    setStatus("submitting");
    try {
      const { endpoint } = siteConfig.contactForm;
      if (!endpoint) throw new Error("Contact API URL is not configured");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      const result: { success?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || result.success !== true) {
        // Validation (400) and rate-limit (429) messages are written for visitors; show them.
        const showServerMessage =
          (response.status === 400 || response.status === 429) && Boolean(result.message);
        setErrorMessage(showServerMessage && result.message ? result.message : GENERIC_ERROR);
        setStatus("error");
        if (response.status !== 429) lastSubmitAt.current = 0;
        console.error(
          "Contact form submission failed:",
          result.message ?? `Request failed with status ${response.status}`,
        );
        return;
      }

      form.reset();
      setMessageLength(0);
      setStatus("success");
    } catch (error) {
      // Visitors see a friendly message; the reason is logged for debugging.
      console.error("Contact form submission failed:", error);
      lastSubmitAt.current = 0;
      setErrorMessage(GENERIC_ERROR);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex animate-fade-up flex-col items-center rounded-2xl border border-border bg-surface-muted/60 px-5 py-14 text-center outline-none"
      >
        <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-float">
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full border border-accent/40"
          />
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              ref={checkRef}
              d="m5 12 5 5L20 7"
              pathLength={1}
              strokeDasharray={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight">
          Message <em className="accent-serif text-accent">sent</em>
        </h3>
        <p className="mt-3 max-w-sm text-sm text-pretty text-muted">
          Thanks for reaching out. Your message is in my inbox and my reply will go to the email
          address you provided.
        </p>
        <button
          type="button"
          onClick={() => {
            restartedRef.current = true;
            setErrors({});
            setStatus("idle");
          }}
          className={buttonClassName("secondary", "mt-8")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";
  const nearLimit = messageLength > MAX_BODY_CHARS * 0.9;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={(event) => clearFieldError((event.target as HTMLInputElement).name)}
      noValidate
      aria-busy={isSubmitting}
      className="relative flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" error={errors.name}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              className={cn(props.className, "h-14 pt-5")}
            />
          )}
        </Field>
        <Field name="email" label="Email" error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={150}
              required
              className={cn(props.className, "h-14 pt-5")}
            />
          )}
        </Field>
      </div>

      <Field name="subject" label="Subject" optional error={errors.subject}>
        {(props) => (
          <input
            {...props}
            type="text"
            maxLength={150}
            className={cn(props.className, "h-14 pt-5")}
          />
        )}
      </Field>

      <Field
        name="message"
        label="Message"
        error={errors.message}
        describedBy="contact-message-count"
        meta={
          <p
            id="contact-message-count"
            className={cn(
              "ml-auto shrink-0 font-mono text-xs tabular-nums",
              nearLimit ? "text-accent" : "text-subtle",
            )}
          >
            {messageLength} / {MAX_BODY_CHARS}
            <span className="sr-only"> characters</span>
          </p>
        }
      >
        {(props) => (
          <textarea
            {...props}
            rows={6}
            maxLength={MAX_BODY_CHARS}
            required
            onChange={(event) => setMessageLength(event.target.value.length)}
            className={cn(props.className, "min-h-44 resize-y pt-7 pb-3 leading-relaxed")}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting for bots. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div role="status" aria-live="polite">
        {isSubmitting && <span className="sr-only">Sending your message…</span>}
        {status === "error" && (
          <p className="animate-fade-up rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
            {errorMessage} You can also email me directly at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="font-medium underline underline-offset-2"
            >
              {profile.email}
            </a>
            .
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-col-reverse items-stretch gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 text-sm break-all text-muted transition-colors hover:text-accent sm:justify-start"
        >
          <MailIcon aria-hidden="true" className="size-4 shrink-0" />
          Prefer email? {profile.email}
        </a>
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClassName("primary", "min-w-48 overflow-hidden", "lg")}
        >
          {/* Both labels stay in the layout so the button never changes size between states. */}
          <span
            className={cn(
              "inline-flex items-center gap-2 transition-[translate,opacity] duration-500 ease-out-expo",
              isSubmitting && "-translate-y-6 opacity-0",
            )}
          >
            Send message
            <ArrowRightIcon />
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 inline-flex items-center justify-center gap-2 transition-[translate,opacity] duration-500 ease-out-expo",
              isSubmitting ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <Spinner />
            Sending…
          </span>
        </button>
      </div>
    </form>
  );
}
