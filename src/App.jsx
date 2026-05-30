import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));

function PageFallback() {
  return (
    <div
      className="sectionFallback"
      aria-busy="true"
      aria-label="Loading page"
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="accessibility" element={<AccessibilityPage />} />
            <Route path="sitemap" element={<SitemapPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
