import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getPageTitle } from "../common/pageTitles";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <PageTitle />
      <ScrollToHash />
      <Outlet />
    </>
  );
}
