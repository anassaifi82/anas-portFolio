import styles from "./ThemeToggle.module.css";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "light" ? sun : moon;
  const themeLabel =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  const buttonClassName = className
    ? `${styles.themeToggle} ${className}`
    : styles.themeToggle;

  return (
    <button
      type="button"
      id="theme-toggle"
      className={buttonClassName}
      onClick={toggleTheme}
      aria-label={themeLabel}
    >
      <img src={themeIcon} alt="" aria-hidden="true" width={20} height={20} />
    </button>
  );
}
