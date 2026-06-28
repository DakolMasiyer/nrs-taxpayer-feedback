import { FeedbackForm } from "./feedback-form"
import { NRS_LOGO } from "./nrs-logo"

export default function Home() {
  return (
    <>
      {/* ── TOPBAR ── */}
      <div className="nrs-topbar">
        <div className="nrs-topbar__inner">
          <span className="nrs-topbar__text">
            🔒 Official Federal Government of Nigeria website &nbsp;·&nbsp;{" "}
            <strong>nrs.gov.ng</strong>
          </span>
          <div className="nrs-topbar__links">
            <a href="https://selfservice.nrs.gov.ng/" target="_blank" rel="noopener noreferrer">Rev360 Portal</a>
            <a href="https://www.nrs.gov.ng/" target="_blank" rel="noopener noreferrer">TIN Lookup</a>
            <a href="https://www.nrs.gov.ng/overview/quick-link" target="_blank" rel="noopener noreferrer">Quick Links</a>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="nrs-nav">
        <div className="nrs-nav__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NRS_LOGO} alt="Nigeria Revenue Service" className="nrs-nav__logo" />
          <div className="nrs-nav__links">
            <a href="https://www.nrs.gov.ng/help--support/faq" target="_blank" rel="noopener noreferrer">FAQs</a>
            <a href="https://www.nrs.gov.ng/help--support/office-locator" target="_blank" rel="noopener noreferrer">Offices</a>
            <a href="#form" className="nrs-btn nrs-btn--primary nrs-btn--nav">
              Give Feedback
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="nrs-hero">
        <div className="nrs-hero__inner">
          <div>
            <div className="nrs-hero__eyebrow">Taxpayer Feedback Programme</div>
            <h1>
              Your voice shapes
              <em>how we serve Nigeria.</em>
            </h1>
            <p className="nrs-hero__sub">
              Help us improve every visit. This 3-minute anonymous survey captures your
              experience at any NRS office — no name or Tax ID required.
            </p>
            <div className="nrs-hero__actions">
              <a href="#form" className="nrs-btn nrs-btn--primary">
                Start Feedback
                <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#faq" className="nrs-btn nrs-btn--outline">
                Learn more
              </a>
            </div>
            <div className="nrs-hero__stats">
              {[
                { value: "6", label: "Questions total" },
                { value: "3 min", label: "Estimated time" },
                { value: "100%", label: "Anonymous" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="nrs-hero__stat-value">{value}</div>
                  <div className="nrs-hero__stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="nrs-hero__card">
            <div className="nrs-anon-pill">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Fully anonymous · No login required
            </div>
            <div className="nrs-mini-steps">
              {[
                { num: "1", title: "Purpose of visit", body: "TIN, registration, payments, TCC and more" },
                { num: "2", title: "Resolution status", body: "Whether your issue was fully resolved" },
                { num: "3", title: "Wait time & visit count", body: "How long you waited, and if you've been before" },
              ].map(({ num, title, body }) => (
                <div key={num} className="nrs-mini-step">
                  <div className="nrs-mini-step__num">{num}</div>
                  <div className="nrs-mini-step__text">
                    <strong>{title}</strong>
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="nrs-form-section" id="form">
        <div className="nrs-form-section__inner">
          <span className="nrs-section-badge">Share your experience</span>
          <h2 className="nrs-section-title">Share your feedback</h2>
          <p className="nrs-section-sub">
            Your response goes directly to the NRS Service Improvement Office.
            All submissions are reviewed monthly.
          </p>

          <div className="nrs-form-card">
            <div className="nrs-form-card__header">
              <div className="nrs-form-card__header-icon">
                <svg viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="nrs-form-card__header-text">
                <strong>NRS Taxpayer Feedback Survey</strong>
                <span>Your feedback is anonymous and takes about 3 minutes</span>
              </div>
            </div>

            <div className="nrs-form-card__meta">
              <div className="nrs-form-card__meta-item">
                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                ~3 minutes
              </div>
              <div className="nrs-form-card__meta-item">
                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Fully anonymous
              </div>
              <div className="nrs-form-card__meta-item">
                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                6 questions
              </div>
            </div>

            <div className="nrs-form-card__body">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="nrs-faq-section" id="faq">
        <div className="nrs-faq-section__inner">
          <span className="nrs-section-badge">Questions</span>
          <h2 className="nrs-section-title">Frequently asked questions</h2>

          {([
            {
              q: "Is this feedback truly anonymous?",
              a: "Yes — completely. We do not collect your name, Tax Identification Number, email address, or any other personal identifier. Your feedback cannot be traced back to you in any way.",
            },
            {
              q: "Who reviews the feedback?",
              a: "Responses are reviewed by the NRS Service Improvement Office. Aggregated data is also shared with relevant department heads and the Service Excellence Committee on a monthly basis.",
            },
            {
              q: "What happens after I submit?",
              a: "Your response is immediately logged and included in the next monthly review cycle. Trends and common issues are escalated to management for action planning. You may also see changes in your local NRS office as a direct result of this feedback.",
            },
            {
              q: "Can I submit feedback multiple times?",
              a: "Yes. We encourage you to submit feedback after each visit to any NRS office, as experience can vary across visits, locations, and staff. Each submission is treated as an independent response.",
            },
            {
              q: "Why is NRS collecting this feedback?",
              a: "The Nigeria Revenue Service is committed to improving service delivery across all its offices. This programme is part of the NRS Service Excellence Initiative, which aims to make every taxpayer interaction faster, clearer, and more respectful.",
            },
            {
              q: "What if I had a very bad experience?",
              a: "We are sorry to hear that. Beyond this anonymous survey, you can also raise a formal complaint via the NRS contact page at nrs.gov.ng/contact. Formal complaints are tracked individually and escalated to a dedicated resolution team.",
            },
          ] as const).map(({ q, a }) => (
            <details key={q} className="nrs-faq-item">
              <summary>{q}</summary>
              <div className="nrs-faq-body">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111827", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>
            © {new Date().getFullYear()} Nigeria Revenue Service. All rights reserved.
          </p>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.15)", padding: "4px 10px", borderRadius: 3 }}>
            🔒 Official Government Website
          </span>
        </div>
      </footer>
    </>
  )
}
