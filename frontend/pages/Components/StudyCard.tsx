import React, { useState } from "react";
import { Study } from "../../types/study";
import styles from "../../styles/StudyCard.module.css"; // Add this import

interface StudyProps {
  study: Study;
  handleStudyClick: () => void;
  removeStudy: () => void;
}

const StudyCard: React.FC<StudyProps> = ({
  study,
  handleStudyClick,
  removeStudy,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { identificationModule, statusModule } = study.protocolSection;

  return (
    <article
      className={`${styles.studyCard} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.content} onClick={handleStudyClick}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {identificationModule.briefTitle ||
              identificationModule.officialTitle}
          </h2>
        </header>
        <section className={styles.info}>
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>NCT ID:</h3>
            <p className={styles.infoValue}>{identificationModule.nctId}</p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Organization:</h3>
            <p className={styles.infoValue}>
              {identificationModule.organization?.fullName || "N/A"}
            </p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Status:</h3>
            <p className={styles.infoValue}>{statusModule.overallStatus}</p>
          </div>
        </section>
      </div>
      <button
        onClick={removeStudy}
        className={styles.removeButton}
        type="button"
      >
        Remove
      </button>
    </article>
  );
};

export default StudyCard;
