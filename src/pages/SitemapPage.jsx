import { Link } from "react-router-dom";
import Footer from "../sections/Footer/Footer";
import Header from "../sections/Header/Header";
import pageStyles from "./PageStyles.module.css";

const mainPages = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact Us" },
  { to: "/accessibility", label: "Accessibility Statement" },
  { to: "/sitemap", label: "Sitemap" },
];

const homeSections = [
  { to: "/#hero", label: "Hero" },
  { to: "/#skills", label: "Skills" },
  { to: "/#experience", label: "Experience" },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className={pageStyles.pageMain}>
        <div className={pageStyles.pageContent}>
          <h1 id="sitemap-heading" className="sectionTitle">
            Sitemap
          </h1>
          <p className={pageStyles.pageIntro}>
            A structured overview of all pages and major sections on this
            website.
          </p>

          <nav className={pageStyles.sitemapNav}>
            <section className={pageStyles.sitemapGroup} aria-labelledby="pages-heading">
              <h2 id="pages-heading">Main pages</h2>
              <ul className={pageStyles.sitemapList}>
                {mainPages.map((page) => (
                  <li key={page.to}>
                    <Link to={page.to}>{page.label}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className={pageStyles.sitemapGroup}
              aria-labelledby="sections-heading"
            >
              <h2 id="sections-heading">Home page sections</h2>
              <ul className={pageStyles.sitemapList}>
                {homeSections.map((section) => (
                  <li key={section.to}>
                    <Link to={section.to}>{section.label}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className={pageStyles.sitemapGroup}
              aria-labelledby="external-heading"
            >
              <h2 id="external-heading">External profiles</h2>
              <ul className={pageStyles.sitemapList}>
                <li>
                  <a
                    href="https://github.com/anassaifi82"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/anas-s-940394277"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
