export interface Study {
  protocolSection: {
    identificationModule: {
      officialTitle: string;
      nctId: string;
      briefTitle?: string;
      organization?: { fullName: string };
    };
    statusModule: {
      overallStatus: string;
    };
    descriptionModule: {
      briefSummary: string;
    };
    sponsorCollaboratorsModule: {
      leadSponsor: {
        name: string;
      };
    };
  };
}
