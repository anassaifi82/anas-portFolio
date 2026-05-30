import Footer from "../sections/Footer/Footer";
import Header from "../sections/Header/Header";
import Contact from "../sections/Contact/Contact";
import pageStyles from "./PageStyles.module.css";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className={`${pageStyles.pageMain} ${pageStyles.contactPageMain}`}>
        <Contact isPage />
      </main>
      <Footer />
    </>
  );
}
