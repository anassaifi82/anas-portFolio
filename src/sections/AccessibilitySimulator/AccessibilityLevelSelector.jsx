import styles from "./SimulatorStyles.module.css";
import { useTabListKeyboard } from "../../common/useTabListKeyboard";
import { LEVELS, LEVEL_META } from "./simulatorData";

export default function AccessibilityLevelSelector({
  activeLevel,
  onLevelChange,
}) {
  const { tabListProps, getTabProps } = useTabListKeyboard(
    LEVELS,
    activeLevel,
    onLevelChange
  );

  return (
    <div className={styles.levelSelectorWrap}>
      <div
        {...tabListProps}
        className={styles.levelButtons}
        aria-label="WCAG conformance level"
      >
        {LEVELS.map((level, index) => {
          const meta = LEVEL_META[level];
          const isActive = activeLevel === level;
          const tabProps = getTabProps(level, index);

          return (
            <button
              key={level}
              {...tabProps}
              id={`level-tab-${level}`}
              aria-controls="simulator-demo"
              className={isActive ? styles.levelButtonActive : styles.levelButton}
            >
              <span className={styles.levelButtonLabel}>Level {level}</span>
              <span className={styles.levelButtonSub}>{meta.subtitle}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.progressTrack} aria-hidden="true">
        {LEVELS.map((level, index) => (
          <span key={level} className={styles.progressItem}>
            <span
              className={
                activeLevel === level
                  ? `${styles.progressDot} ${styles.progressDotActive}`
                  : styles.progressDot
              }
            >
              {level}
            </span>
            {index < LEVELS.length - 1 && (
              <span className={styles.progressLine} aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
