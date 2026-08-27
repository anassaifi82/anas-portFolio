import { useEffect, useState } from "react";import styles from "./SimulatorStyles.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_VALUES = { name: "", email: "", message: "" };

function getErrors(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "required";
  }

  if (!values.email.trim()) {
    errors.email = "required";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "invalid";
  }

  if (!values.message.trim()) {
    errors.message = "required";
  }

  return errors;
}

function getErrorMessage(field, type, level) {
  if (type === "required") {
    if (level === "A") return "This field is required.";
    if (level === "AA") return "Please complete this required field.";
    return "Please enter a value for this required field before continuing.";
  }

  if (field === "email" && type === "invalid") {
    if (level === "A") return "Email is invalid.";
    if (level === "AA") return "Enter a valid email address.";
    return "Please enter a valid email address, such as name@example.com.";
  }

  return "Please check this field.";
}

export default function AccessibilityDemo({ level }) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(false);
    setShowReview(false);
    setConfirmed(false);
    setStatusMessage("");
  }, [level]);

  const levelClass =
    level === "A"
      ? styles.demoLevelA
      : level === "AA"
        ? styles.demoLevelAA
        : styles.demoLevelAAA;

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (submitted) {
      setErrors(getErrors(nextValues));
    }
  }

  function completeSubmission() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(false);
    setShowReview(false);
    setConfirmed(true);
    setStatusMessage("Thank you. Your request was submitted successfully.");
  }

  useEffect(() => {
    if (level === "AAA" && showReview && !confirmed) {
      document.getElementById("demo-review-heading")?.focus();
    }
  }, [showReview, level, confirmed]);

  function focusFirstInvalidField(nextErrors) {
    const firstKey = ["name", "email", "message"].find((key) => nextErrors[key]);
    if (!firstKey) {
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(`demo-${firstKey}`)?.focus();
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setConfirmed(false);
    setStatusMessage("");

    const nextErrors = getErrors(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setShowReview(false);
      setStatusMessage("There are errors in the form. Please review the fields below.");
      if (level === "AA" || level === "AAA") {
        focusFirstInvalidField(nextErrors);
      }
      return;
    }
    if (level === "AAA" && !showReview) {
      setShowReview(true);
      setStatusMessage(
        "Review your information below, then confirm submission."
      );
      return;
    }

    completeSubmission();
  }
  const nameError = errors.name
    ? getErrorMessage("name", errors.name, level)
    : "";
  const emailError = errors.email
    ? getErrorMessage("email", errors.email, level)
    : "";
  const messageError = errors.message
    ? getErrorMessage("message", errors.message, level)
    : "";
  const hasErrors = Object.keys(errors).length > 0;
  const showErrorSummary =
    submitted && hasErrors && (level === "AA" || level === "AAA");
  const formDescribedBy = [
    level === "AA" || level === "AAA" ? "demo-form-note" : "",
    showErrorSummary ? "demo-error-summary" : "",
    statusMessage ? "demo-form-status" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function focusField(event, fieldId) {
    event.preventDefault();
    document.getElementById(fieldId)?.focus();
  }

  return (
    <article className={`${styles.demoCard} ${levelClass}`}>
      <header className={styles.demoHeader}>
        <span className={styles.levelChip}>Level {level}</span>
        <h2 className={styles.demoTitle}>Get Started</h2>
        <p className={styles.demoIntro}>
          Start your accessibility journey with our team.
        </p>
      </header>

      <form
        className={styles.demoForm}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={formDescribedBy || undefined}
      >
        {(level === "AA" || level === "AAA") && (
          <p id="demo-form-note" className={styles.demoFormNote}>
            Fields marked with{" "}
            <span className={styles.requiredMark} aria-hidden="true">
              *
            </span>
            <span className="sr-only">asterisk</span> are required.
          </p>
        )}

        {showErrorSummary && (
          <div
            id="demo-error-summary"
            className={styles.errorSummary}
            role="alert"
            aria-labelledby="demo-error-summary-title"
          >
            <p id="demo-error-summary-title" className={styles.errorSummaryTitle}>
              Please fix the following errors:
            </p>
            <ul className={styles.errorSummaryList}>
              {nameError && (
                <li>
                  <a href="#demo-name" onClick={(event) => focusField(event, "demo-name")}>
                    {nameError}
                  </a>
                </li>
              )}
              {emailError && (
                <li>
                  <a href="#demo-email" onClick={(event) => focusField(event, "demo-email")}>
                    {emailError}
                  </a>
                </li>
              )}
              {messageError && (
                <li>
                  <a
                    href="#demo-message"
                    onClick={(event) => focusField(event, "demo-message")}
                  >
                    {messageError}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
        <div className={styles.fieldGroup}>
          <label htmlFor="demo-name" className={styles.fieldLabel}>
            Full Name
            {(level === "AA" || level === "AAA") && (
              <span className={styles.requiredMark} aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
          {level === "AAA" && (
            <p id="demo-name-help" className={styles.fieldHelp}>
              Enter your first and last name as you would like to be addressed.
            </p>
          )}
          <input
            id="demo-name"
            name="name"
            type="text"
            className={styles.fieldInput}
            value={values.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={nameError ? "true" : undefined}
            aria-describedby={
              [
                level === "AAA" ? "demo-name-help" : "",
                nameError ? "demo-name-error" : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
            autoComplete="name"
          />
          {nameError && (
            <p
              id="demo-name-error"
              className={styles.fieldError}
              role={level === "AA" || level === "AAA" ? "alert" : undefined}
            >
              {level === "AAA" && (
                <span className={styles.errorIcon} aria-hidden="true">
                  ✕{" "}
                </span>
              )}
              {nameError}
            </p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="demo-email" className={styles.fieldLabel}>
            Email Address
            <span className={styles.requiredMark} aria-hidden="true">
              {" "}
              *
            </span>
          </label>
          {level === "AA" && (
            <p id="demo-email-hint" className={styles.fieldHelp}>
              Enter a valid email you check regularly.
            </p>
          )}
          {level === "AAA" && (
            <>
              <p id="demo-email-help" className={styles.fieldHelp}>
                Enter the email address you use for communication with our team.
              </p>
            </>
          )}
          <input
            id="demo-email"
            name="email"
            type="email"
            className={styles.fieldInput}
            value={values.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={emailError ? "true" : undefined}
            aria-describedby={
              [
                level === "AA" ? "demo-email-hint" : "",
                level === "AAA" ? "demo-email-help demo-email-privacy" : "",
                emailError ? "demo-email-error" : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
            autoComplete="email"
          />
          {level === "AAA" && (
            <p id="demo-email-privacy" className={styles.fieldMeta}>
              Your email will only be used to respond to your request.
            </p>
          )}
          {emailError && (
            <p
              id="demo-email-error"
              className={styles.fieldError}
              role={level === "AA" || level === "AAA" ? "alert" : undefined}
            >
              {level === "AAA" && (
                <span className={styles.errorIcon} aria-hidden="true">
                  ✕{" "}
                </span>
              )}
              {emailError}
            </p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="demo-message" className={styles.fieldLabel}>
            Message
            {(level === "AA" || level === "AAA") && (
              <span className={styles.requiredMark} aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
          {level === "AAA" && (
            <p id="demo-message-help" className={styles.fieldHelp}>
              Tell us about your accessibility goals or current challenges.
            </p>
          )}
          <textarea
            id="demo-message"
            name="message"
            className={styles.fieldTextarea}
            rows={4}
            value={values.message}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={messageError ? "true" : undefined}
            aria-describedby={
              [
                level === "AAA" ? "demo-message-help" : "",
                messageError ? "demo-message-error" : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          {messageError && (
            <p
              id="demo-message-error"
              className={styles.fieldError}
              role={level === "AA" || level === "AAA" ? "alert" : undefined}
            >
              {level === "AAA" && (
                <span className={styles.errorIcon} aria-hidden="true">
                  ✕{" "}
                </span>
              )}
              {messageError}
            </p>
          )}
        </div>

        {level === "AAA" && showReview && !confirmed && (
          <div className={styles.reviewBox} role="region" aria-label="Review your submission">
            <h3
              id="demo-review-heading"
              className={styles.reviewTitle}
              tabIndex={-1}
            >
              Review before sending
            </h3>            <dl className={styles.reviewList}>
              <div>
                <dt>Name</dt>
                <dd>{values.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{values.email}</dd>
              </div>
              <div>
                <dt>Message</dt>
                <dd>{values.message}</dd>
              </div>
            </dl>
          </div>
        )}

        <button type="submit" className={styles.demoSubmit}>
          {level === "AAA" && showReview && !confirmed
            ? "Confirm and Get Started"
            : "Get Started"}
        </button>

        {statusMessage && (
          <p
            id="demo-form-status"
            className={
              confirmed ? styles.statusSuccess : styles.statusMessage
            }
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {statusMessage}
          </p>
        )}
      </form>
    </article>
  );
}
