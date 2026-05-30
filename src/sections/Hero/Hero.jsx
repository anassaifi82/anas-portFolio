import styles from "./HeroStyles.module.css";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import ThemeToggle from "../../common/ThemeToggle";
import { useTheme } from "../../common/ThemeContext";

const HERO_IMAGE = "/hero.webp";

function Hero() {
  const { theme } = useTheme();

  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

  return (
    <section
      id="hero"
      className={styles.container}
      aria-labelledby="hero-heading"
    >
      <div className={styles.grid}>
        <div className={styles.media}>
          <div className={styles.mediaInner}>
            <ThemeToggle className={styles.themeToggle} />
            <img
              src={HERO_IMAGE}
              className={styles.hero}
              alt="Illustrated portrait of Anas Saifi"
              width={320}
              height={320}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles.info}>
          <h1 id="hero-heading" className={styles.heading}>
            Anas Saifi
          </h1>
          <h2 className={styles.title}>
            Accessibility Developer &amp; Tester — Frontend Developer
          </h2>

          <address className={styles.contactLine}>
            <span>Delhi, India</span>
            <span aria-hidden="true">•</span>
            <a href="tel:+918279483892">+91 8279483892</a>
            <span aria-hidden="true">•</span>
            <a href="mailto:8279483892a@gmail.com">8279483892a@gmail.com</a>
          </address>

          <ul className={styles.socialList} aria-label="Social profiles">
            <li>
              <a
                href="https://github.com/anassaifi82"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile (opens in new tab)"
              >
                <img src={githubIcon} alt="" aria-hidden="true" width={24} height={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/anas-s-940394277"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                <img src={linkedinIcon} alt="" aria-hidden="true" width={24} height={24} />
              </a>
            </li>
          </ul>

          <p className={styles.description}>
            Accessibility Developer and Tester with 2+ years of hands-on
            experience in web accessibility, performing audits and remediations
            to meet WCAG 2.1/2.2 AA standards. Skilled in both manual and
            automated testing using axe, Lighthouse, NVDA, JAWS, and VoiceOver.
          </p>

          <div className={styles.ctaGroup}>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              View CV
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href="/cv.pdf" download className={styles.cta}>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
