import React, { useState } from "react";

// Shows what kind of data we can expect
interface StudyProps {
  study: {
    protocolSection: {
      identificationModule: {
        briefTitle: string;
        nctId: string;
        organization: { fullName: string };
      };
      statusModule: { overallStatus: string };
    };
  };
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
    <div
      className={`study-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div onClick={handleStudyClick}>
        <h3>{identificationModule.briefTitle}</h3>
        <p>
          <strong>NCT ID:</strong> {identificationModule.nctId}
        </p>
        <p>
          <strong>Organization:</strong>{" "}
          {identificationModule.organization.fullName}
        </p>
        <p>
          <strong>Status:</strong> {statusModule.overallStatus}
        </p>
      </div>
      <button onClick={removeStudy} className="remove-button" type="button">
        Remove
      </button>
    </div>
  );
};

export default StudyCard;
