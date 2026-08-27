import { useEffect, useRef, useState } from "react";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import { useTheme } from "../../common/ThemeContext";
import styles from "./ContactStyles.module.css";

const WHATSAPP_URL =
  "https://wa.me/918279483892?text=Hi%20Anas%2C%20I%20would%20like%20to%20connect%20regarding%20";

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={styles.whatsappIcon}
    >
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

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
            <p className={styles.whatsappAsideIntro}>
              Prefer a quick chat?{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
              >
                Connect on WhatsApp — click here
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
            <ul className={styles.socialList} aria-label="Social profiles">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <WhatsAppIcon />
                  <span>WhatsApp</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
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

        <p className={styles.whatsappCta}>
          <WhatsAppIcon />
          <span>
            Prefer WhatsApp?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Connect on WhatsApp — click here
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </span>
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
