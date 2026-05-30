import { useEffect, useRef, useState } from "react";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import { useTheme } from "../../common/ThemeContext";
import styles from "./ContactStyles.module.css";

function Contact({ isPage = false }) {
  const { theme } = useTheme();
  const [status, setStatus] = useState("idle");
  const feedbackRef = useRef(null);
  const TitleTag = isPage ? "h1" : "h2";

  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  useEffect(() => {
    if (status !== "success" && status !== "error") return;

    feedbackRef.current?.focus();

    const timer = window.setTimeout(() => {
      setStatus("idle");
    }, 30000);

    return () => window.clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/8279483892a@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const feedbackId = "form-feedback";
  const hasFeedback = status === "success" || status === "error";

  return (
    <section
      id="contact"
      className={isPage ? `${styles.container} ${styles.containerPage}` : styles.container}
      aria-labelledby="contact-heading"
    >
      <div className={isPage ? styles.pageHeader : undefined}>
        <TitleTag id="contact-heading" className="sectionTitle">
          {isPage ? "Contact Us" : "Contact"}
        </TitleTag>

        <p className={styles.intro}>
          Have a project in mind or need accessibility support? I&apos;d be glad
          to hear from you.
        </p>
      </div>

      <div className={isPage ? styles.pageGrid : styles.singleColumn}>
        {isPage && (
          <aside className={styles.contactAside} aria-labelledby="contact-details-heading">
            <h2 id="contact-details-heading" className={styles.asideTitle}>
              Contact Details
            </h2>
            <address className={styles.contactDetails}>
              <p className={styles.contactDetailItem}>Delhi, India</p>
              <p className={styles.contactDetailItem}>
                <a className={styles.contactLink} href="tel:+918279483892">
                  +91 8279483892
                </a>
              </p>
              <p className={styles.contactDetailItem}>
                <a className={styles.contactLink} href="mailto:8279483892a@gmail.com">
                  8279483892a@gmail.com
                </a>
              </p>
            </address>

            <h2 className={styles.asideTitle}>Connect</h2>
            <ul className={styles.socialList} aria-label="Social profiles">
              <li>
                <a
                  href="https://github.com/anassaifi82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img src={githubIcon} alt="" aria-hidden="true" width={20} height={20} />
                  <span>GitHub</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/anas-s-940394277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img src={linkedinIcon} alt="" aria-hidden="true" width={20} height={20} />
                  <span>LinkedIn</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            </ul>
          </aside>
        )}

        <div className={styles.formCard}>
        <h2 className={styles.formHeading}>Get in Touch</h2>
        <p className={styles.formIntro}>
          Send me a message using the form below and I&apos;ll get back to you
          as soon as possible.
        </p>

        <p id="required-description" className={styles.requiredNote}>
          Fields marked with{" "}
          <span className={styles.requiredMark} aria-hidden="true">
            *
          </span>
          <span className="sr-only">asterisk</span> are required.
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-describedby={`required-description ${feedbackId}`}
        >
          <input type="hidden" name="_subject" value="New portfolio contact" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="text"
            name="_honey"
            className={styles.honey}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
              <span className={styles.requiredMark} aria-hidden="true">
                {" "}
                *
              </span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              required
              aria-required="true"
              autoComplete="name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
              <span className={styles.requiredMark} aria-hidden="true">
                {" "}
                *
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              required
              aria-required="true"
              autoComplete="email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
              <span className={styles.requiredMark} aria-hidden="true">
                {" "}
                *
              </span>
            </label>
            <textarea
              name="message"
              id="message"
              className={styles.textarea}
              required
              aria-required="true"
              rows={6}
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Submit"}
          </button>

          <div
            ref={feedbackRef}
            id={feedbackId}
            tabIndex={-1}
            role={status === "error" ? "alert" : "status"}
            aria-live={status === "error" ? "assertive" : "polite"}
            aria-atomic="true"
            className={
              hasFeedback
                ? status === "error"
                  ? `${styles.feedback} ${styles.feedbackError}`
                  : `${styles.feedback} ${styles.feedbackSuccess}`
                : styles.feedbackHidden
            }
          >
            {status === "success" && (
              <>
                <p className={styles.feedbackTitle}>Message sent</p>
                <p className={styles.feedbackText}>
                  Thank you! Your message has been sent successfully.
                </p>
              </>
            )}
            {status === "error" && (
              <>
                <p className={styles.feedbackTitle}>Submission failed</p>
                <p className={styles.feedbackText}>
                  Something went wrong. Please try again or email me directly at{" "}
                  <a className={styles.contactLink} href="mailto:8279483892a@gmail.com">
                    8279483892a@gmail.com
                  </a>.
                </p>
              </>
            )}
          </div>
        </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
