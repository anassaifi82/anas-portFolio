import { Link } from "react-router-dom";
import Footer from "../sections/Footer/Footer";
import Header from "../sections/Header/Header";
import pageStyles from "./PageStyles.module.css";

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className={pageStyles.pageMain}>
        <article
          className={pageStyles.pageContent}
          aria-labelledby="accessibility-heading"
        >
          <h1 id="accessibility-heading" className="sectionTitle">
            Accessibility Statement
          </h1>
          <p className={pageStyles.pageIntro}>
            This statement describes the accessibility commitments and features of
            the Anas Saifi portfolio website.
          </p>

          <section
            className={pageStyles.contentBlock}
            aria-labelledby="commitment-heading"
          >
            <h2 id="commitment-heading">Our commitment</h2>
            <p>
              I am committed to ensuring this website is accessible to people
              with disabilities. Accessibility is central to my work as an
              Accessibility Developer and Tester, and this site is designed to
              reflect WCAG 2.1 and 2.2 Level AA best practices.
            </p>
          </section>

          <section
            className={pageStyles.contentBlock}
            aria-labelledby="conformance-heading"
          >
            <h2 id="conformance-heading">Conformance status</h2>
            <p>
              This website aims to conform with the Web Content Accessibility
              Guidelines (WCAG) 2.1 and 2.2 at Level AA. Ongoing reviews are
              conducted using manual testing, assistive technologies, and
              automated tools such as axe and Lighthouse.
            </p>
          </section>

          <section
            className={pageStyles.contentBlock}
            aria-labelledby="features-heading"
          >
            <h2 id="features-heading">Accessibility features</h2>
            <ul className={pageStyles.contentList}>
              <li>Semantic HTML5 landmarks including header, nav, main, and footer</li>
              <li>Logical heading structure on every page</li>
              <li>Keyboard-accessible navigation with visible focus indicators</li>
              <li>Skip link to main content</li>
              <li>Light and dark themes with sufficient color contrast</li>
              <li>Accessible forms with visible labels and required field indicators</li>
              <li>Screen reader announcements for form submission feedback</li>
              <li>Descriptive alternative text and accessible names for controls</li>
              <li>Mobile navigation with focus trap and swipe-to-close support</li>
            </ul>
          </section>

          <section
            className={pageStyles.contentBlock}
            aria-labelledby="technologies-heading"
          >
            <h2 id="technologies-heading">Assistive technologies</h2>
            <p>
              This site is tested with the following assistive technologies and
              browsers:
            </p>
            <ul className={pageStyles.contentList}>
              <li>NVDA and JAWS on Windows</li>
              <li>VoiceOver on macOS and iOS</li>
              <li>Keyboard-only navigation</li>
              <li>Modern versions of Chrome, Firefox, Edge, and Safari</li>
            </ul>
          </section>

          <section
            className={pageStyles.contentBlock}
            aria-labelledby="feedback-heading"
          >
            <h2 id="feedback-heading">Feedback and contact</h2>
            <p>
              If you encounter an accessibility barrier on this website, please
              let me know. I welcome your feedback and will make reasonable
              efforts to address reported issues promptly.
            </p>
            <ul className={pageStyles.contentList}>
              <li>
                Email:{" "}
                <a href="mailto:8279483892a@gmail.com">8279483892a@gmail.com</a>
              </li>
              <li>
                Phone: <a href="tel:+918279483892">+91 8279483892</a>
              </li>
              <li>
                Contact form: <Link to="/contact">Contact Us page</Link>
              </li>
            </ul>
          </section>

          <section
            className={pageStyles.contentBlock}
            aria-labelledby="updated-heading"
          >
            <h2 id="updated-heading">Statement updated</h2>
            <p>
              This accessibility statement was last reviewed on{" "}
              <time dateTime="2026-05-30">May 30, 2026</time>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
