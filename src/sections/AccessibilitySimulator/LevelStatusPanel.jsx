import styles from "./SimulatorStyles.module.css";
import { LEVEL_META, LEVEL_FEATURES } from "./simulatorData";

export default function LevelStatusPanel({ level }) {
  const meta = LEVEL_META[level];
  const features = LEVEL_FEATURES[level];

  return (
    <aside className={styles.statusPanel} aria-labelledby="level-status-heading">
      <h2 id="level-status-heading" className={styles.panelHeading}>
        {meta.label}
      </h2>
      <p className={styles.statusBadge}>{meta.status}</p>
      <p className={styles.panelText}>{meta.description}</p>

      <h3 className={styles.subHeading}>Included at this level</h3>
      <ul className={styles.checkList}>
        {features.map((item) => (
          <li key={item}>
            <span className={styles.checkMark} aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
