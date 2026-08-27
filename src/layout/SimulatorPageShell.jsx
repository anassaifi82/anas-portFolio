import Footer from "../sections/Footer/Footer";
import Header from "../sections/Header/Header";
import SimulatorErrorBoundary from "../sections/AccessibilitySimulator/SimulatorErrorBoundary";
import pageStyles from "../pages/PageStyles.module.css";

export default function SimulatorPageShell({ children }) {
  return (
    <>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className={`${pageStyles.pageMain} ${pageStyles.simulatorPageMain}`}
      >
        <SimulatorErrorBoundary>{children}</SimulatorErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
