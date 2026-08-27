import styles from "./SimulatorStyles.module.css";
import { WHAT_CHANGED } from "./simulatorData";

export default function WhatChangedPanel({ level }) {
  if (level === "A") {
    return null;
  }

  const items = WHAT_CHANGED[level] ?? [];

  return (
    <section
      className={`${styles.whatChanged} ${styles.whatChangedCompact}`}
      aria-labelledby="what-changed-heading"
    >
      <h3 id="what-changed-heading" className={styles.panelSubHeading}>
        New at Level {level}
      </h3>
      <ul className={styles.changeListCompact}>
        {items.map((item) => (
          <li key={item}>
            <span className={styles.checkMark} aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
