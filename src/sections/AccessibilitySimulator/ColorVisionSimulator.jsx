import styles from "./SimulatorStyles.module.css";
import ColorVisionSection from "./ColorVisionSection";

export default function ColorVisionSimulator() {
  return (
    <div className={styles.page}>
      <ColorVisionSection isPage />
    </div>
  );
}
