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
    <article className="study-details">
      <header>
        <h1 className="study-details__title">Study Details</h1>
        <h2 className="study-details__official-title">{identificationModule.officialTitle}</h2>
      </header>
      <section className="study-details__info">
        <div className="study-details__info-item">
          <h3 className="study-details__info-label">NCT ID</h3>
          <p className="study-details__info-value">{identificationModule.nctId}</p>
        </div>
        <div className="study-details__info-item">
          <h3 className="study-details__info-label">Status</h3>
          <p className="study-details__info-value">{statusModule.overallStatus}</p>
        </div>
        <div className="study-details__info-item">
          <h3 className="study-details__info-label">Sponsor</h3>
          <p className="study-details__info-value">{sponsorCollaboratorsModule.leadSponsor.name}</p>
        </div>
      </section>
      <section className="study-details__summary">
        <h3 className="study-details__summary-label">Brief Summary</h3>
        <p className="study-details__summary-value">{descriptionModule.briefSummary}</p>
      </section>
    </article>
  );
};

export default StudyDetails;
