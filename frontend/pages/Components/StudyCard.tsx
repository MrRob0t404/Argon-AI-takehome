import React, { useState } from "react";
import { Study } from '../../types/study';

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
      className={`study-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="study-card__content" onClick={handleStudyClick}>
        <header className="study-card__header">
          <h2 className="study-card__title">
            {identificationModule.briefTitle || identificationModule.officialTitle}
          </h2>
        </header>
        <section className="study-card__info">
          <div className="study-card__info-item">
            <h3 className="study-card__info-label">NCT ID:</h3>
            <p className="study-card__info-value">{identificationModule.nctId}</p>
          </div>
          <div className="study-card__info-item">
            <h3 className="study-card__info-label">Organization:</h3>
            <p className="study-card__info-value">
              {identificationModule.organization?.fullName || "N/A"}
            </p>
          </div>
          <div className="study-card__info-item">
            <h3 className="study-card__info-label">Status:</h3>
            <p className="study-card__info-value">{statusModule.overallStatus}</p>
          </div>
        </section>
      </div>
      <button onClick={removeStudy} className="study-card__remove-button" type="button">
        Remove
      </button>
    </article>
  );
};

export default StudyCard;
