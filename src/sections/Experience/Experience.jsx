import styles from "./ExperienceStyles.module.css";

const experiences = [
  {
    title: "Accessibility Developer & Tester — Frontend Developer",
    company: "D2i Technology",
    companyUrl: "https://d2itechnology.com/",
    meta: "Noida, India (On-site) · February 2025 — Present",
    summary:
      "Built the D2i Technology website in WordPress with accessibility development and testing to meet WCAG 2.1/2.2 AA standards.",
  },
  {
    title: "Frontend Developer Intern",
    company: "Bharat Intern",
    meta: "Bhopal, India (Remote) · August 2024 — September 2024",
    summary: "Built responsive frontend interfaces using HTML, CSS, and JavaScript.",
  },
];

function Experience() {
  return (
    <section
      id="experience"
      className={styles.container}
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="sectionTitle">
        Experience
      </h2>

      <ul className={styles.list} aria-label="Work experience">
        {experiences.map((job) => (
          <li key={`${job.company}-${job.meta}`}>
            <article className={styles.card}>
              <h3 className={styles.title}>{job.title}</h3>
              <p className={styles.company}>{job.company}</p>
              <p className={styles.meta}>{job.meta}</p>
              <p className={styles.summary}>{job.summary}</p>
              {job.companyUrl && (
                <a
                  href={job.companyUrl}
                  className={styles.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit site
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
