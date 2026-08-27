import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getPageTitle } from "../common/pageTitles";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [hash]);

  return null;
}

function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
}

function SkipLink() {
  function handleClick(event) {
    event.preventDefault();
    const main = document.getElementById("main-content");
    if (!main) {
      return;
    }

    main.focus({ preventScroll: true });
    main.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <a href="#main-content" className="skipLink" onClick={handleClick}>
      Skip to main content
    </a>
  );
}

function FocusMainOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <>
      <SkipLink />
      <PageTitle />
      <ScrollToHash />
      <FocusMainOnRouteChange />
      <Outlet />
    </>
  );
}
