import { useState } from "react";
import styles from "./SimulatorStyles.module.css";
import AccessibilityLevelSelector from "./AccessibilityLevelSelector";
import AccessibilityDemo from "./AccessibilityDemo";
import LevelStatusPanel from "./LevelStatusPanel";
import WhatChangedPanel from "./WhatChangedPanel";

export default function LevelSimulator() {
  const [level, setLevel] = useState("A");

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 id="simulator-heading" className={styles.heroTitle}>
          Accessibility Level Simulator
        </h1>
        <p className={styles.heroLead}>
          The same form at three WCAG levels. Use the level tabs above — arrow
          keys move between A, AA, and AAA.
        </p>

        <p className={styles.pageA11yNote}>
          <strong>Note:</strong> The Level A form intentionally shows minimum
          patterns (weaker focus and errors). The page chrome and AA/AAA demo
          modes target WCAG 2.1 Level AA.
        </p>

        <AccessibilityLevelSelector
          activeLevel={level}
          onLevelChange={setLevel}
        />
      </header>

      <div
        className={styles.demoLayout}
        id="simulator-demo"
        role="tabpanel"
        aria-labelledby={`level-tab-${level}`}
      >
        <AccessibilityDemo level={level} />

        <div className={styles.sideColumn}>
          <LevelStatusPanel level={level} />
          <WhatChangedPanel level={level} />
        </div>
      </div>
    </div>
  );
}
