import { Link, useLocation } from "react-router-dom";
import styles from "./FooterStyles.module.css";

const footerLinks = [
  { to: "/accessibility", label: "Accessibility Statement" },
  { to: "/simulator", label: "Accessibility Levels" },
  { to: "/simulator/color-vision", label: "Color & Contrast" },
  { to: "/sitemap", label: "Sitemap" },
  { to: "/contact", label: "Contact Us" },
];

function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className={styles.footer}>
      <h2 id="footer-label" className="sr-only">
        Footer
      </h2>

      <nav className={styles.footerNav} aria-label="Footer navigation">
        <ul className={styles.footerList}>
          {footerLinks.map((link) => (
            <li key={link.to} className={styles.footerListItem}>
              <Link
                to={link.to}
                className={styles.footerLink}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className={styles.copyright}>
        &copy; {year} Anas Saifi. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
