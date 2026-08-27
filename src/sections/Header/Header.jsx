import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderStyles.module.css";
import logoDark from "../../assets/anas-logo-light.png";
import logoLight from "../../assets/anas-saifilogo.webp";
import ThemeToggle from "../../common/ThemeToggle";
import { useFocusTrap } from "../../common/useFocusTrap";
import { useSwipeToClose } from "../../common/useSwipeToClose";
import { useTheme } from "../../common/ThemeContext";
import { isSimulatorPath, SIMULATOR_MENU } from "../../common/simulatorNav";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#skills", label: "Skills" },
  { to: "/#experience", label: "Experience" },
];

const CONTACT_PATH = "/contact";

function ChevronDownIcon() {
  return (
    <svg
      className={styles.submenuChevronIcon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SimulatorSubmenu({ linkClassName, onNavigate, location, variant }) {
  const mobileSubmenuId = useId();
  const [isOpen, setIsOpen] = useState(() =>
    variant === "mobile" ? isSimulatorPath(location.pathname) : false
  );
  const submenuRef = useRef(null);
  const triggerRef = useRef(null);
  const isActive = isSimulatorPath(location.pathname);

  const closeSubmenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (variant !== "mobile") {
      return;
    }

    setIsOpen(isSimulatorPath(location.pathname));
  }, [location.pathname, variant]);

  useEffect(() => {
    if (!isOpen || variant !== "desktop") {
      return undefined;
    }

    function handlePointerDown(event) {
      if (
        submenuRef.current?.contains(event.target) ||
        triggerRef.current?.contains(event.target)
      ) {
        return;
      }

      closeSubmenu();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeSubmenu();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeSubmenu, isOpen, variant]);

  function handleTriggerClick() {
    setIsOpen((open) => !open);
  }

  function handleSubmenuLinkClick() {
    if (variant === "desktop") {
      closeSubmenu();
    }
    onNavigate();
  }

  if (variant === "mobile") {
    return (
      <li
        className={`${styles.sidebarSubmenu} ${isOpen ? styles.sidebarSubmenuExpanded : ""}`}
      >
        <button
          type="button"
          className={`${linkClassName} ${styles.sidebarCollapseTrigger} ${isActive ? styles.sidebarLinkActive : ""}`}
          aria-expanded={isOpen}
          aria-controls={mobileSubmenuId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{SIMULATOR_MENU.label}</span>
          <span className={styles.sidebarCollapseChevron} aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </button>
        <ul
          id={mobileSubmenuId}
          className={
            isOpen
              ? styles.sidebarSubmenuList
              : `${styles.sidebarSubmenuList} ${styles.sidebarSubmenuListClosed}`
          }
          aria-hidden={!isOpen}
        >
          {SIMULATOR_MENU.items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`${linkClassName} ${styles.sidebarSubmenuLink}`}
                onClick={handleSubmenuLinkClick}
                aria-current={location.pathname === item.to ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li
      ref={submenuRef}
      className={`${styles.navSubmenu} ${isOpen ? styles.navSubmenuOpen : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.submenuTrigger} ${styles.navLink} ${isActive ? styles.navLinkActive : ""} ${isOpen ? styles.submenuTriggerOpen : ""}`}
        aria-expanded={isOpen}
        aria-controls="simulator-submenu"
        aria-haspopup="true"
        onClick={handleTriggerClick}
      >
        {SIMULATOR_MENU.label}
        <span className={styles.submenuChevron} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>
      <ul
        id="simulator-submenu"
        className={styles.submenuList}
        hidden={!isOpen}
        aria-label={SIMULATOR_MENU.menuAriaLabel}
      >
        {SIMULATOR_MENU.items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={styles.submenuLink}
              onClick={handleSubmenuLinkClick}
              aria-current={location.pathname === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

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
        <Link
          to={link.to}
          className={linkClassName}
          onClick={handleNavClick}
          aria-current={location.pathname === link.to ? "page" : undefined}
        >
          {link.label}
        </Link>
      </li>
    ));
  }

  function renderDesktopContact() {
    return (
      <Link
        to={CONTACT_PATH}
        className={styles.contactButtonDesktop}
        aria-current={location.pathname === CONTACT_PATH ? "page" : undefined}
      >
        Contact Us
      </Link>
    );
  }

  function renderMobileContact(linkClassName) {
    return (
      <li>
        <Link
          to={CONTACT_PATH}
          className={linkClassName}
          onClick={handleNavClick}
          aria-current={location.pathname === CONTACT_PATH ? "page" : undefined}
        >
          Contact Us
        </Link>
      </li>
    );
  }

  return (
    <>
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
            <nav className={styles.desktopNav} aria-label="Main navigation">
              <ul className={styles.navList}>
                {renderNavLinks(styles.navLink)}
                <SimulatorSubmenu
                  location={location}
                  onNavigate={handleNavClick}
                  variant="desktop"
                />
              </ul>
            </nav>

            <div className={styles.headerTools}>
              {!isHomePage && <ThemeToggle />}
              {renderDesktopContact()}

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
        </div>
      </header>

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

        <ul className={styles.sidebarList}>
          {renderNavLinks(styles.sidebarLink)}
          <SimulatorSubmenu
            linkClassName={styles.sidebarLink}
            location={location}
            onNavigate={handleNavClick}
            variant="mobile"
          />
          {renderMobileContact(`${styles.sidebarLink} ${styles.sidebarContactButton}`)}
        </ul>

        <p className={styles.swipeHint} aria-hidden="true">
          Swipe right to close
        </p>
      </nav>
    </>
  );
}
