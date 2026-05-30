import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";

const skillCategories = [
  {
    title: "Accessibility Testing",
    skills: [
      "WCAG 2.1 / 2.2 AA",
      "axe DevTools / Lighthouse",
      "WAVE / Automated Audits",
      "Manual Screen Reader Testing",
    ],
  },
  {
    title: "Assistive Technologies",
    skills: [
      "NVDA / JAWS (Windows)",
      "VoiceOver (macOS/iOS)",
      "Keyboard Navigation",
    ],
  },
  {
    title: "Accessibility Development",
    skills: [
      "WAI-ARIA / Semantic HTML",
      "Focus Management / Skip Links",
      "Accessible Forms / Live Regions",
    ],
  },
  {
    title: "Frontend Development",
    skills: [
      "React JS / Vite",
      "JavaScript (ES6+)",
      "Responsive Design / Tailwind CSS",
    ],
  },
  {
    title: "WordPress Development",
    skills: [
      "WordPress / Elementor",
      "Custom Theme Development",
      "SCF (Secure Custom Fields)",
    ],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git / GitHub / GitLab", "Postman / Figma", "JIRA / Agile"],
  },
];

function Skills() {
  const { theme } = useTheme();
  const checkMarkIcon =
    theme === "light" ? checkMarkIconLight : checkMarkIconDark;

  return (
    <section
      id="skills"
      className={styles.container}
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="sectionTitle">
        Skills
      </h2>

      <ul className={styles.grid} aria-label="Skill categories">
        {skillCategories.map((category) => (
          <li key={category.title} className={styles.gridItem}>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <ul className={styles.skillList} aria-label={`${category.title} skills`}>
                {category.skills.map((skill) => (
                  <SkillList
                    key={skill}
                    src={checkMarkIcon}
                    skill={skill}
                  />
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
