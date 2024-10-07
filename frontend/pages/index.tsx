import React, { useState } from "react";
import SearchForm from "./Components/SearchForm";
import StudyCard from "./Components/StudyCard";
import StudyDetails from "./Components/StudyDetails";

// To remove --- TESTING
const mockData = [
  {
    protocolSection: {
      identificationModule: {
        nctId: "NCT06628349",
        orgStudyIdInfo: { id: "94- Plant Protein Sips" },
        organization: { fullName: "Texas A&M University", class: "OTHER" },
        briefTitle:
          "Prandial Metabolic Phenotyping in Sarcopenic Older Adults Comparing Plant Based and Whey Based Protein",
        officialTitle:
          "Prandial Metabolic Phenotyping in Sarcopenic Older Adults Comparing Plant Based and Whey Based Protein",
      },
      statusModule: {
        statusVerifiedDate: "2024-10",
        overallStatus: "RECRUITING",
        expandedAccessInfo: { hasExpandedAccess: false },
        startDateStruct: { date: "2024-02-01", type: "ACTUAL" },
        primaryCompletionDateStruct: { date: "2026-01", type: "ESTIMATED" },
        completionDateStruct: { date: "2026-01", type: "ESTIMATED" },
        studyFirstSubmitDate: "2024-04-26",
        studyFirstSubmitQcDate: "2024-10-03",
        studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
        lastUpdateSubmitDate: "2024-10-03",
        lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
      },
      sponsorCollaboratorsModule: {
        responsibleParty: {
          type: "PRINCIPAL_INVESTIGATOR",
          investigatorFullName: "Marielle PKJ Engelen, PhD",
          investigatorTitle: "Professor",
          investigatorAffiliation: "Texas A&M University",
        },
        leadSponsor: { name: "Texas A&M University", class: "OTHER" },
      },
      oversightModule: {
        oversightHasDmc: false,
        isFdaRegulatedDrug: false,
        isFdaRegulatedDevice: false,
      },
      descriptionModule: {
        briefSummary:
          "The researchers overall objective is to determine whether plant and animal protein based proteins affect the anabolic responses across aging populations differently due to specific changes in the essential amino acids (EAA) and non-essential amino acids (NEAA) kinetic responses. The researchers central hypothesis is that a high EAA to NEAA ratio in a protein meal is related to higher anabolic response to the meal. The researchers also hypothesize that the type of NEAA in a protein meal also affects the anabolic capacity of the meal. The researchers rationale is that finding the amino acid composition of a meal that will maximally induce protein anabolism will guide novel nutritional approaches to prevent and treat sarcopenia, thereby reducing both overall economic burden and improving individual patient outcomes.",
        detailedDescription:
          "The study will be conducted in sarcopenic and non-sarcopenic older adults, stratified into different age categories. A sip feeding model will be used as it is a good model to establish the anabolic capacity of meals. The researchers hypothesize that plant-based protein induces less protein anabolism, due to lower production of EAA and higher production of non-essential amino acids (NEAA) as compared to dairy protein. The NEAA kinetics will be different between the plant proteins as soy protein has relatively high levels of the NEAA arginine and Pea protein of aspartate/glutamate. The researchers results will guide future nutritional advice on replacing daily protein with plant-based proteins while keeping the overall effects on metabolism comparable for both the EAA and NEAA. The study will take place at the research facility of the Center for Translational Research on Aging and Longevity (CTRAL), Texas A\\&M University located in the Human Clinical Research Building ) affiliated with Texas A\\&M University. The study involves 1 screening visit of approx. 3 hours, and 4 study days. Some study procedures (e.g., body composition, skeletal muscle function, questionnaires) may be skipped if completed within the past 3 months at CTRAL. All data will be recorded in Case Report Form and stored in the Texas A\\&M REDCap System. Subjects will be asked to arrive in the fasted state on all study days. Fasting prior to screening is not required. On the screening day, body weight, height, and body composition by Dual-energy X-ray absorptiometry (DXA) will be measured. In addition, The Six-Minute Walk Test (6MWT) and skeletal muscle function tests will be assessed at the end of each screening visit. Each study visit will begin with vital signs. Before administration of the feeding or the tracer solution, baseline blood will be collected for measurement of the natural enrichment of metabolites. After the baseline sample is collected, feeding will begin and will be followed by tracers of several compounds that may be administered by IV pulse. Participants will receive the liquid nutritional supplement as sip feeds every 20 minutes for 5 hours. The liquid nutrition supplements will contain the following proteins: (1) 45g of whey protein (dairy based), (2) 45g of soy protein (plant based), (3) 45g of pea protein (plant based), or (4) Placebo (water). Participants will have the option of adding sugar free (SF) vanilla syrup, SF caramel syrup, or SF chocolate syrup to their meals.",
      },
      conditionsModule: {
        conditions: ["Protein Metabolism"],
        keywords: ["Prandial", "Sarcopenia", "Plant protein", "Animal protein"],
      },
      designModule: {
        studyType: "INTERVENTIONAL",
        phases: ["NA"],
        designInfo: {
          allocation: "RANDOMIZED",
          interventionModel: "CROSSOVER",
          primaryPurpose: "OTHER",
          maskingInfo: { masking: "SINGLE", whoMasked: ["PARTICIPANT"] },
        },
        enrollmentInfo: { count: 100, type: "ESTIMATED" },
      },
      armsInterventionsModule: {
        armGroups: [
          {
            label: "Healthy male older adults",
            type: "EXPERIMENTAL",
            description:
              "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
            interventionNames: [
              "Dietary Supplement: Whey Protein Isolate 90%",
              "Dietary Supplement: Soy Protein Isolate (90% Protein)",
              "Dietary Supplement: Organic Pea Protein Isolate",
              "Dietary Supplement: Placebo (Water)",
            ],
          },
          {
            label: "Healthy female older adults",
            type: "EXPERIMENTAL",
            description:
              "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
            interventionNames: [
              "Dietary Supplement: Whey Protein Isolate 90%",
              "Dietary Supplement: Soy Protein Isolate (90% Protein)",
              "Dietary Supplement: Organic Pea Protein Isolate",
              "Dietary Supplement: Placebo (Water)",
            ],
          },
          {
            label: "Healthy male old older adults",
            type: "EXPERIMENTAL",
            description:
              "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
            interventionNames: [
              "Dietary Supplement: Whey Protein Isolate 90%",
              "Dietary Supplement: Soy Protein Isolate (90% Protein)",
              "Dietary Supplement: Organic Pea Protein Isolate",
              "Dietary Supplement: Placebo (Water)",
            ],
          },
          {
            label: "Healthy female old older adults",
            type: "EXPERIMENTAL",
            description:
              "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
            interventionNames: [
              "Dietary Supplement: Whey Protein Isolate 90%",
              "Dietary Supplement: Soy Protein Isolate (90% Protein)",
              "Dietary Supplement: Organic Pea Protein Isolate",
              "Dietary Supplement: Placebo (Water)",
            ],
          },
          {
            label: "Sarcopenic male old older adults",
            type: "EXPERIMENTAL",
            description:
              "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
            interventionNames: [
              "Dietary Supplement: Whey Protein Isolate 90%",
              "Dietary Supplement: Soy Protein Isolate (90% Protein)",
              "Dietary Supplement: Organic Pea Protein Isolate",
              "Dietary Supplement: Placebo (Water)",
            ],
          },
          {
            label: "Sarcopenic female old older adults",
            type: "EXPERIMENTAL",
            description:
              "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
            interventionNames: [
              "Dietary Supplement: Whey Protein Isolate 90%",
              "Dietary Supplement: Soy Protein Isolate (90% Protein)",
              "Dietary Supplement: Organic Pea Protein Isolate",
              "Dietary Supplement: Placebo (Water)",
            ],
          },
        ],
        interventions: [
          {
            type: "DIETARY_SUPPLEMENT",
            name: "Whey Protein Isolate 90%",
            description: "Commercially available animal based protein powders",
            armGroupLabels: [
              "Healthy female old older adults",
              "Healthy female older adults",
              "Healthy male old older adults",
              "Healthy male older adults",
              "Sarcopenic female old older adults",
              "Sarcopenic male old older adults",
            ],
          },
          {
            type: "DIETARY_SUPPLEMENT",
            name: "Soy Protein Isolate (90% Protein)",
            description: "Commercially available plant based protein powders",
            armGroupLabels: [
              "Healthy female old older adults",
              "Healthy female older adults",
              "Healthy male old older adults",
              "Healthy male older adults",
              "Sarcopenic female old older adults",
              "Sarcopenic male old older adults",
            ],
          },
          {
            type: "DIETARY_SUPPLEMENT",
            name: "Organic Pea Protein Isolate",
            description: "Commercially available plant based protein powders",
            armGroupLabels: [
              "Healthy female old older adults",
              "Healthy female older adults",
              "Healthy male old older adults",
              "Healthy male older adults",
              "Sarcopenic female old older adults",
              "Sarcopenic male old older adults",
            ],
          },
          {
            type: "DIETARY_SUPPLEMENT",
            name: "Placebo (Water)",
            description: "Normal drinking water",
            armGroupLabels: [
              "Healthy female old older adults",
              "Healthy female older adults",
              "Healthy male old older adults",
              "Healthy male older adults",
              "Sarcopenic female old older adults",
              "Sarcopenic male old older adults",
            ],
          },
        ],
      },
      outcomesModule: {
        primaryOutcomes: [
          {
            measure:
              "Protein and amino acid synthesis capacity of plant-based and animal-based protein in older adults with or without sarcopenia measured by the use of stable isotope tracers",
            description:
              "A novel stable isotope technique will be used to assess simultaneously the anabolic response and whole body production rates of a variety of amino acids to intake of both dietary proteins in sarcopenic older participants. The samples will be stored in laboratory freezers and the amino acid isotope enrichments and concentrations analyzed by Liquid Chromatography with tandem mass spectrometry (LC-MS/MS). The researchers will then conduct LC-MS/MS analysis, peak integration, calculation of amino acid concentrations and whole body productions from raw data, and use the results for preparation of papers for presentation, publication, and final reports. The researchers main hypothesis is that plant-based protein induces less protein anabolism, due to lower whole body production of essential amino acids (EAA) and higher production of non-essential amino acids (NEAA) as compared to dairy protein.",
            timeFrame: "4 weeks",
          },
        ],
      },
      eligibilityModule: {
        eligibilityCriteria:
          "Inclusion Criteria:\n\n* Age 50-95 years old\n* Stable body-weight (±5%) for the past 3 months\n* Ability to walk, sit down, and stand up (independently or with walking assistance device)\n* Willingness to lay supine in bed for up to 6 hours\n* Willingness and ability to comply with the protocol\n\nExclusion Criteria:\n\n* Established diagnosis and active treatment of chronic disease: Insulin dependent diabetes mellitus, active malignancy, heart disease, kidney disease, liver disease, HIV/AIDS, Asthma (moderate to severe), Hep (A,B, or C)\n* History of untreated metabolic disease including hepatic or renal disorder\n* Presence of acute illness or metabolically unstable chronic illness\n* Hysterectomy\n* Active dependence of alcohol or drugs\n* Use of short course of oral corticosteroids within 4 weeks preceding study day\n* Current use of long-term oral corticosteroids\n* Use of protein or amino acids containing nutritional supplements within 5 days of the first study day\n* Presence of fever within the last 3 days\n* Planned elective surgery requiring 2 or more days of hospitalization during the entire study\n* (Possible) pregnancy\n* Failure to give informed consent or Investigator's uncertainty about the willingness or ability of the subject\n* Already enrolled in another clinical trial\n* Any condition according to the PI or nurse that was found during the screening visit, that would interfere with the study or safety of the patient\n* Known allergy to any of the components of the feeding (soy, pea, or whey - dairy)\n* Established daily diet of vegetarian / vegan composition\n* \\<23 MoCa score",
        healthyVolunteers: true,
        sex: "ALL",
        minimumAge: "50 Years",
        maximumAge: "95 Years",
        stdAges: ["ADULT", "OLDER_ADULT"],
      },
      contactsLocationsModule: {
        centralContacts: [
          {
            name: "Marielle Engelen, PhD",
            role: "CONTACT",
            phone: "979-220-2282",
            email: "mpkj.engelen@ctral.org",
          },
          {
            name: "Savanah Knezek, BS",
            role: "CONTACT",
            phone: "979-442-8468",
            email: "research@ctral.org",
          },
        ],
        overallOfficials: [
          {
            name: "Marielle Engelen, PhD",
            affiliation: "Texas A&M University",
            role: "PRINCIPAL_INVESTIGATOR",
          },
          {
            name: "Nicolaas Deutz, MD, PhD",
            affiliation: "Texas A&M University",
            role: "PRINCIPAL_INVESTIGATOR",
          },
        ],
        locations: [
          {
            facility: "Texas A&M University - CTRAL",
            status: "RECRUITING",
            city: "College Station",
            state: "Texas",
            zip: "77845",
            country: "United States",
            contacts: [
              {
                name: "Laura Ruebush",
                role: "CONTACT",
                phone: "979-218-5515",
                email: "le.ruebush@ctral.org",
              },
              {
                name: "Nicolaas E Deutz, MD, PhD",
                role: "PRINCIPAL_INVESTIGATOR",
              },
              { name: "Marielle P Engelen, PhD", role: "SUB_INVESTIGATOR" },
            ],
            geoPoint: { lat: 30.62798, lon: -96.33441 },
          },
        ],
      },
      ipdSharingStatementModule: {
        ipdSharing: "UNDECIDED",
        description:
          "Data may be shared upon request for up to 6 years beyond completion of the trial based on methods/proposals approved by both parties' institutional review committees. Individual participant data that underlie the results of the trial may be shared after de-identification (text, tables, figures, and appendices). Additional documents available per request include: study protocol, statistical analysis plan, and informed consent. Requests should be directed to Dr. Marielle Engelen (mpkj.engelen@ctral.org).",
      },
    },
    derivedSection: {
      miscInfoModule: { versionHolder: "2024-10-04" },
      conditionBrowseModule: {
        browseLeaves: [{ id: "M28396", name: "Sarcopenia", relevance: "LOW" }],
        browseBranches: [
          { abbrev: "BC10", name: "Nervous System Diseases" },
          { abbrev: "BC23", name: "Symptoms and General Pathology" },
          { abbrev: "All", name: "All Conditions" },
        ],
      },
      interventionBrowseModule: {
        browseLeaves: [
          {
            id: "T435",
            name: "Whey Protein",
            asFound: "Growth Factor",
            relevance: "HIGH",
          },
          { id: "T294", name: "Soy Bean", relevance: "LOW" },
        ],
        browseBranches: [
          { abbrev: "Ot", name: "Other Dietary Supplements" },
          { abbrev: "All", name: "All Drugs and Chemicals" },
          { abbrev: "HB", name: "Herbal and Botanical" },
        ],
      },
    },
    hasResults: false,
  },
];

export default function SearchHome() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>(mockData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedStudy, setSelectedStudy] = useState<any | null>(null);

  const handleSearch = (query: string) => {
    // Perform search logic and update results
    const filteredResults = mockData.filter((study) =>
      study.protocolSection.identificationModule.briefTitle
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStudyClick = (study: any) => {
    setSelectedStudy(study);
  };

  return (
    <div className="study-search">
      <h1>SEARCH FOR A CLINICAL STUDY</h1>
      <SearchForm onSearch={handleSearch} />
      <div className="results">
        {results.map((study) => (
          <StudyCard
            key={study.protocolSection.identificationModule.nctId}
            study={study}
            onClick={() => handleStudyClick(study)}
          />
        ))}
      </div>
      <div id="study-modal">
        {selectedStudy && <StudyDetails study={selectedStudy} />}
      </div>
    </div>
  );
}
