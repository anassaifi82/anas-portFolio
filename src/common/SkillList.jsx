import styles from "./SkillList.module.css";

function SkillList({ src, skill }) {
  return (
    <li className={styles.item}>
      <img src={src} alt="" aria-hidden="true" />
      <span>{skill}</span>
    </li>
  );
}

export default SkillList;
