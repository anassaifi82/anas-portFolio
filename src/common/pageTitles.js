const PAGE_TITLES = {
  "/": "Anas Saifi — Portfolio",
  "/contact": "Contact Us — Anas Saifi",
  "/accessibility": "Accessibility Statement — Anas Saifi",
  "/simulator": "Accessibility Level Simulator — Anas Saifi",
  "/simulator/color-vision": "Color & Contrast Simulator — Anas Saifi",
  "/sitemap": "Sitemap — Anas Saifi",
};

const DEFAULT_TITLE = PAGE_TITLES["/"];

export function getPageTitle(pathname) {
  return PAGE_TITLES[pathname] ?? DEFAULT_TITLE;
}

export default PAGE_TITLES;
