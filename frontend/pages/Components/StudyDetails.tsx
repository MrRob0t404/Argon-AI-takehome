import React from "react";
import { Study } from '../../types/study';

interface StudyDetailsProps {
  study: Study;
}

const StudyDetails: React.FC<StudyDetailsProps> = ({ study }) => {
  const { protocolSection } = study;
  const {
    identificationModule,
    statusModule,
    descriptionModule,
    sponsorCollaboratorsModule,
  } = protocolSection;

  return (
    <div className="study-details">
      <h1>DETAILS:</h1>
      <h2>{identificationModule.officialTitle}</h2>
      <p>
        <strong>NCT ID:</strong> {identificationModule.nctId}
      </p>
      <p>
        <strong>Status:</strong> {statusModule.overallStatus}
      </p>
      <p>
        <strong>Brief Summary:</strong> {descriptionModule.briefSummary}
      </p>
      <p>
        <strong>Sponsor:</strong> {sponsorCollaboratorsModule.leadSponsor.name}
      </p>
    </div>
  );
};

export default StudyDetails;
