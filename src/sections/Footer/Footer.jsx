import { Link } from "react-router-dom";
import styles from "./FooterStyles.module.css";

const footerLinks = [
  { to: "/accessibility", label: "Accessibility Statement" },
  { to: "/sitemap", label: "Sitemap" },
  { to: "/contact", label: "Contact Us" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} >
      <h2 id="footer-label" className="sr-only">
        Footer
      </h2>

      <div className={styles.footerNav} aria-label="Footer navigation">
        <ul className={styles.footerList}>
          {footerLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.copyright}>
        &copy; {year} Anas Saifi. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
