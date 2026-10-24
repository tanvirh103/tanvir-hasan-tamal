"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }
  return errors;
}

const inputClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted/70 transition-colors outline-none hover:border-border-strong focus:border-accent focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-500 sm:text-sm";

interface FieldProps {
  name: FieldName;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: {
    id: string;
    name: FieldName;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    className: string;
  }) => React.ReactNode;
}

function Field({ name, label, error, optional, children }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        className: inputClassName,
      })}
      {error && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Bots fill the hidden honeypot field; silently pretend success.
    if (data.get("_honey")) {
      setStatus("success");
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
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const { endpoint, accessKey } = siteConfig.contactForm;
      if (!accessKey) throw new Error("Web3Forms access key is not configured");

      const name = values.name.trim();
      const topic = values.subject.trim();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          // Email subject line; the visitor's email is used as the reply-to address.
          subject: topic ? `Portfolio: ${topic} — from ${name}` : `Portfolio message from ${name}`,
          from_name: `${siteConfig.name} Portfolio`,
          name,
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck: false,
        }),
      });
      const result: { success?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || result.success !== true) {
        throw new Error(result.message ?? `Request failed with status ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      // Visitors see a friendly message; the service's reason is logged for debugging.
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-2xl">Message sent!</h2>
        <p className="mt-2 max-w-sm text-muted">
          Thanks for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClassName("secondary", "mt-6")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" error={errors.name}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="Your name"
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
              placeholder="you@example.com"
            />
          )}
        </Field>
      </div>

      <Field name="subject" label="Subject" optional error={errors.subject}>
        {(props) => <input {...props} type="text" maxLength={150} placeholder="What's it about?" />}
      </Field>

      <Field name="message" label="Message" error={errors.message}>
        {(props) => (
          <textarea
            {...props}
            rows={6}
            maxLength={5000}
            placeholder="Tell me about your project, role or idea…"
            className={cn(props.className, "min-h-36 resize-y")}
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

      <div aria-live="polite">
        {status === "error" && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            Sorry, your message couldn&apos;t be sent. Please try again, or email me directly at{" "}
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

      <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <MailIcon className="size-4" />
          Prefer email? {profile.email}
        </a>
        <button type="submit" disabled={isSubmitting} className={buttonClassName("primary")}>
          {isSubmitting ? (
            <>
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRightIcon />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
