import { lazy, Suspense } from "react";
import Footer from "../sections/Footer/Footer";
import Header from "../sections/Header/Header";
import Hero from "../sections/Hero/Hero";
import pageStyles from "./PageStyles.module.css";

const Skills = lazy(() => import("../sections/Skills/Skills"));
const Experience = lazy(() => import("../sections/Experience/Experience"));

function SectionFallback({ label }) {
  return (
    <div
      className="sectionFallback"
      aria-busy="true"
      aria-label={`Loading ${label}`}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className={`${pageStyles.pageMain} ${pageStyles.homePageMain}`}>
        <Hero />
        <Suspense fallback={<SectionFallback label="skills section" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback label="experience section" />}>
          <Experience />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
