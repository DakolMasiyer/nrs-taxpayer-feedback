"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  purpose: z.string().min(1, "Please select an option"),
  resolved: z.string().min(1, "Please select an option"),
  wait_time: z.string().min(1, "Please select an option"),
  visit_count: z.string().min(1, "Please select an option"),
  rating: z.string().min(1, "Please select a rating"),
  comments: z.string().max(1000).optional(),
})

type FormValues = z.infer<typeof schema>

const PURPOSE_OPTIONS = [
  "TIN retrieval or verification",
  "New registration",
  "Payment confirmation",
  "Tax Clearance Certificate (TCC)",
  "Filing / returns help",
  "Assessment or penalty query",
  "Collecting a document / certificate",
  "General information or enquiry",
  "Updating my details",
  "Other",
]

const RESOLVED_OPTIONS = [
  "Yes, fully resolved",
  "Partially — still need to do something else",
  "No — told to come back another day",
  "No — not resolved",
]

const WAIT_OPTIONS = [
  "Less than 15 minutes",
  "15–30 minutes",
  "30 minutes to 1 hour",
  "1–2 hours",
  "More than 2 hours",
]

const VISIT_OPTIONS = [
  "First time",
  "Been once before for the same issue",
  "Been 2 or more times for the same issue",
]

function RadioPills({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string
  options: string[]
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <div className="nrs-radio-group">
        {options.map((opt) => (
          <label
            key={opt}
            className={`nrs-radio-label${value === opt ? " is-checked" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="nrs-field-error">{error}</p>}
    </div>
  )
}

function StarRating({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <div className="nrs-star-wrap">
        {["5", "4", "3", "2", "1"].map((star) => (
          <label key={star} title={`${star} star${star === "1" ? "" : "s"}`}>
            <input
              type="radio"
              name="rating"
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
            />
            ★
          </label>
        ))}
      </div>
      <div className="nrs-star-scale-labels">
        <span>1 — Very poor</span>
        <span>5 — Excellent</span>
      </div>
      {error && <p className="nrs-field-error">{error}</p>}
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="nrs-form-success">
      <div className="nrs-form-success__icon">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 18l7 7L29 11"
            stroke="#0D1A3A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3>Thank you for your feedback!</h3>
      <p>
        Your response has been recorded. The Nigeria Revenue Service uses your
        feedback to improve service delivery across all offices.
      </p>
      <button className="nrs-btn-submit" onClick={onReset}>
        Submit another response
      </button>
    </div>
  )
}

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      purpose: "",
      resolved: "",
      wait_time: "",
      visit_count: "",
      rating: "",
      comments: "",
    },
  })

  const values = watch()

  async function onSubmit(data: FormValues) {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submitted_at: new Date().toISOString(),
        }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? "Submission failed")
      }
      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setSubmitted(false)
    setServerError(null)
    setValue("purpose", "")
    setValue("resolved", "")
    setValue("wait_time", "")
    setValue("visit_count", "")
    setValue("rating", "")
    setValue("comments", "")
  }

  if (submitted) return <SuccessState onReset={reset} />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="nrs-form-group">
        <div className="nrs-form-label">
          <span className="nrs-q-num">1</span>
          What did you come here for today?<span className="nrs-req">*</span>
        </div>
        <RadioPills
          name="purpose"
          options={PURPOSE_OPTIONS}
          value={values.purpose}
          onChange={(v) => setValue("purpose", v, { shouldValidate: true })}
          error={errors.purpose?.message}
        />
      </div>

      <div className="nrs-form-divider" />

      <div className="nrs-form-group">
        <div className="nrs-form-label">
          <span className="nrs-q-num">2</span>
          Was your issue resolved?<span className="nrs-req">*</span>
        </div>
        <RadioPills
          name="resolved"
          options={RESOLVED_OPTIONS}
          value={values.resolved}
          onChange={(v) => setValue("resolved", v, { shouldValidate: true })}
          error={errors.resolved?.message}
        />
      </div>

      <div className="nrs-form-divider" />

      <div className="nrs-form-group">
        <div className="nrs-form-label">
          <span className="nrs-q-num">3</span>
          How long did you wait before someone attended to you?<span className="nrs-req">*</span>
        </div>
        <RadioPills
          name="wait_time"
          options={WAIT_OPTIONS}
          value={values.wait_time}
          onChange={(v) => setValue("wait_time", v, { shouldValidate: true })}
          error={errors.wait_time?.message}
        />
      </div>

      <div className="nrs-form-divider" />

      <div className="nrs-form-group">
        <div className="nrs-form-label">
          <span className="nrs-q-num">4</span>
          Is this your first visit for this issue?<span className="nrs-req">*</span>
        </div>
        <RadioPills
          name="visit_count"
          options={VISIT_OPTIONS}
          value={values.visit_count}
          onChange={(v) => setValue("visit_count", v, { shouldValidate: true })}
          error={errors.visit_count?.message}
        />
      </div>

      <div className="nrs-form-divider" />

      <div className="nrs-form-group">
        <div className="nrs-form-label">
          <span className="nrs-q-num">5</span>
          How would you rate the service you received today?<span className="nrs-req">*</span>
        </div>
        <StarRating
          value={values.rating}
          onChange={(v) => setValue("rating", v, { shouldValidate: true })}
          error={errors.rating?.message}
        />
      </div>

      <div className="nrs-form-divider" />

      <div className="nrs-form-group" style={{ marginBottom: 0 }}>
        <div className="nrs-form-label">
          <span className="nrs-q-num">6</span>
          Anything else you would like to tell us?{" "}
          <span style={{ fontWeight: 400, color: "var(--nrs-gray-500)", marginLeft: 4 }}>
            (optional)
          </span>
        </div>
        <textarea
          className="nrs-textarea"
          name="comments"
          placeholder="Share any additional feedback, compliments, or suggestions here…"
          maxLength={1000}
          value={values.comments ?? ""}
          onChange={(e) => setValue("comments", e.target.value)}
        />
        <div style={{ fontSize: 12, color: "var(--nrs-gray-500)", marginTop: 4, textAlign: "right" }}>
          {(values.comments ?? "").length} / 1000
        </div>
      </div>

      <div className="nrs-form-divider" />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start", paddingTop: 8 }}>
        {serverError && (
          <p className="nrs-field-error" style={{ margin: 0 }}>{serverError}</p>
        )}
        <button type="submit" className="nrs-btn-submit" disabled={submitting}>
          {submitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Submitting…
            </>
          ) : (
            <>
              Submit Feedback
              <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
        <p className="nrs-submit-note">
          <svg viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Your response is fully anonymous and cannot be traced back to you.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  )
}
