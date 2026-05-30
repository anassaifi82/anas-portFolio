import { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderStyles.module.css";
import logoDark from "../../assets/anas-logo-light.png";
import logoLight from "../../assets/anas-saifilogo.webp";
import ThemeToggle from "../../common/ThemeToggle";
import { useFocusTrap } from "../../common/useFocusTrap";
import { useSwipeToClose } from "../../common/useSwipeToClose";
import { useTheme } from "../../common/ThemeContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#skills", label: "Skills" },
  { to: "/#experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
  {
    href: "https://www.linkedin.com/in/anas-s-940394277",
    label: "LinkedIn",
    external: true,
  },
];

export default function Header() {
  const { theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const sidebarRef = useRef(null);

  const logo = theme === "dark" ? logoDark : logoLight;
  const isHomePage = location.pathname === "/";

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const openMenu = useCallback(() => setIsOpen(true), []);

  useFocusTrap(sidebarRef, isOpen, closeMenu);

  const { handleTouchStart, handleTouchEnd } = useSwipeToClose(closeMenu);

  function handleNavClick() {
    closeMenu();
  }

  function renderNavLinks(linkClassName) {
    return navLinks.map((link) => (
      <li key={link.label}>
        {link.external ? (
          <a
            href={link.href}
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        ) : (
          <Link
            to={link.to}
            className={linkClassName}
            onClick={handleNavClick}
            aria-current={location.pathname === link.to ? "page" : undefined}
          >
            {link.label}
          </Link>
        )}
      </li>
    ));
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink}>
            <img
              src={logo}
              alt="Anas Saifi logo"
              className={styles.logo}
              width={360}
              height={96}
            />
          </Link>
        </div>

        <div className={styles.headerActions}>
          <nav className={styles.desktopNav} >
            <ul className={styles.navList}>{renderNavLinks()}</ul>
          </nav>

          {!isHomePage && <ThemeToggle />}

          <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={isOpen ? closeMenu : openMenu}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
        </button>
        </div>
      </div>

      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <nav
        id="mobile-nav"
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: "" } : {})}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.sidebarHeader}>
          <p className={styles.sidebarTitle}>Menu</p>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className={styles.sidebarList}>{renderNavLinks(styles.sidebarLink)}</ul>

        <p className={styles.swipeHint} aria-hidden="true">
          Swipe right to close
        </p>
      </nav>
    </header>
  );
}
