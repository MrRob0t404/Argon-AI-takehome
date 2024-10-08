import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchForm from "./Components/SearchForm";
import StudyCard from "./Components/StudyCard";
import StudyDetails from "./Components/StudyDetails";

// import { Study } from '../types/study';
import { getTrials } from './utils/api';

// To remove --- TESTING
// const mockData = [
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628349",
//         orgStudyIdInfo: { id: "94- Plant Protein Sips" },
//         organization: { fullName: "Texas A&M University", class: "OTHER" },
//         briefTitle:
//           "Prandial Metabolic Phenotyping in Sarcopenic Older Adults Comparing Plant Based and Whey Based Protein",
//         officialTitle:
//           "Prandial Metabolic Phenotyping in Sarcopenic Older Adults Comparing Plant Based and Whey Based Protein",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-02-01", type: "ACTUAL" },
//         primaryCompletionDateStruct: { date: "2026-01", type: "ESTIMATED" },
//         completionDateStruct: { date: "2026-01", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-04-26",
//         studyFirstSubmitQcDate: "2024-10-03",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-03",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: {
//           type: "PRINCIPAL_INVESTIGATOR",
//           investigatorFullName: "Marielle PKJ Engelen, PhD",
//           investigatorTitle: "Professor",
//           investigatorAffiliation: "Texas A&M University",
//         },
//         leadSponsor: { name: "Texas A&M University", class: "OTHER" },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "The researchers overall objective is to determine whether plant and animal protein based proteins affect the anabolic responses across aging populations differently due to specific changes in the essential amino acids (EAA) and non-essential amino acids (NEAA) kinetic responses. The researchers central hypothesis is that a high EAA to NEAA ratio in a protein meal is related to higher anabolic response to the meal. The researchers also hypothesize that the type of NEAA in a protein meal also affects the anabolic capacity of the meal. The researchers rationale is that finding the amino acid composition of a meal that will maximally induce protein anabolism will guide novel nutritional approaches to prevent and treat sarcopenia, thereby reducing both overall economic burden and improving individual patient outcomes.",
//         detailedDescription:
//           "The study will be conducted in sarcopenic and non-sarcopenic older adults, stratified into different age categories. A sip feeding model will be used as it is a good model to establish the anabolic capacity of meals. The researchers hypothesize that plant-based protein induces less protein anabolism, due to lower production of EAA and higher production of non-essential amino acids (NEAA) as compared to dairy protein. The NEAA kinetics will be different between the plant proteins as soy protein has relatively high levels of the NEAA arginine and Pea protein of aspartate/glutamate. The researchers results will guide future nutritional advice on replacing daily protein with plant-based proteins while keeping the overall effects on metabolism comparable for both the EAA and NEAA. The study will take place at the research facility of the Center for Translational Research on Aging and Longevity (CTRAL), Texas A\\&M University located in the Human Clinical Research Building ) affiliated with Texas A\\&M University. The study involves 1 screening visit of approx. 3 hours, and 4 study days. Some study procedures (e.g., body composition, skeletal muscle function, questionnaires) may be skipped if completed within the past 3 months at CTRAL. All data will be recorded in Case Report Form and stored in the Texas A\\&M REDCap System. Subjects will be asked to arrive in the fasted state on all study days. Fasting prior to screening is not required. On the screening day, body weight, height, and body composition by Dual-energy X-ray absorptiometry (DXA) will be measured. In addition, The Six-Minute Walk Test (6MWT) and skeletal muscle function tests will be assessed at the end of each screening visit. Each study visit will begin with vital signs. Before administration of the feeding or the tracer solution, baseline blood will be collected for measurement of the natural enrichment of metabolites. After the baseline sample is collected, feeding will begin and will be followed by tracers of several compounds that may be administered by IV pulse. Participants will receive the liquid nutritional supplement as sip feeds every 20 minutes for 5 hours. The liquid nutrition supplements will contain the following proteins: (1) 45g of whey protein (dairy based), (2) 45g of soy protein (plant based), (3) 45g of pea protein (plant based), or (4) Placebo (water). Participants will have the option of adding sugar free (SF) vanilla syrup, SF caramel syrup, or SF chocolate syrup to their meals.",
//       },
//       conditionsModule: {
//         conditions: ["Protein Metabolism"],
//         keywords: ["Prandial", "Sarcopenia", "Plant protein", "Animal protein"],
//       },
//       designModule: {
//         studyType: "INTERVENTIONAL",
//         phases: ["NA"],
//         designInfo: {
//           allocation: "RANDOMIZED",
//           interventionModel: "CROSSOVER",
//           primaryPurpose: "OTHER",
//           maskingInfo: { masking: "SINGLE", whoMasked: ["PARTICIPANT"] },
//         },
//         enrollmentInfo: { count: 100, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label: "Healthy male older adults",
//             type: "EXPERIMENTAL",
//             description:
//               "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
//             interventionNames: [
//               "Dietary Supplement: Whey Protein Isolate 90%",
//               "Dietary Supplement: Soy Protein Isolate (90% Protein)",
//               "Dietary Supplement: Organic Pea Protein Isolate",
//               "Dietary Supplement: Placebo (Water)",
//             ],
//           },
//           {
//             label: "Healthy female older adults",
//             type: "EXPERIMENTAL",
//             description:
//               "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
//             interventionNames: [
//               "Dietary Supplement: Whey Protein Isolate 90%",
//               "Dietary Supplement: Soy Protein Isolate (90% Protein)",
//               "Dietary Supplement: Organic Pea Protein Isolate",
//               "Dietary Supplement: Placebo (Water)",
//             ],
//           },
//           {
//             label: "Healthy male old older adults",
//             type: "EXPERIMENTAL",
//             description:
//               "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
//             interventionNames: [
//               "Dietary Supplement: Whey Protein Isolate 90%",
//               "Dietary Supplement: Soy Protein Isolate (90% Protein)",
//               "Dietary Supplement: Organic Pea Protein Isolate",
//               "Dietary Supplement: Placebo (Water)",
//             ],
//           },
//           {
//             label: "Healthy female old older adults",
//             type: "EXPERIMENTAL",
//             description:
//               "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
//             interventionNames: [
//               "Dietary Supplement: Whey Protein Isolate 90%",
//               "Dietary Supplement: Soy Protein Isolate (90% Protein)",
//               "Dietary Supplement: Organic Pea Protein Isolate",
//               "Dietary Supplement: Placebo (Water)",
//             ],
//           },
//           {
//             label: "Sarcopenic male old older adults",
//             type: "EXPERIMENTAL",
//             description:
//               "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
//             interventionNames: [
//               "Dietary Supplement: Whey Protein Isolate 90%",
//               "Dietary Supplement: Soy Protein Isolate (90% Protein)",
//               "Dietary Supplement: Organic Pea Protein Isolate",
//               "Dietary Supplement: Placebo (Water)",
//             ],
//           },
//           {
//             label: "Sarcopenic female old older adults",
//             type: "EXPERIMENTAL",
//             description:
//               "Dietary Supplement: Whey Protein Isolate 90%. Commercially available Dietary Supplement: Soy Protein Isolate (90% Protein). Commercially available Dietary Supplement: Organic Pea Protein Isolate. Commercially available Dietary Supplement: Placebo - Water",
//             interventionNames: [
//               "Dietary Supplement: Whey Protein Isolate 90%",
//               "Dietary Supplement: Soy Protein Isolate (90% Protein)",
//               "Dietary Supplement: Organic Pea Protein Isolate",
//               "Dietary Supplement: Placebo (Water)",
//             ],
//           },
//         ],
//         interventions: [
//           {
//             type: "DIETARY_SUPPLEMENT",
//             name: "Whey Protein Isolate 90%",
//             description: "Commercially available animal based protein powders",
//             armGroupLabels: [
//               "Healthy female old older adults",
//               "Healthy female older adults",
//               "Healthy male old older adults",
//               "Healthy male older adults",
//               "Sarcopenic female old older adults",
//               "Sarcopenic male old older adults",
//             ],
//           },
//           {
//             type: "DIETARY_SUPPLEMENT",
//             name: "Soy Protein Isolate (90% Protein)",
//             description: "Commercially available plant based protein powders",
//             armGroupLabels: [
//               "Healthy female old older adults",
//               "Healthy female older adults",
//               "Healthy male old older adults",
//               "Healthy male older adults",
//               "Sarcopenic female old older adults",
//               "Sarcopenic male old older adults",
//             ],
//           },
//           {
//             type: "DIETARY_SUPPLEMENT",
//             name: "Organic Pea Protein Isolate",
//             description: "Commercially available plant based protein powders",
//             armGroupLabels: [
//               "Healthy female old older adults",
//               "Healthy female older adults",
//               "Healthy male old older adults",
//               "Healthy male older adults",
//               "Sarcopenic female old older adults",
//               "Sarcopenic male old older adults",
//             ],
//           },
//           {
//             type: "DIETARY_SUPPLEMENT",
//             name: "Placebo (Water)",
//             description: "Normal drinking water",
//             armGroupLabels: [
//               "Healthy female old older adults",
//               "Healthy female older adults",
//               "Healthy male old older adults",
//               "Healthy male older adults",
//               "Sarcopenic female old older adults",
//               "Sarcopenic male old older adults",
//             ],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure:
//               "Protein and amino acid synthesis capacity of plant-based and animal-based protein in older adults with or without sarcopenia measured by the use of stable isotope tracers",
//             description:
//               "A novel stable isotope technique will be used to assess simultaneously the anabolic response and whole body production rates of a variety of amino acids to intake of both dietary proteins in sarcopenic older participants. The samples will be stored in laboratory freezers and the amino acid isotope enrichments and concentrations analyzed by Liquid Chromatography with tandem mass spectrometry (LC-MS/MS). The researchers will then conduct LC-MS/MS analysis, peak integration, calculation of amino acid concentrations and whole body productions from raw data, and use the results for preparation of papers for presentation, publication, and final reports. The researchers main hypothesis is that plant-based protein induces less protein anabolism, due to lower whole body production of essential amino acids (EAA) and higher production of non-essential amino acids (NEAA) as compared to dairy protein.",
//             timeFrame: "4 weeks",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Age 50-95 years old\n* Stable body-weight (±5%) for the past 3 months\n* Ability to walk, sit down, and stand up (independently or with walking assistance device)\n* Willingness to lay supine in bed for up to 6 hours\n* Willingness and ability to comply with the protocol\n\nExclusion Criteria:\n\n* Established diagnosis and active treatment of chronic disease: Insulin dependent diabetes mellitus, active malignancy, heart disease, kidney disease, liver disease, HIV/AIDS, Asthma (moderate to severe), Hep (A,B, or C)\n* History of untreated metabolic disease including hepatic or renal disorder\n* Presence of acute illness or metabolically unstable chronic illness\n* Hysterectomy\n* Active dependence of alcohol or drugs\n* Use of short course of oral corticosteroids within 4 weeks preceding study day\n* Current use of long-term oral corticosteroids\n* Use of protein or amino acids containing nutritional supplements within 5 days of the first study day\n* Presence of fever within the last 3 days\n* Planned elective surgery requiring 2 or more days of hospitalization during the entire study\n* (Possible) pregnancy\n* Failure to give informed consent or Investigator's uncertainty about the willingness or ability of the subject\n* Already enrolled in another clinical trial\n* Any condition according to the PI or nurse that was found during the screening visit, that would interfere with the study or safety of the patient\n* Known allergy to any of the components of the feeding (soy, pea, or whey - dairy)\n* Established daily diet of vegetarian / vegan composition\n* \\<23 MoCa score",
//         healthyVolunteers: true,
//         sex: "ALL",
//         minimumAge: "50 Years",
//         maximumAge: "95 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Marielle Engelen, PhD",
//             role: "CONTACT",
//             phone: "979-220-2282",
//             email: "mpkj.engelen@ctral.org",
//           },
//           {
//             name: "Savanah Knezek, BS",
//             role: "CONTACT",
//             phone: "979-442-8468",
//             email: "research@ctral.org",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "Marielle Engelen, PhD",
//             affiliation: "Texas A&M University",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//           {
//             name: "Nicolaas Deutz, MD, PhD",
//             affiliation: "Texas A&M University",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//         ],
//         locations: [
//           {
//             facility: "Texas A&M University - CTRAL",
//             status: "RECRUITING",
//             city: "College Station",
//             state: "Texas",
//             zip: "77845",
//             country: "United States",
//             contacts: [
//               {
//                 name: "Laura Ruebush",
//                 role: "CONTACT",
//                 phone: "979-218-5515",
//                 email: "le.ruebush@ctral.org",
//               },
//               {
//                 name: "Nicolaas E Deutz, MD, PhD",
//                 role: "PRINCIPAL_INVESTIGATOR",
//               },
//               { name: "Marielle P Engelen, PhD", role: "SUB_INVESTIGATOR" },
//             ],
//             geoPoint: { lat: 30.62798, lon: -96.33441 },
//           },
//         ],
//       },
//       ipdSharingStatementModule: {
//         ipdSharing: "UNDECIDED",
//         description:
//           "Data may be shared upon request for up to 6 years beyond completion of the trial based on methods/proposals approved by both parties' institutional review committees. Individual participant data that underlie the results of the trial may be shared after de-identification (text, tables, figures, and appendices). Additional documents available per request include: study protocol, statistical analysis plan, and informed consent. Requests should be directed to Dr. Marielle Engelen (mpkj.engelen@ctral.org).",
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         browseLeaves: [{ id: "M28396", name: "Sarcopenia", relevance: "LOW" }],
//         browseBranches: [
//           { abbrev: "BC10", name: "Nervous System Diseases" },
//           { abbrev: "BC23", name: "Symptoms and General Pathology" },
//           { abbrev: "All", name: "All Conditions" },
//         ],
//       },
//       interventionBrowseModule: {
//         browseLeaves: [
//           {
//             id: "T435",
//             name: "Whey Protein",
//             asFound: "Growth Factor",
//             relevance: "HIGH",
//           },
//           { id: "T294", name: "Soy Bean", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "Ot", name: "Other Dietary Supplements" },
//           { abbrev: "All", name: "All Drugs and Chemicals" },
//           { abbrev: "HB", name: "Herbal and Botanical" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628336",
//         orgStudyIdInfo: { id: "CLIN-H-035" },
//         organization: { fullName: "Symbios Orthopedie SA", class: "INDUSTRY" },
//         briefTitle:
//           "Post-Market Observational Study of the HARMONY® Evolution Implants and Instruments",
//         officialTitle:
//           "Post-Market Observational Study of the HARMONY® Evolution Implants and Instruments",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2023-10-11", type: "ACTUAL" },
//         primaryCompletionDateStruct: { date: "2034-10-11", type: "ESTIMATED" },
//         completionDateStruct: { date: "2035-03-11", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-05-02",
//         studyFirstSubmitQcDate: "2024-10-03",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-03",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: { type: "SPONSOR" },
//         leadSponsor: { name: "Symbios Orthopedie SA", class: "INDUSTRY" },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "The purpose of this study is to evaluate the safety and performance of the HARMONY® Evolution implants in a series of operated subjects treated in THR.\n\nThe objective is to demonstrate that the evaluated implants are compliant with the state of the art and the performance (PMA score \\> 15 points) \\& safety claims (The expected acceptable revision rate (state of the art with a confidence interval of 95%) is 3% at 3 years, 5% at 5 years, 7% at 7 years and 10% at 10 years).\n\nThe endpoint of this study is to validate the expected performance of the HARMONY® Evolution implants with the PMA score at 10 years and to validate the safety claim with the expected acceptable revision rate at 10 years.",
//         detailedDescription:
//           "The study is prospective, multi-centric, observational, non-comparative, non-randomized and post market. About 264 subjects will be enrolled in this study to evaluate the safety and performance of the HARMONY® Evolution implants.\n\nPatients will be included in the study during 12 months and followed-up during 10 years.",
//       },
//       conditionsModule: {
//         conditions: ["Total Hip Replacement"],
//         keywords: ["HARMONY", "THR", "Prosthesis"],
//       },
//       designModule: {
//         studyType: "OBSERVATIONAL",
//         patientRegistry: false,
//         designInfo: {
//           observationalModel: "COHORT",
//           timePerspective: "PROSPECTIVE",
//         },
//         enrollmentInfo: { count: 264, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         interventions: [
//           {
//             type: "DEVICE",
//             name: "HARMONY EVOLUTION",
//             description:
//               "It is planned to include consecutive eligible subjects which will be treated with the HARMONY EVOLUTION devices.",
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure:
//               "Evaluate safety by means of measuring Adverse event recurrences",
//             description: "Proportion of patients requiring a revision.",
//             timeFrame: "2 months, 1, 3, 5 and 10 years follow-up",
//           },
//           {
//             measure:
//               "Evaluate performance by means of clinical and quality of life scores",
//             description: "Score PMA \\> 15 points",
//             timeFrame: "2 months, 1, 3, 5 and 10 years follow-up",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure:
//               "Evaluate performance by means of surgeon satisfaction questionnaire",
//             description:
//               "Evaluate the success of the surgical procedure and evaluate surgeon satisfaction regarding the implant components and the use of instruments with the criteria: very satisfied - satisfied - unsatisfied - very unsatisfied for each surgical step.",
//             timeFrame: "2 months, 1, 3, 5 and 10 years follow-up",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Subjects of 18 years of age and older\n* Each subject who is willing to give informed consent\n* Clinically indicated for a Total Hip Replacement\n* Women of childbearing age who are not pregnant and do not expect to become pregnant within 12 months. A pregnancy test should be performed for women of childbearing age\n* Geographically stable and willing to return to the implanting site for all follow-up visits\n\nExclusion Criteria:\n\n* Acute or chronic, local or systemic infection\n* Muscular, neurological, psychological or vascular deficits\n* Poor bone density and quality likely to affect implant stability (severe osteoporosis)\n* Any concomitant condition likely to affect implant integration or function\n* Allergy or hypersensitivity to any of the materials used\n\nSpecific:\n\n• The HARMONY® Evolution Standard stem size 8 shall not be implanted in subjects weighing more than 70 kg.",
//         healthyVolunteers: false,
//         sex: "ALL",
//         minimumAge: "18 Years",
//         maximumAge: "99 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//         studyPopulation:
//           "Subjects who have provided consent for the collection of their data and met the protocol eligibility criteria will be enrolled into this study.",
//         samplingMethod: "NON_PROBABILITY_SAMPLE",
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Bojana Gannevat",
//             role: "CONTACT",
//             phone: "+41 24 424 26 26",
//             email: "bojana.gannevat@symbios.ch",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "Christophe Castelain, Dr.",
//             affiliation: "Clinique Arago",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//         ],
//         locations: [
//           {
//             facility: "Polyclinique de Franche-Comté",
//             status: "RECRUITING",
//             city: "Besançon",
//             country: "France",
//             contacts: [
//               {
//                 name: "Antoine Serre, Dr.",
//                 role: "CONTACT",
//                 phone: "+33 (0)3 81 52 47 74",
//                 email: "chirurgien.serre@gmail.com",
//               },
//             ],
//             geoPoint: { lat: 47.24878, lon: 6.01815 },
//           },
//           {
//             facility: "Clinique Belledonne",
//             status: "RECRUITING",
//             city: "Grenoble",
//             zip: "38400",
//             country: "France",
//             contacts: [
//               {
//                 name: "Christophe Besson, Dr.",
//                 role: "CONTACT",
//                 phone: "+33 (0)4 76 54 40 79",
//                 email: "drbesson.christophe@gmail.com",
//               },
//             ],
//             geoPoint: { lat: 45.16667, lon: 5.71667 },
//           },
//           {
//             facility: "Clinique Juge",
//             status: "RECRUITING",
//             city: "Marseille",
//             zip: "13008",
//             country: "France",
//             contacts: [
//               {
//                 name: "Thomas Cucurrulo, Dr.",
//                 role: "CONTACT",
//                 phone: "+33 (0)4 91 22 02 03",
//                 email: "tcucurulo@gmail.com",
//               },
//             ],
//             geoPoint: { lat: 43.29551, lon: 5.38958 },
//           },
//           {
//             facility: "Clinique Arago",
//             status: "RECRUITING",
//             city: "Paris",
//             zip: "75014",
//             country: "France",
//             contacts: [
//               {
//                 name: "Christophe Castelain, Dr.",
//                 role: "CONTACT",
//                 phone: "+33 (0)1 44 08 04 00",
//                 email: "orthopediste@hotmail.com",
//               },
//             ],
//             geoPoint: { lat: 48.85341, lon: 2.3488 },
//           },
//           {
//             facility: "Médipôle Garonne",
//             status: "RECRUITING",
//             city: "Toulouse",
//             zip: "31100",
//             country: "France",
//             contacts: [
//               {
//                 name: "Nicolas Krantz, Dr.",
//                 role: "CONTACT",
//                 phone: "+33 (0)5 82 08 38 93",
//                 email: "nicolas.krantz@gmail.com",
//               },
//             ],
//             geoPoint: { lat: 43.60426, lon: 1.44367 },
//           },
//         ],
//       },
//       ipdSharingStatementModule: { ipdSharing: "NO" },
//     },
//     derivedSection: { miscInfoModule: { versionHolder: "2024-10-04" } },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628323",
//         orgStudyIdInfo: { id: "H-24010871" },
//         organization: {
//           fullName: "Mental Health Services in the Capital Region, Denmark",
//           class: "OTHER",
//         },
//         briefTitle:
//           "Neuro-VR: Augmenting a Virtual Reality-based Therapy with Neurofeedback for Auditory Hallucinations",
//         officialTitle:
//           "The Neuro-VR Study: a Pilot Study Investigating an Innovative Virtual Reality-based Intervention Employing Neurofeedback to Increase Tolerability and Therapy Efficacy in Psychosis",
//         acronym: "Neuro-VR",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-08",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-10", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2025-10", type: "ESTIMATED" },
//         completionDateStruct: { date: "2025-10", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-08-19",
//         studyFirstSubmitQcDate: "2024-10-03",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-03",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: { type: "SPONSOR" },
//         leadSponsor: {
//           name: "Mental Health Services in the Capital Region, Denmark",
//           class: "OTHER",
//         },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//         isUsExport: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "The primary goal of this pilot study is to examine the feasibility and acceptability of augmenting a Virtual Reality-based intervention for treating auditory hallucinations in schizophrenia with electroencephalogram (EEG)-based neurofeedback.\n\nThe main questions it aims to answer are:\n\n1. Is Virtual Reality -based therapy supplemented with EEG-based neurofeedback (VR-NF) a feasible and acceptable treatment for auditory hallucinations?\n2. Will VR-NF show indications of being more effective than Virtual Reality-based therapy alone in reducing the severity of auditory hallucinations, improving daily functioning, and enhancing quality of life?\n\nResearchers will compare VR-NF to Virtual Reality-based therapy alone to evaluate therapy effectiveness.\n\nParticipants will be allocated to receive 7 sessions of either VR-NF or Virtual Reality-based therapy alone. All participants will undergo a thorough assessment at baseline, and at 12 weeks post-baseline.",
//         detailedDescription:
//           "Auditory hallucinations represent some of the most frequent and debilitating symptoms in schizophrenia spectrum disorders (SSD), affecting up to 80 % of individuals with SSD. Despite receiving treatment with antipsychotic medication, nearly one-third of these individuals continue to experience psychotic symptoms.\n\nVirtual Reality-based interventions have emerged to address the essential need for targeted and effective psychotherapeutic interventions for auditory hallucinations. A recent randomized controlled trial (RCT) has developed and tested a fully immersive Virtual Reality-based intervention, with preliminary results indicating that this approach is effective in mitigating the severity of auditory hallucinations.\n\nThe Neuro-VR study aims to improve the effectiveness of this Virtual Reality-based intervention by incorporating real-time EEG-based neurofeedback into the intervention. We expect that augmenting the VR-based intervention with EEG-based neurofeedback will improve both its tolerability and effectiveness by using individual neurophysiological responses to guide the intervention.\n\nThe primary objective of the pilot study is to evaluate whether the combination of Virtual Reality and EEG-based neurofeedback is a feasible and acceptable therapeutic approach for treating auditory hallucinations in SSD. A secondary objective is to investigate whether Virtual Reality combined with EEG-based neurofeedback provides indications of being superior to Virtual Reality alone in reducing severity of auditory hallucinations, improving daily functioning and enhancing quality of life in individuals with SSD.\n\nIf the pilot study is found successful it could pave the way for broader clinical trials to document the effect of augmenting Virtual Reality-based interventions with real-time feedback from neurophysiological responses. In the long run, this combined approach can be implemented in the mental health clinics to complement traditional treatments.",
//       },
//       conditionsModule: {
//         conditions: ["Auditory Hallucinations", "Schizophrenia"],
//         keywords: [
//           "Virtual Reality-based therapy",
//           "Schizophrenia",
//           "Auditory Hallucinations",
//           "Neurofeedback",
//           "EEG",
//         ],
//       },
//       designModule: {
//         studyType: "INTERVENTIONAL",
//         phases: ["NA"],
//         designInfo: {
//           allocation: "RANDOMIZED",
//           interventionModel: "PARALLEL",
//           primaryPurpose: "TREATMENT",
//           maskingInfo: { masking: "SINGLE", whoMasked: ["OUTCOMES_ASSESSOR"] },
//         },
//         enrollmentInfo: { count: 30, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label:
//               "Virtual Reality based therapy added real-time EEG-based neurofeedback (VR-NF)",
//             type: "EXPERIMENTAL",
//             description:
//               "Participants in the experimental group undergo 7 sessions of a manualized virtual reality-based intervention added real-time EEG neurofeedback aiming to enhance the control and sense of power in relation to the dominant hallucinated voice. Together with the therapist, the participants create a digital representation (avatar) in virtual reality corresponding to the visual perception and sound of the voice. During therapy, the participants will be encouraged to engage in a dialogue with the avatar. While immersed in virtual reality, EEG recordings will be conducted by electrodes connected to a cap on the participants' head. Processed EEG-data will provide real-time information on the participants' brain activity associated with the emotional distress when confronted with the avatar and will be visible both to the participant and therapist. The feedback will be used to continuously adjust the intervention to the brain activity and aims to help the participant practice emotion regulation.",
//             interventionNames: [
//               "Behavioral: Virtual Reality-based Intervention employing Neurofeedback",
//             ],
//           },
//           {
//             label: "Virtual Reality - based therapy",
//             type: "ACTIVE_COMPARATOR",
//             description:
//               "Participants in the control group will be offered 7 sessions of a manualized virtual reality - based therapy that follows the same principles as described in the experimental arm. Together with the therapist, the participants create a digital representation (avatar) in virtual reality that corresponds to their visual perception of and sounds like their hallucinated voice. Thoughout the therapy sessions, the participants will be encouraged to engage in a dialogue with the 'avatar', voiced by the therapist who will alternate between talking as the 'avatar' and as a supportive therapist. The therapy aims at enhancing the participants' control and feeling of power in relation to the dominant hallucinated voice. Furthermore, the therapy focuses on regulating the emotional distress associated with the hallucinated voice.",
//             interventionNames: [
//               "Behavioral: Virtual Reality-based Intervention",
//             ],
//           },
//         ],
//         interventions: [
//           {
//             type: "BEHAVIORAL",
//             name: "Virtual Reality-based Intervention employing Neurofeedback",
//             description:
//               "Virtual Reality-based intervention augmented with real-time EEG-based neurofeedback targeting auditory hallucinations in schizophrenia",
//             armGroupLabels: [
//               "Virtual Reality based therapy added real-time EEG-based neurofeedback (VR-NF)",
//             ],
//           },
//           {
//             type: "BEHAVIORAL",
//             name: "Virtual Reality-based Intervention",
//             description:
//               "Virtual Reality-based intervention targeting auditory hallucinations in schizophrenia",
//             armGroupLabels: ["Virtual Reality - based therapy"],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure:
//               "Feasibility and acceptability as assessed by recruitment rate",
//             description:
//               "Percentage of target sample (30 participants) recruited after 12 months from study start.",
//             timeFrame:
//               "Recruitment rate is monitored throughout the study period (1 year)",
//           },
//           {
//             measure:
//               "Feasibility and acceptability to the VR-NF intervention as assessed by retention rate",
//             description:
//               "Percentage of included participants in the experimental group who retent to treatment at cessation of therapy (7 sessions).",
//             timeFrame:
//               "Retention rates are monitored throughout the study period (1 year)",
//           },
//           {
//             measure:
//               "Feasibility and acceptability to the VR-NF intervention as assessed by level of satisfaction in the experimental group",
//             description:
//               "Percentage of participants in the experimental group reporting a satisfaction rating of more than 7 on a Likert scale ranging from 1-10 with higher scoring indicating a higher level of satisfaction with therapy.",
//             timeFrame: "At 12 weeks follow up",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure:
//               "Severity of positive symptoms (hallucinations, delusions, bizarre behavior and positive formal thought disorder) as assessed by the Scale for the Assessment of Positive Symptoms (SAPS)",
//             description:
//               "SAPS is an interviewer-administered instrument with 34 items measuring positive symptoms in schizophrenia. Each item is rated on a 6-point scale ranging from None (0) to Severe (5) with higher scoring reflecting greater severity of positive symptoms.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Severity of auditory hallucinations as assessed by The Psychotic Symptom Rating Scales, Auditory Hallucination subscale (PSYRATS-AH)",
//             description:
//               "PSYRATS-AH is an interviewer-administered instrument with 11 items assessing characteristics of hallucinations: frequency; duration; location; loudness; beliefs about origin of voices; amount of negative content of voices; degree of negative content; amount of distress; intensity of distress; disruption and control.\n\nEach item is rated on a 5-point scale (0-4) with higher scores reflecting greater severity of auditory hallucinations.\n\nAdditionally, an optional item measuring Number of Voices will be included.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of acceptance of and action in relation to the hallucinated voices as assessed by the Voices Acceptance and Action Scale (VAAS)",
//             description:
//               "The VAAS is a self-report scale assessing level of acceptance of and action in relation to the hallucinated voices rated on a 5-point Likert scale ranging from 'Strongly Disagree' (1) to 'Strongly Agree' (5) with higher scores reflecting higher levels of acceptance and action in relation to the hallucinated voices.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Beliefs about voice power, voice intent and responding styles as assessed by the revised Beliefs about Voices Questionnaire (BAVQ-R)",
//             description:
//               "The BAVQ-R is a self-report questionnaire assessing beliefs about hallucinated voices. Each item is rated on a 4-point scale ranging from Disagree (0), Unsure (1), Slightly agree (2), Strongly agree (3) with higher scores indicating greater endorsement of a belief.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of perceived power in relation to the hallucinated voice as assessed by the Voice Power Differential Scale (VPDS)",
//             description:
//               "The VPDS is a self-report questionnaire with seven items rated on a 5-point scale (1-5) with a total score ranging from 7-35. Higher scores indicate that the voice is perceived to have greater power compared to the respondent.\n\nAt therapy sessions 1 and 7, the participants will be asked to complete the questionnaire focusing on the hallucinated voice they choose to focus on during therapy.",
//             timeFrame:
//               "Baseline, 1 week post baseline, 7 weeks post baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Responding styles to hallucinated voices as assessed by the Assertive Responding to Voices (Approve - Voices) questionnaire",
//             description:
//               "The Assertive Responding to Voices (Approve - Voices) questionnaire comprises 15 items assessing different ways to respond to the hallucinated voices.\n\nScores range from 0-10 with higher scores indicating higher degree of the specific responding to voices.\n\nAt therapy sessions 1 and 7, the participants will be asked to complete the questionnaire focusing on the hallucinated voice they choose to focus on during therapy.",
//             timeFrame:
//               "Baseline, 1 week post baseline, 7 weeks post baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Social and daily functioning as assessed by the Personal and Social Performance Scale (PSP)",
//             description:
//               "The PSP is an interviewer administered instrument assessing different domains of social and daily functioning: job/education, social relations, personal hygiene and aggressive behaviour.\n\nA total score ranges from 1-100 with higher scores indicating a higher degree of functioning.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Social functioning as assessed by the Social Functioning Scale (SFS)",
//             description:
//               "The SFS is a self-report instrument assessing social functioning among individuals with schizophrenia.\n\nThe instrument comprises seven domains: Social engagement/withdrawal, Interpersonal behaviour, Prosocial activities, Recreation, Independence-competence, Independence-performance and Employment/occupation.\n\nThe minimum raw score is 0 and maximum raw score is 223 with higher scoring indicating a higher level of functioning.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//         ],
//         otherOutcomes: [
//           {
//             measure:
//               "Level of negative symptoms as assessed by the Brief Negative Symptoms Scale (BNSS)",
//             description:
//               "The BNSS is a an interviewer-administered instrument comprising 13 items and five domains of negative symptoms: anhedonia, asociality, avolition, blunted effect and alogia.\n\nEach item is rated on a 7-point scale (0-6) with higher scores reflecting a higher level of negative symptoms.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of negative symptoms as assessed by the Self Evaluation of Negative Symptoms (SNS)",
//             description:
//               "The SNS is a self-report questionnaire with 20 items rated on 3-point scale ranging from Strongly agree (2) to Strongly disagree (0). A total score ranges from 0 to 40 with higher scoring reflecting a higher degree of self-evaluated negative symptoms.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Ability to use emotion regulation strategies as assessed by the Emotion Regulation Questionnaire (ERQ)",
//             description:
//               "The ERQ is a self-report questionnaire with 10 items that measure the extent to which the respondent regulates and manages emotions using two different strategies: cognitive reappraisal and expressive suppression.\n\nEach item is rated on a 7-point scale ranging from Completely disagree (1) to Completely agree (7).\n\nThe two subscales are scored separately with higher scores reflecting greater use of the specific strategy.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Difficulties in emotion regulation as assessed by the Difficulties in Emotion Regulation Scale, short version (DERS-16)",
//             description:
//               "The DERS-16 is a self-report questionnaire with 16 items assessing different dimensions of emotion regulation difficulties: Nonacceptance of negative emotions, Inability to engage in goal-directed behaviors when distressed, Difficulties controlling impulsive behaviors when distressed, Limited access to emotion regulation strategies perceived as effective and Lack of emotional clarity.\n\nEach item is rated on a 5-point Likert-scale ranging from Almost never (1) to Almost always (5). A total score is calculated by summing the scores of the different subscales ranging from 16 to 80 with higher scores reflecting greater levels of emotion dysregulation.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Beliefs about self and others as assessed by The Brief Core Schema Scales: Beliefs about self and others (BCSS)",
//             description:
//               "The BCSS is a self-report questionnaire with 24 items assessing four dimensions of schemata concerning self and others: Negative-self, Positive-self, Negative-others and Positive-others.\n\nEach item is rated on a 5-point scale ranging from No (0) to Believe it totally (4) with higher scores indicating greater endorsement of a schema.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of client satisfaction with intervention as assessed by the Client Satisfaction Questionnaire (CSQ)",
//             description:
//               "The CSQ is a self-report questionnaire with 8 items measuring client satisfaction with the intervention.\n\nEach item is scored on a 4-point scale ranging from 1-4 with higher scores reflecting greater satisfaction with intervention.",
//             timeFrame: "At 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of simulator sickness elicited by virtual reality as assessed by the Simulator Sickness Questionnaire (SSQ)",
//             description:
//               "The SSQ is a self-report questionnaire with 16 items measuring different symptoms of simulator sickness. Each item is rated on a 4-point scale ranging from None (0) to Severe (3) with higher scores indicating a higher level of symptoms.",
//             timeFrame: "2, 4 and 7 weeks post baseline",
//           },
//           {
//             measure:
//               "Level of depressive symptoms as assessed by the Calgary Depression Scale for Schizophrenia (CDSS)",
//             description:
//               "The CDSS is an interviewer-administered instrument comprising 9 items assessing level of depression among individuals with schizophrenia. Each item is rated on a 4-point scale ranging from Absent (0) to Severe (3) with higher scores indicating a higher level of depressive symptoms.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Severity of suicidal ideation and risk for suicidal behavior as assessed by the Suicidal Ideation Attributes Scale (SIDAS)",
//             description:
//               "The SIDAS is a self-report questionnaire with 5 items measuring different aspects of suicidal thoughts: frequency, controllability, closeness to attempt, level of distress associated with the thoughts and impact on daily functioning.\n\nEach item is rated on a 11-point scale ranging from 0-10 with higher scores reflecting greater severity of suicidal thoughts.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Experience with childhood traumas as assessed by the Childhood Trauma Questionnaire(CTQ)",
//             description:
//               "The CTQ is a retrospective, self-report questionnaire with 28 items measuring traumatic experiences in childhood.\n\nEach item is rated on a 5-point Likert scale ranging from Never (1) to Very often (5) with higher scores reflecting greater severity of childhood trauma.",
//             timeFrame: "Baseline",
//           },
//           {
//             measure:
//               "Psychological well-being as assessed by The World Health Organisation- Five Well-Being Index (WHO-5)",
//             description:
//               "The WHO-5 is a self-report questionnaire with 5 items measuring subjective psychological well-being. Each item is scored on a 6-point scale ranging At no time (0) to All of the time (5).\n\nA total raw score is ranging from 0 to 25. To calculate the final score, the total raw score is multiplied by 4 with higher scores reflecting higher levels of well-being.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Sleep quality as assessed by the Pittsburgh Sleep Quality Index (PSQI)",
//             description:
//               "The PSQI is a self-report questionnaire measuring sleep quality and disturbances over a 1-month time.\n\nThe questionnaire consists of a combination of Likert- type and open-ended questions with higher scores indicating higher level of sleep disturbances.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of self-efficacy as assessed by the General Self-Efficacy Scale (GSE)",
//             description:
//               "The GSE is a self-report questionnaire with 10 items meausering percevied self-efficacy. Each item is rated on a 4-point scale ranging from Not at all true (1) to Exactly true (4) with higher scores reflecting greater self-efficacy.\n\nTotal score ranges from 10 to 40.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Level of insight into illness as assessed by the Birchwood Insight Scale (BIS)",
//             description:
//               "The BIS is a self-report questionnaire with 8 items measuring insight in mental illness. Each item is rated on a 3-point scale ranging from Agree, Disagree to Unsure.\n\nA total score is calculated by summing the scores of three subscales (Awareness of symptoms, Awareness of illness and Need for treatment) and ranges from 0-12 with higher scores reflecting greater insight into illness.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Readiness for therapy as assessed by the Readiness for Therapy Questionnaire (RTQ)",
//             description:
//               "The RTQ is a self-report questionnaire with 6 items measuring positive attitude and preparedness to enter therapy.\n\nEach item is rated on a 5-point Likert scale ranging from Strongly disagree (0) to Strongly agree (4).\n\nItems 2, 3 and 6 are reversed scored. A higher score reflects greater readiness for therapy.",
//             timeFrame: "Baseline",
//           },
//           {
//             measure:
//               "Change in EEG (Electroencephalography) activity - P50 suppression",
//             description:
//               "P50 suppression is a measure of sensory gating that can be assessed by measuring electroencephalographic (EEG) responses to repeated pairs of auditory clicks The participants will be instructed to count auditory clicks, either in pairs or individually, while keeping the eyes closed.\n\nThe paradigm will last for a total of 21 minutes, divided into 3 intervals of 7 minutes each.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Change in EEG (Electroencephalography) activity - Mismatch Negativity (MMN)",
//             description:
//               "The mismatch negativity (MMN) is a brain response to violations of a rule, established by a sequence of sensory stimuli. The participants will watch a movie on a screen while hearing some pure tones. The participants will be instructed to try to ignore the tones and not react on them, sitting as still as possible.\n\nThis paradigm lasts 12 minutes.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Change in EEG (Electroencephalography) activity - Auditory Steady State Response (ASSR)",
//             description:
//               "ASSRs are evoked brain responses to repeated auditory stimulus. A sequence of tones is repeatedly presented to the participants. The participants are instructed to keep their gaze fixed on a cross displayed on a screen in front of them while they sit as still as possible.\n\nThis paradigm lasts 6 minutes.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Change in EEG (Electroencephalography) activity - Selective Attention (SA)",
//             description:
//               "A Selective Attention (SA) paradigm will measure the ability to focus on relevant information, while filtering out distracting information.\n\nThe participants will be presented to standard auditory stimuli, followed by a deviant stimulus with a higher frequency across both ears. The participants will be instructed to press a button if they hear a deviant stimulus on a specific ear.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "Change in EEG (Electroencephalography) activity - Resting State",
//             description:
//               "EEG recordings at resting state will measure spontaneous neural activity. The participants will be instructed to sit as still as possible while keeping their eyes open and fixed on a cross displayed on a screen in front of them. The participants will be instructed to not think of anything in specific.\n\nThis paradigm will last 5 minutes.",
//             timeFrame: "Baseline and at 12 weeks follow up",
//           },
//           {
//             measure:
//               "A qualitative measure of feasibility and acceptability to the VR-NF intervention",
//             description:
//               "Qualitative semi-structured interviews with participants and therapists will be conducted to investigate their experiences with the experimental intervention.",
//             timeFrame:
//               "Semi-structured interviews will be conducted throughout the study period (up to 18 months)",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n1. Ability to give informed consent\n2. Age of 18-65 years\n3. Diagnosis of schizophrenia spectrum disorder (ICD-10 codes: F20, F22-23; F25-29)\n4. Symtoms of Auditory Verbal Hallucinations within at least the past 3 months (corresponding to SAPS score of 3 or more)\n5. Identification of at least one dominant voice\n6. No changes in antipsychotic medications four weeks prior to inclusion in the project\n7. No planned changes in antipsychotic medication in the 12 weeks following inclusion in the project\n8. A command of Danish or English sufficient to engage in therapy\n\nExclusion Criteria:\n\n1. Rejecting informed consent\n2. A diagnosis of organic brain disease\n3. Intellectual disability (IQ ˂ 70)\n4. A primary diagnosis of substance dependence hindering engaging in therapy\n5. Hear voices in a language the therapist does not speak\n6. Inability to tolerate the therapy",
//         healthyVolunteers: false,
//         sex: "ALL",
//         minimumAge: "18 Years",
//         maximumAge: "65 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Sara B. Soleim, MSc (Psych.)",
//             role: "CONTACT",
//             phone: "+ 45 20131129",
//             email: "sara.breivik.soleim@regionh.dk",
//           },
//           {
//             name: "Louise B. Glenthøj, DMSc, PhD",
//             role: "CONTACT",
//             phone: "+ 45 21452889",
//             email: "louise.birkedal.glenthoej@regionh.dk",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "Louise B. Glenthøj, DMSc, PhD",
//             affiliation: "Copenhagen Research Center for Mental Health - CORE",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//         ],
//         locations: [
//           {
//             facility: "Copenhagen Research Center for Mental Health (CORE)",
//             city: "Hellerup",
//             state: "Copenhagen",
//             zip: "2900",
//             country: "Denmark",
//             geoPoint: { lat: 55.73204, lon: 12.57093 },
//           },
//         ],
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [
//           { id: "D000006212", term: "Hallucinations" },
//           { id: "D000012559", term: "Schizophrenia" },
//         ],
//         ancestors: [
//           {
//             id: "D000019967",
//             term: "Schizophrenia Spectrum and Other Psychotic Disorders",
//           },
//           { id: "D000001523", term: "Mental Disorders" },
//           { id: "D000010468", term: "Perceptual Disorders" },
//           { id: "D000019954", term: "Neurobehavioral Manifestations" },
//           { id: "D000009461", term: "Neurologic Manifestations" },
//           { id: "D000009422", term: "Nervous System Diseases" },
//         ],
//         browseLeaves: [
//           {
//             id: "M9304",
//             name: "Hallucinations",
//             asFound: "Hallucinations",
//             relevance: "HIGH",
//           },
//           {
//             id: "M15376",
//             name: "Schizophrenia",
//             asFound: "Schizophrenia",
//             relevance: "HIGH",
//           },
//           { id: "M4815", name: "Mental Disorders", relevance: "LOW" },
//           { id: "M14473", name: "Psychotic Disorders", relevance: "LOW" },
//           {
//             id: "M21838",
//             name: "Schizophrenia Spectrum and Other Psychotic Disorders",
//             relevance: "LOW",
//           },
//           { id: "M13379", name: "Perceptual Disorders", relevance: "LOW" },
//           {
//             id: "M21826",
//             name: "Neurobehavioral Manifestations",
//             relevance: "LOW",
//           },
//           { id: "M12404", name: "Neurologic Manifestations", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "BC10", name: "Nervous System Diseases" },
//           { abbrev: "BC23", name: "Symptoms and General Pathology" },
//           { abbrev: "BXM", name: "Behaviors and Mental Disorders" },
//           { abbrev: "All", name: "All Conditions" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628310",
//         orgStudyIdInfo: { id: "M24-977" },
//         secondaryIdInfos: [
//           { id: "2024-513008-32", type: "OTHER", domain: "EU CT" },
//         ],
//         organization: { fullName: "AbbVie", class: "INDUSTRY" },
//         briefTitle:
//           "A Study to Evaluate the Adverse Events, Efficacy, and Optimal Dose of Intravenous (IV) ABBV-400 in Combination With IV Fluorouracil, Leucovorin, and Budigalimab in Adult Participants With Locally Advanced Unresectable or Metastatic Gastric, Gastroesophageal Junction, or Esophageal Adenocarcinoma",
//         officialTitle:
//           "A Phase 2 Randomized Study to Evaluate the Safety, Efficacy, and Optimal Dose of ABBV-400 in Combination With Fluorouracil, Leucovorin, and Budigalimab as First-Line Treatment in Subjects With Locally Advanced Unresectable or Metastatic Gastric, Gastroesophageal Junction, or Esophageal Adenocarcinoma (AndroMETa-GEA-977)",
//         acronym: "AndroMETa-GEA",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-12-08", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2030-10-06", type: "ESTIMATED" },
//         completionDateStruct: { date: "2030-10-06", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-10-03",
//         studyFirstSubmitQcDate: "2024-10-03",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-03",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: { type: "SPONSOR" },
//         leadSponsor: { name: "AbbVie", class: "INDUSTRY" },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: true,
//         isFdaRegulatedDevice: false,
//         isUsExport: true,
//       },
//       descriptionModule: {
//         briefSummary:
//           "Cancer is a condition where cells in a specific part of body grow and reproduce uncontrollably. The purpose of this study is to assess adverse events and change in disease activity when ABBV-400 is given in combination with Fluorouracil, Leucovorin, and a programmed cell death receptor 1 (PD1) inhibitor (Budigalimab) (AFLB) to adult participants to treat locally advanced unresectable or metastatic gastric, gastroesophageal junction, or esophageal adenocarcinoma (mGEA).\n\nABBV-400 and Budigalimab are investigational drugs being developed for the treatment of mGEA. Fluorouracil and Leucovorin are drugs approved for the treatment of mGEA. This study will be divided into two stages, with the first stage treating participants with increasing doses of ABBV-400 within the AFLB regimen until the dose reached is tolerable and expected to be efficacious. Participants will then be randomized into groups called treatment arms where one group will receive fluorouracil, leucovorin, and oxaliplatin (FOLFOX). A further two treatment groups will receive AFLB, but with two optimized doses of ABBV-400 to allow for the best dose to be studied in the future. Approximately 180 adult participants with mGEA will be enrolled in the study in 51 sites worldwide.\n\nIn the dose escalation stage participants will be treated with increasing intravenous (IV) doses of ABBV-400 within the AFLB regimen until the dose reached is tolerable and expected to be efficacious. In the dose optimization stage participants will be receive FOLFOX or receive AFLB, but with one of two optimized doses of ABBV-400The study will run for a duration of approximately 6 years.\n\nThere may be higher treatment burden for participants in this trial compared to their standard of care. Participants will attend regular visits during the study at an approved institution (hospital or clinic). The effect of the treatment will be frequently checked by medical assessments, blood tests, questionnaires and side effects.",
//       },
//       conditionsModule: {
//         conditions: [
//           "Locally Advanced Unresectable or Metastatic Gastric Adenocarcinoma",
//           "Gastroesophageal Junction Adenocarcinoma",
//           "Esophageal Adenocarcinoma",
//         ],
//         keywords: [
//           "Locally Advanced Unresectable or Metastatic Gastric Adenocarcinoma",
//           "Gastroesophageal Junction Adenocarcinoma",
//           "Esophageal Adenocarcinoma",
//           "ABBV-400",
//           "ABBV-181",
//           "Budigalimab",
//         ],
//       },
//       designModule: {
//         studyType: "INTERVENTIONAL",
//         phases: ["PHASE2"],
//         designInfo: {
//           allocation: "RANDOMIZED",
//           interventionModel: "SEQUENTIAL",
//           primaryPurpose: "TREATMENT",
//           maskingInfo: {
//             masking: "QUADRUPLE",
//             whoMasked: [
//               "PARTICIPANT",
//               "CARE_PROVIDER",
//               "INVESTIGATOR",
//               "OUTCOMES_ASSESSOR",
//             ],
//           },
//         },
//         enrollmentInfo: { count: 180, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label: "Stage 1: Dose Escalation ABBV-400",
//             type: "EXPERIMENTAL",
//             description:
//               "Participants will receive escalating doses of ABBV-400 in combination with a fixed dose of fluorouracil, leucovorin and budigalimab as part of the approximately 6 year study duration.",
//             interventionNames: [
//               "Drug: ABBV-400",
//               "Drug: Budigalimab",
//               "Drug: Fluorouracil",
//               "Drug: Leucovorin",
//             ],
//           },
//           {
//             label: "Stage 2 Arm 1: Dose Optimization ABBV-400 Dose A",
//             type: "EXPERIMENTAL",
//             description:
//               "Participants will receive ABBV-400 dose A in combination with a fixed dose of fluorouracil, leucovorin and budigalimab as part of the approximately 6 year study duration.",
//             interventionNames: [
//               "Drug: ABBV-400",
//               "Drug: Budigalimab",
//               "Drug: Fluorouracil",
//               "Drug: Leucovorin",
//             ],
//           },
//           {
//             label: "Stage 2 Arm 2: Dose Optimization ABBV-400 Dose B",
//             type: "EXPERIMENTAL",
//             description:
//               "Participants will receive ABBV-400 dose B in combination with a fixed dose of fluorouracil, leucovorin and budigalimab as part of the approximately 6 year study duration.",
//             interventionNames: [
//               "Drug: ABBV-400",
//               "Drug: Budigalimab",
//               "Drug: Fluorouracil",
//               "Drug: Leucovorin",
//             ],
//           },
//           {
//             label: "Stage 2 Arm 3: Dose Optimization Standard of Care (SOC)",
//             type: "EXPERIMENTAL",
//             description:
//               "Participants will receive a fixed dose of leucovorin (folinic acid), fluorouracil, oxaliplatin (FOLFOX) and budigalimab as part of the approximately 6 year study duration.",
//             interventionNames: [
//               "Drug: Budigalimab",
//               "Drug: Fluorouracil",
//               "Drug: Leucovorin",
//               "Drug: Oxaliplatin",
//             ],
//           },
//         ],
//         interventions: [
//           {
//             type: "DRUG",
//             name: "ABBV-400",
//             description: "Intravenous (IV) Infusion",
//             armGroupLabels: [
//               "Stage 1: Dose Escalation ABBV-400",
//               "Stage 2 Arm 1: Dose Optimization ABBV-400 Dose A",
//               "Stage 2 Arm 2: Dose Optimization ABBV-400 Dose B",
//             ],
//           },
//           {
//             type: "DRUG",
//             name: "Budigalimab",
//             description: "IV Infusion",
//             armGroupLabels: [
//               "Stage 1: Dose Escalation ABBV-400",
//               "Stage 2 Arm 1: Dose Optimization ABBV-400 Dose A",
//               "Stage 2 Arm 2: Dose Optimization ABBV-400 Dose B",
//               "Stage 2 Arm 3: Dose Optimization Standard of Care (SOC)",
//             ],
//             otherNames: ["ABBV-181"],
//           },
//           {
//             type: "DRUG",
//             name: "Fluorouracil",
//             description: "IV Infusion; IV Injection",
//             armGroupLabels: [
//               "Stage 1: Dose Escalation ABBV-400",
//               "Stage 2 Arm 1: Dose Optimization ABBV-400 Dose A",
//               "Stage 2 Arm 2: Dose Optimization ABBV-400 Dose B",
//               "Stage 2 Arm 3: Dose Optimization Standard of Care (SOC)",
//             ],
//           },
//           {
//             type: "DRUG",
//             name: "Leucovorin",
//             description: "IV Infusion; IV Injection",
//             armGroupLabels: [
//               "Stage 1: Dose Escalation ABBV-400",
//               "Stage 2 Arm 1: Dose Optimization ABBV-400 Dose A",
//               "Stage 2 Arm 2: Dose Optimization ABBV-400 Dose B",
//               "Stage 2 Arm 3: Dose Optimization Standard of Care (SOC)",
//             ],
//             otherNames: ["Folinic Acid"],
//           },
//           {
//             type: "DRUG",
//             name: "Oxaliplatin",
//             description: "IV Infusion",
//             armGroupLabels: [
//               "Stage 2 Arm 3: Dose Optimization Standard of Care (SOC)",
//             ],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure:
//               "Progression-Free Survival (PFS) as Assessed by Investigator",
//             description:
//               "PFS is defined as the time from the first dose of study drug to the first occurrence of radiographic progression based on Response Evaluation Criteria in Solid Tumors (RECIST) version 1.1 as determined by investigator or death from any cause, whichever occurs earlier.",
//             timeFrame: "Through Study Completion, Approximately 6 Years",
//           },
//           {
//             measure:
//               "Percentage of Participants with Objective Response (OR) as Assessed by Investigator",
//             description:
//               "OR is defined as confirmed complete response (CR) or confirmed partial response (PR) as assessed by investigator per RECIST version 1.1.",
//             timeFrame: "Through Study Completion, Approximately 6 Years",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure:
//               "Percentage of Participants Achieving Disease Control (DC) as Assessed by Investigator",
//             description:
//               "DC is defined as best overall response of confirmed CR or confirmed PR, or stable disease (SD) (with a minimum duration of 16 weeks) based on RECIST, version 1.1 as determined by the investigator.",
//             timeFrame: "Through Study Completion, Approximately 6 Years",
//           },
//           {
//             measure: "Duration of Response (DOR) as Assessed by Investigator",
//             description:
//               "DOR is defined as the time from the first documented CR or PR to the first occurrence of radiographic progression per RECIST version 1.1 as determined by investigator or death from any cause, whichever occurs first.",
//             timeFrame: "Through Study Completion, Approximately 6 Years",
//           },
//           {
//             measure: "Overall Survival (OS)",
//             description:
//               "OS is defined as the time from first dose of study drug to the event of death from any cause.",
//             timeFrame: "Through Study Completion, Approximately 6 Years",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Have inoperable, advanced or metastatic histologically- or cytologically confirmed gastric, gastroesophageal junction, or esophageal adenocarcinoma.\n* Have measurable disease determined using Response Evaluation Criteria in Solid Tumors (RECIST) v1.1.\n* Have an Eastern Cooperative Oncology Group (ECOG) performance status (PS) of 0 or 1.\n* Human epidermal growth factor receptor 2 (HER2) negative disease, defined as immunohistochemistry (IHC) (0, or 1+) or fluorescence in situ hybridization (FISH) negative.\n* Known programmed death ligand 1 (PD-L1) status at screening, or availability of tumor tissue for local or central PD-L1 testing prior to enrollment.\n\nExclusion Criteria:\n\n* Have prior systemic therapy in the locally advanced, unresectable, or metastatic setting.\n* History of clinically significant, intercurrent lung-specific illnesses including, but not limited to those listed in the protocol.",
//         healthyVolunteers: false,
//         sex: "ALL",
//         minimumAge: "18 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "ABBVIE CALL CENTER",
//             role: "CONTACT",
//             phone: "844-663-3742",
//             email: "abbvieclinicaltrials@abbvie.com",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "ABBVIE INC.",
//             affiliation: "AbbVie",
//             role: "STUDY_DIRECTOR",
//           },
//         ],
//       },
//       referencesModule: {
//         seeAlsoLinks: [
//           {
//             label: "Related Info",
//             url: "https://www.abbvieclinicaltrials.com/study/?id=M24-977",
//           },
//         ],
//       },
//       ipdSharingStatementModule: {
//         ipdSharing: "YES",
//         description:
//           "AbbVie is committed to responsible clinical trial data sharing. This includes access to anonymized, individual and trial-level data (analysis data sets), as well as other information.",
//         infoTypes: ["STUDY_PROTOCOL", "SAP"],
//         timeFrame:
//           "For details on when studies are available for sharing, visit https://vivli.org/ourmember/abbvie/",
//         accessCriteria:
//           "To learn more about the process, or to submit a request, visit the following link https://www.abbvieclinicaltrials.com/hcp/data-sharing/",
//         url: "https://vivli.org/ourmember/abbvie/",
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [
//           { id: "D000002300", term: "Adenocarcinoma" },
//           { id: "D000004938", term: "Esophageal Neoplasms" },
//         ],
//         ancestors: [
//           { id: "D000002277", term: "Carcinoma" },
//           { id: "D000009375", term: "Neoplasms, Glandular and Epithelial" },
//           { id: "D000009370", term: "Neoplasms by Histologic Type" },
//           { id: "D000009369", term: "Neoplasms" },
//           { id: "D000005770", term: "Gastrointestinal Neoplasms" },
//           { id: "D000004067", term: "Digestive System Neoplasms" },
//           { id: "D000009371", term: "Neoplasms by Site" },
//           { id: "D000006258", term: "Head and Neck Neoplasms" },
//           { id: "D000004066", term: "Digestive System Diseases" },
//           { id: "D000004935", term: "Esophageal Diseases" },
//           { id: "D000005767", term: "Gastrointestinal Diseases" },
//         ],
//         browseLeaves: [
//           {
//             id: "M3585",
//             name: "Adenocarcinoma",
//             asFound: "Adenocarcinoma",
//             relevance: "HIGH",
//           },
//           {
//             id: "M8088",
//             name: "Esophageal Neoplasms",
//             asFound: "Esophageal Adenocarcinoma",
//             relevance: "HIGH",
//           },
//           { id: "M5534", name: "Carcinoma", relevance: "LOW" },
//           {
//             id: "M12320",
//             name: "Neoplasms, Glandular and Epithelial",
//             relevance: "LOW",
//           },
//           {
//             id: "M12315",
//             name: "Neoplasms by Histologic Type",
//             relevance: "LOW",
//           },
//           { id: "M8886", name: "Gastrointestinal Neoplasms", relevance: "LOW" },
//           { id: "M7256", name: "Digestive System Neoplasms", relevance: "LOW" },
//           { id: "M9348", name: "Head and Neck Neoplasms", relevance: "LOW" },
//           { id: "M8883", name: "Gastrointestinal Diseases", relevance: "LOW" },
//           { id: "M7255", name: "Digestive System Diseases", relevance: "LOW" },
//           { id: "M8085", name: "Esophageal Diseases", relevance: "LOW" },
//           { id: "T2141", name: "Esophageal Cancer", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "BC04", name: "Neoplasms" },
//           { abbrev: "All", name: "All Conditions" },
//           { abbrev: "BC06", name: "Digestive System Diseases" },
//           { abbrev: "Rare", name: "Rare Diseases" },
//         ],
//       },
//       interventionBrowseModule: {
//         meshes: [
//           { id: "D000002955", term: "Leucovorin" },
//           { id: "D000077150", term: "Oxaliplatin" },
//           { id: "D000005472", term: "Fluorouracil" },
//         ],
//         ancestors: [
//           { id: "D000000970", term: "Antineoplastic Agents" },
//           { id: "D000000963", term: "Antimetabolites" },
//           {
//             id: "D000045504",
//             term: "Molecular Mechanisms of Pharmacological Action",
//           },
//           { id: "D000000964", term: "Antimetabolites, Antineoplastic" },
//           { id: "D000007166", term: "Immunosuppressive Agents" },
//           { id: "D000007155", term: "Immunologic Factors" },
//           { id: "D000045505", term: "Physiological Effects of Drugs" },
//           { id: "D000000931", term: "Antidotes" },
//           { id: "D000020011", term: "Protective Agents" },
//           { id: "D000014803", term: "Vitamin B Complex" },
//           { id: "D000014815", term: "Vitamins" },
//           { id: "D000018977", term: "Micronutrients" },
//         ],
//         browseLeaves: [
//           {
//             id: "M6191",
//             name: "Leucovorin",
//             asFound: "May",
//             relevance: "HIGH",
//           },
//           {
//             id: "M1674",
//             name: "Oxaliplatin",
//             asFound: "Prospective",
//             relevance: "HIGH",
//           },
//           {
//             id: "M8600",
//             name: "Fluorouracil",
//             asFound: "According",
//             relevance: "HIGH",
//           },
//           { id: "M8618", name: "Folic Acid", relevance: "LOW" },
//           { id: "M29233", name: "Levoleucovorin", relevance: "LOW" },
//           { id: "M4281", name: "Antimetabolites", relevance: "LOW" },
//           { id: "M10212", name: "Immunosuppressive Agents", relevance: "LOW" },
//           { id: "M10201", name: "Immunologic Factors", relevance: "LOW" },
//           { id: "M4250", name: "Antidotes", relevance: "LOW" },
//           { id: "M21869", name: "Protective Agents", relevance: "LOW" },
//           { id: "M17558", name: "Vitamins", relevance: "LOW" },
//           { id: "M17546", name: "Vitamin B Complex", relevance: "LOW" },
//           { id: "M21009", name: "Micronutrients", relevance: "LOW" },
//           { id: "M16885", name: "Trace Elements", relevance: "LOW" },
//           {
//             id: "T447",
//             name: "Folinic Acid",
//             asFound: "Challenge",
//             relevance: "HIGH",
//           },
//           { id: "T446", name: "Folic Acid", relevance: "LOW" },
//           { id: "T448", name: "Folate", relevance: "LOW" },
//           { id: "T475", name: "Vitamin B9", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "Micro", name: "Micronutrients" },
//           { abbrev: "All", name: "All Drugs and Chemicals" },
//           { abbrev: "ANeo", name: "Antineoplastic Agents" },
//           { abbrev: "Hemat", name: "Hematinics" },
//           { abbrev: "Vi", name: "Vitamins" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628297",
//         orgStudyIdInfo: { id: "PhD2024013-HF" },
//         secondaryIdInfos: [
//           {
//             id: "PhD2024013-HF",
//             type: "OTHER_GRANT",
//             domain: "Danish Cardiovascular Academy",
//           },
//         ],
//         organization: {
//           fullName: "University Hospital Bispebjerg and Frederiksberg",
//           class: "OTHER",
//         },
//         briefTitle:
//           "Comparison of Differencens in VO2-max, Perfusion of the Heart and Brain and Cognitive Performance Between Patients with Type 2 Diabetes and Healthy Age Matched Controls.",
//         officialTitle:
//           "Small Vessel Disease of the Brain and Heart a PET Perfusion Study of Training Effects",
//         acronym: "SVAT",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-11", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2027-01", type: "ESTIMATED" },
//         completionDateStruct: { date: "2027-12", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-09-30",
//         studyFirstSubmitQcDate: "2024-10-02",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-02",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: {
//           type: "PRINCIPAL_INVESTIGATOR",
//           investigatorFullName: "Thomas Ehlig Hjermind Justesen",
//           investigatorTitle: "Principal Investigator",
//           investigatorAffiliation:
//             "University Hospital Bispebjerg and Frederiksberg",
//         },
//         leadSponsor: {
//           name: "University Hospital Bispebjerg and Frederiksberg",
//           class: "OTHER",
//         },
//         collaborators: [
//           { name: "Danish Cardiovascular Academy", class: "UNKNOWN" },
//           { name: "Bispebjerg Hospital", class: "OTHER" },
//           { name: "The Dagmar Marshall Foundation", class: "OTHER" },
//           { name: "Steno Diabetes Center Copenhagen", class: "OTHER" },
//         ],
//       },
//       oversightModule: {
//         oversightHasDmc: true,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//         isUsExport: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "In the aging population, ischemic heart disease, stroke and dementia are increasingly prevalent. Diagnosis and treatment of the former two i.e., large-vessel coronary heart disease and endovascular thrombectomy of the brain in relation to stroke have improved significantly. Yet, the majority of elderly patients with ischemic heart disease do not have large-vessel heart disease and it seems that small vessel disease (SVD) may explain a large fraction of these cases as well as the cardiovascular morbidity in the elderly. Hence, the current development in diagnostics and treatments of ischemic heart disease does not address the most common subtype of ischemic disease seen in elderly patients.\n\nIt has been suggested that SVD is part of a multisystem disorder and several systematic reviews have addressed the hypothesis of a potential link between small vessel disease of the heart, brain, and kidneys. Cerebral SVD is prevalent in the aging population causing cognitive impairment, dementia, and an increased risk of stroke, and cerebral hypoperfusion is an acknowledged cause of vascular dementia and a possible cause of Alzheimer's disease. Further, cognitive impairment within multiple cognitive domains is highly prevalent in heart failure and is associated to an increased risk of dementia. The link between heart failure and dementia may be due to multisystem SVD, although a direct link between the two is possible.\n\nAmong other known risk factors such as age, hypertension, and female sex, diabetes is a major cause of SVD and is linked to coronary heart disease as well as cognitive impairment. The diagnosis of cerebral SVD relies on MRI detecting infarctions, haemorrhages, microbleeds and ischemic white matter changes, i.e. Fazekas score. In contrast, perfusion PET is used to image myocardial perfusion in patients with coronary SVD; and coronary SVD is recognized as a part of the pathophysiology in angina, coronary artery disease, and heart failure. Perfusion PET before and after adenosine-induced vasodilation allows for measuring, the myocardial flow reserve (MFR), i.e. perfusion capacity, which in the absence of regional perfusion defects, is a measure of coronary SVD. Prof. Eva Prescott have recently shown that reduced MFR obtained by 82Rb PET is a strong predictor of future microvascular events and all-cause mortality.\n\nExercise is well known to improve cognitive health but professor Carl-Johan Boraxbekk has shown that the effect on cognitive performance may be dependent on the initial cerebrovascular status, as patients with moderate to severe white matter changes did not improve after a 6 months physical activation intervention in contrast to patients with mild changes. Yet, it is possible to improve brain function in diabetic patients through either dietary or exercise interventions.\n\nSystemic SVD is measured as cerebral SVD (reduced brain perfusion during acetazolamide-induced vasodilation) and coronary SVD (reduced heart perfusion during adenosine-induced vasodilation). The researchers anticipate that patients with type 2 dabetes have reduced perfusion capacity of the brain and heart correlating to reduced cognition and cardiorespiratory fitness (VO2-max).",
//         detailedDescription:
//           "The goal of this clinical trial is to compare baseline measurements relevant to microvascular disease between patients with diabetes and increased risk of microvascular disease with healthy age-matched control.\n\nThe researchers wish to examine if small vessel disease is a disease that affects several organs at once in the same individuals by examining it in the brain and heart in the same participants. The researchers will also test if cardiorespiratory conditioning (VO2-max), blood perfusion to the heart and brain and cognitive performance are correlated in patients with microvascular disease.\n\nTo adress these aims the researchers have defined the following assumptions that they will refute or confirm through this study:\n\n* Patients with type 2 diabetes and increased risk of small vessel disease have significantly reduced perfusion capacity of the brain and heart compared to healthy controls as part of a multisystem disease\n* Perfusion capacity of the brain and heart, the cardiorespiratory fitness level of the subjects and cognitive performance are directly linked.\n\n  48 patients with diabetes and 24 healthy age-matched controls will undergo baseline testing that include:\n* Cardiopulmonal Exercise Test (CPET) to determine cardiopulmonal conditioning (VO2-max)\n* Isometric knee strength (if logistically possible)\n* Echocardiography\n* Blood perfusion capacity of the heart and brain via \\[15O\\]H2O-PET scans\n* Brain MRI to determine structural damages\n* Blood samples for basic health check (relevant to inclusion, exclusion and safety) and blood samples looking at endothelial and neurological damage for a biobank\n* Cognitive testing (SCIP-D and CANTAB)\n\nAfterwards the researchers will compare the results between the two groups and see if there is a correlation between VO2-max, blood perfusion to the heart and brain and cognitive performance.",
//       },
//       conditionsModule: {
//         conditions: [
//           "Microvascular Disease",
//           "Microvascular Complications",
//           "Dementia",
//           "Diabetes Mellitus Type 2",
//           "Cerebral Hypoperfusion",
//         ],
//         keywords: [
//           "microvascular disease",
//           "microvascular complications of the heart",
//           "microvascular complications of the brain",
//           "diabetes type 2",
//           "dementia",
//           "microvascular disease patophysiology",
//         ],
//       },
//       designModule: {
//         studyType: "OBSERVATIONAL",
//         patientRegistry: false,
//         designInfo: {
//           observationalModel: "CASE_CONTROL",
//           timePerspective: "CROSS_SECTIONAL",
//         },
//         bioSpec: {
//           retention: "SAMPLES_WITHOUT_DNA",
//           description:
//             "We will keep bllod samples in a Biobank. Currently, the relevant tests are not available yet. But once they are, we will use the blood samples to look at markers of neurological damage and inflammation and are associated with dementia.",
//         },
//         enrollmentInfo: { count: 72, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label:
//               "48 patients with type 2 diabetes and increased risk of microvascular disease",
//             description:
//               "Baseline measurements of:\n\n* \\[15O\\]H2O PET of heart and brain\n* Blood sampling\n* Echocardiography\n* Brain MRI\n* Cognitive tests\n* Cardiorespiratory fitness test\n* Muscular function test",
//             interventionNames: ["Diagnostic Test: PET"],
//           },
//           {
//             label: "24 healthy age-matched participants",
//             description:
//               "Baseline measurements of:\n\n* \\[15O\\]H2O PET of heart and brain\n* Blood sampling\n* Echocardiography\n* Brain MRI\n* Cognitive tests\n* Cardiorespiratory fitness test\n* Muscular function test",
//             interventionNames: ["Diagnostic Test: PET"],
//           },
//         ],
//         interventions: [
//           {
//             type: "DIAGNOSTIC_TEST",
//             name: "PET",
//             description:
//               "PET imaging will be performed with a Discovery 710 PET/CT scanner (GE Healthcare, Milwaukee, WI, USA). Four 5-minute PET recordings will be performed of each subject within a single scanning session of 70 min. Two consecutive 5-minute scans are conducted of the heart and brain in rest. \\[15O\\]H2O, is produced on-site (GENtrace, GE, Uppsala, Sweden), and 600 MBq \\[15O\\]H2O is intravenously injected by an automatic Hidex Radiowater Generator (Hidex, Turku, Finland). To induce heart vasodilation, adenosine is infused (140 g/kg/min) for 6 min and a scan of the heart is repeated. To induce brain vasodilation, 1 g of acetazolamide is infused over 5 min and 15 min later the brain is scanned. Myocardial perfusion is calculated using CarimasCE software version 1.3.1. (Turku, Finland). Cerebral perfusion is calculated using PMOD software (PMOD Technologies, Switzerland).",
//             armGroupLabels: [
//               "24 healthy age-matched participants",
//               "48 patients with type 2 diabetes and increased risk of microvascular disease",
//             ],
//             otherNames: ["MRI", "VO2-max", "cognitive testing"],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure:
//               "[15O]H2O PET assessment of the blood perfusion to the brain",
//             description:
//               "We will use the scan to determine our primary outcome: Blood perfusion to the brain. Radioactive water (\\[15O\\]H2O) will be used as a PET-tracer since it follows the blood and is the gold standard tracer for PET-based blood perfusion measurements. We measure the blood perfusion of both the brain as the perfusion capacity, meaning the difference between blood perfusion to the organ at rest and the maximally possible perfusion. In the brain we use injection of diamox to stimualte maximal dilation of the cerebral arteries which corresponds to the maximally possible perfusion of the brain.",
//             timeFrame: "From baseline testing to end of study, 6 months",
//           },
//           {
//             measure:
//               "[15O]H2O PET assessment of the blood perfusion of the heart",
//             description:
//               "We will use the scan to determine our primary outcome: Blood perfusion to the heart.\n\nRadioactive water (\\[15O\\]H2O) will be used as a PET-tracer since it follows the blood and is the gold standard tracer for PET-based blood perfusion measurements.\n\nWe measure the blood perfusion of both the heart as the perfusion capacity, meaning the difference between blood perfusion to the organ at rest and the maximally possible perfusion. In the heart we use injection of adenosin to stimualte maximal dilation of the coronary arteries which corresponds to the maximally possible perfusion of the heart.",
//             timeFrame: "From baseline testing to end of study, 6 months",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure: "Cognitive performance (CANTAB)",
//             description:
//               "Testing of a broad range of cognitive functions. The test is tablet based and one of the most \\&#34;investigator-independent\\&#34; cognitive tests available. The test takes around 45 minutes to perform.",
//             timeFrame: "From baseline testing to end of study, 6 months",
//           },
//           {
//             measure: "Cognitive Performance (SCIP-D)",
//             description:
//               "Assessed via SCIP-D in order to evaluate a broad range of cognitive areas in around 15-20 minutes. Both groups will undergo both tests. The primary investigator will receive learning in how to carry out the SCIP-D correctly.\n\nSCIP-D is a more clinically relevant test that can be used in a clinical setting to identify patients with cognitive dysfunction.",
//             timeFrame: "From baseline testing to end of study, 6 months",
//           },
//           {
//             measure: "Cardiorespiratory fitness (VO2-max)",
//             description:
//               "Will be assessed as the maximal or peak oxygen consumption (VO2-max or VO2-peak) during a cardiopulmonal exercise test (CPET).",
//             timeFrame: "From baseline testing to end of study, 6 months",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria for the patients with type 2 diabetes:\n\nDiabetes type II diagnose with one of the following:\n\n* Duration over 5 years\n* Moderate microalbuminuria\n* Non-proliferative diabetic retinopathy\n\n  * Speaks and understands Danish (required for reliable cognitive testing)\n  * Able to provide informed and written consent\n\nExclusion Criteria or the patients with type 2 diabetes:\n\nModerate to high intensity training \\&gt;1 times/week.\n\n* Previous AMI, atrial fibrillation, significant cardiac valve disease, HFrEF (LVEF \\&lt;45%), asthma.\n* Previous stroke or significant neurological disease including cognitive dysfunction.\n* Ongoing depression.\n* Hypothyroidism\n* Unable or unwilling to participate in training, e.g., due to injury, arthrosis or lung disease.\n\nInclusion Criteria for the healthy age-matched controls:\n\n* Age \\&gt; 60 years\n* No diagnosis of T2D according to WHO\\&#39;s criteria.\n* Speaks and understands Danish (required for reliable cognitive testing)\n* Able to provide informed and written consent\n\nExclusion Criteria for the healthy age-matched controls:\n\n* Moderate to high intensity training \\&gt;2 times/week.\n* Previous AMI, atrial fibrillation, significant cardiac valve disease, HFrEF (LVEF \\&lt;45%), asthma.\n* Previous stroke or significant neurological disease including cognitive dysfunction.\n* Ongoing depression.\n* Hypothyroidism\n* Unable or unwilling to participate in training, e.g., due to injury, arthrosis or lung disease.",
//         healthyVolunteers: true,
//         sex: "ALL",
//         minimumAge: "60 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//         studyPopulation:
//           "Patients with type 2 diabetes with increased risk of microvascular disease.",
//         samplingMethod: "NON_PROBABILITY_SAMPLE",
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Primary Investigator, Medical Doctor",
//             role: "CONTACT",
//             phone: "4551903442",
//             email: "thomasehlighjermindjustesen@regionh.dk",
//           },
//           {
//             name: "Lisbeth Marner, Ph.d.",
//             role: "CONTACT",
//             phone: "4591171938",
//             email: "lisbeth.marner@regionh.dk",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "Thomas EHJ Primary Investigator, Medical Doctor",
//             affiliation: "University Hospital Bispebjerg and Frederiksberg",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//         ],
//         locations: [
//           {
//             facility: "Bispebjerg and Frederiksberg Hospital",
//             city: "Copenhagen",
//             zip: "2400",
//             country: "Denmark",
//             contacts: [
//               {
//                 name: "Anita L. Chief Biomedical Laboratory Scientist, Bachelor&#39;s Degree",
//                 role: "CONTACT",
//                 phone: "+4521381056",
//                 email: "anita.larsen.01@regionh.dk",
//               },
//               {
//                 name: "Thomas J. Primary Investigator, Medical doctor",
//                 role: "CONTACT",
//                 phone: "+4551903442",
//                 email: "thomasehlighjermindjustesen@regionh.dk",
//               },
//               {
//                 name: "Thomas EHJ Medical Doctor, Medical Doctor",
//                 role: "CONTACT",
//               },
//             ],
//             geoPoint: { lat: 55.67594, lon: 12.56553 },
//           },
//         ],
//       },
//       ipdSharingStatementModule: {
//         ipdSharing: "NO",
//         description: "Have not gotten the necessary clearence",
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [
//           { id: "D000003704", term: "Dementia" },
//           { id: "D000003924", term: "Diabetes Mellitus, Type 2" },
//         ],
//         ancestors: [
//           { id: "D000003920", term: "Diabetes Mellitus" },
//           { id: "D000044882", term: "Glucose Metabolism Disorders" },
//           { id: "D000008659", term: "Metabolic Diseases" },
//           { id: "D000004700", term: "Endocrine System Diseases" },
//           { id: "D000001927", term: "Brain Diseases" },
//           { id: "D000002493", term: "Central Nervous System Diseases" },
//           { id: "D000009422", term: "Nervous System Diseases" },
//           { id: "D000019965", term: "Neurocognitive Disorders" },
//           { id: "D000001523", term: "Mental Disorders" },
//         ],
//         browseLeaves: [
//           {
//             id: "M6904",
//             name: "Dementia",
//             asFound: "Dementia",
//             relevance: "HIGH",
//           },
//           {
//             id: "M7119",
//             name: "Diabetes Mellitus, Type 2",
//             asFound: "Diabetes Mellitus Type 2",
//             relevance: "HIGH",
//           },
//           { id: "M7115", name: "Diabetes Mellitus", relevance: "LOW" },
//           { id: "M11639", name: "Metabolic Diseases", relevance: "LOW" },
//           {
//             id: "M25403",
//             name: "Glucose Metabolism Disorders",
//             relevance: "LOW",
//           },
//           { id: "M7862", name: "Endocrine System Diseases", relevance: "LOW" },
//           { id: "M5204", name: "Brain Diseases", relevance: "LOW" },
//           {
//             id: "M5742",
//             name: "Central Nervous System Diseases",
//             relevance: "LOW",
//           },
//           { id: "M21836", name: "Neurocognitive Disorders", relevance: "LOW" },
//           { id: "M4815", name: "Mental Disorders", relevance: "LOW" },
//           { id: "M14473", name: "Psychotic Disorders", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "BC10", name: "Nervous System Diseases" },
//           { abbrev: "BXM", name: "Behaviors and Mental Disorders" },
//           { abbrev: "All", name: "All Conditions" },
//           { abbrev: "BC18", name: "Nutritional and Metabolic Diseases" },
//           { abbrev: "BC19", name: "Gland and Hormone Related Diseases" },
//         ],
//       },
//       interventionBrowseModule: {
//         browseLeaves: [
//           { id: "M3595", name: "Adenosine", relevance: "LOW" },
//           { id: "M2536", name: "Acetazolamide", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "AnArAg", name: "Anti-Arrhythmia Agents" },
//           { abbrev: "VaDiAg", name: "Vasodilator Agents" },
//           { abbrev: "Analg", name: "Analgesics" },
//           { abbrev: "All", name: "All Drugs and Chemicals" },
//           { abbrev: "NaAg", name: "Natriuretic Agents" },
//           { abbrev: "AntiConv", name: "Anticonvulsants" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628284",
//         orgStudyIdInfo: { id: "IIS-23-DEX-001" },
//         organization: {
//           fullName: "TriCity Research Center",
//           class: "INDUSTRY",
//         },
//         briefTitle:
//           "CGM As Diagnostic Tool in Observing Steroid-Induced Hyperglycemia",
//         officialTitle:
//           "Dexcom CGM As Preventative Diagnostic Tool in Steroid-Induced Hyperglycemia During Interventional Pain Management Procedure",
//         acronym: "TRC-DX-1",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-04-17", type: "ACTUAL" },
//         primaryCompletionDateStruct: { date: "2025-03", type: "ESTIMATED" },
//         completionDateStruct: { date: "2025-05", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-09-29",
//         studyFirstSubmitQcDate: "2024-10-02",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-02",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: {
//           type: "SPONSOR_INVESTIGATOR",
//           investigatorFullName: "Mahesh Pattabiraman",
//           investigatorTitle: "Chief Executive",
//           investigatorAffiliation: "TriCity Research Center",
//         },
//         leadSponsor: { name: "Mahesh Pattabiraman", class: "INDUSTRY" },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: true,
//         isUsExport: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "This study is designed to help understand how certain steroid medications affect blood sugar levels in patients undergoing pain management treatments. Patients who receive steroid injections for conditions like back pain or arthritis experience temporary high blood sugar (called steroid-induced hyperglycemia, SIH), which can sometimes lead to complications, especially in patients with diabetes. This study aims to understand this by monitoring blood glucose levels using continuous glucose monitors (Dexcom G7). The main goal of this study is to track how steroid injections impact blood sugar levels in patients.",
//         detailedDescription:
//           "Steroid injections are frequently used in pain management for conditions such as arthritis, back pain, and joint inflammation. While effective at reducing pain and inflammation, these steroids can cause temporary spikes in blood sugar, known as steroid-induced hyperglycemia. This can be a concern, especially for patients with diabetes, as poorly managed high blood sugar can lead to serious complications. This study aims to explore the effects of three commonly used steroids: dexamethasone, methylprednisolone, and triamcinolone, each administered at different doses. Participants will be fitted with a Dexcom G7 continuous glucose monitor (CGM) on their arm, which will track their blood sugar levels every 5 minutes for up to 10 days.\n\nThe study's primary objective is to determine how often steroid-induced hyperglycemia occurs, how severe it is, and how long it lasts. Study will also investigate whether certain factors-such as the type of steroid, dosage, or the patient's underlying conditions-affect blood sugar responses. Additionally, the study will assess how the use of the CGM device may improve overall patient care, reduce the need for emergency interventions, and potentially lower healthcare costs by preventing complications.\n\nBy gathering high-resolution glucose data, this research will provide valuable insights into the best practices for managing blood sugar in patients receiving steroid injections. Our goal is to improve treatment strategies, particularly for diabetic patients, ensuring safer and more effective pain management.",
//       },
//       conditionsModule: { conditions: ["Diabetes", "Pain Management"] },
//       designModule: {
//         studyType: "OBSERVATIONAL",
//         patientRegistry: false,
//         designInfo: {
//           observationalModel: "CASE_ONLY",
//           timePerspective: "PROSPECTIVE",
//         },
//         enrollmentInfo: { count: 100, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label: "Test Group",
//             description:
//               "The study will be conducted as a single-arm trial consisting of participants enrolled in the test group. Each participant will receive a G7 CGM and their blood glucose levels will be continuously transmitted to the Dexcom Clarity cloud system for monitoring and data collection.",
//             interventionNames: ["Device: Dexcom G7"],
//           },
//         ],
//         interventions: [
//           {
//             type: "DEVICE",
//             name: "Dexcom G7",
//             description:
//               "The study will be conducted as a single-arm trial consisting of participants enrolled in the test group. Each participant will receive a G7 CGM and their blood glucose levels will be continuously transmitted to the Dexcom Clarity system for monitoring and data collection. As a observational study, the test group glucose levels will be monitored after receiving a steroid for pain management. The CGM profile of steroid-induced hyperglycemia in patients will be studied for the following corticosteroids: dexamethasone (10 mg), methylprednisolone (40 mg or 80 mg), triamcinolone (40 mg or 80 mg).",
//             armGroupLabels: ["Test Group"],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure: "Spike in blood glucose level (hyperglycemic phase)",
//             description:
//               "Hyperglycemic phase is determined based on clinically significant increase in percentage points above baseline",
//             timeFrame: "From baseline (day 0) to end of monitoring (day 10)",
//           },
//           {
//             measure: "Duration of hypo- or hyperglycemia",
//             description:
//               "minutes of blood glucose level in hypo-/hyperglycemic phase",
//             timeFrame: "From baseline (day 0) to end of monitoring (day 10)",
//           },
//           {
//             measure: "Drop in blood glucose levels (hypoglycemic phase)",
//             description:
//               "Hypoglycemic phase is determined based on clinically significant decrease in percentage points below baseline",
//             timeFrame: "From baseline (day 0) to end of monitoring (day 10)",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure: "Hospitalization rates",
//             description: "Electronic health record analysis",
//             timeFrame: "From baseline (day 0) to end of monitoring (day 10)",
//           },
//           {
//             measure: "Number of phone calls to study team",
//             description: "Analysis of electronic health records",
//             timeFrame: "From baseline (day 0) to end of monitoring (day 10)",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Adults aged 19-75 years\n* Patients meeting the medical criteria for need of interventional pain management procedure requiring corticosteroid administration.\n* Willing and able to use Dexcom\\&#39;s CGM device.\n* Willing to install Dexcom G7 app in their phone and register it for cloud data sharing\n* Able to understand and sign informed consent\n\nExclusion Criteria:\n\n* Pregnancy or lactation\n* Medically unmanaged diabetes\n* History of diabetic ketoacidosis (DKA) or hyperosmolar hyperglycemic state (HHS)\n* History of severe hypoglycemia\n* Active infection\n* History of a liver disorder (ALT \\&gt; threefold of the ULN)\n* History of any renal disease\n* Immune compromised patient\n* Active illegal drug user (self-reported)\n* Under any other steroid treatment\n* Any other medical condition or treatment that would make participation in the study unsafe or infeasible.",
//         healthyVolunteers: true,
//         sex: "ALL",
//         minimumAge: "19 Years",
//         maximumAge: "75 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//         studyPopulation:
//           "This study will enroll adult participants aged 19-75 years who are undergoing interventional pain management procedures requiring corticosteroid administration. Participants must be willing and able to use the Dexcom G7 Continuous Glucose Monitoring system and install the corresponding app on their smartphones. Eligible participants must meet the medical criteria for corticosteroid use in pain management, as determined by the principal investigator, and must provide informed consent prior to participation. Exclusion criteria include pregnancy, medically unmanaged diabetes, history of severe hypoglycemia or diabetic ketoacidosis, active infections, or any conditions that would make the study unsafe or infeasible as determined by the investigator",
//         samplingMethod: "NON_PROBABILITY_SAMPLE",
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Mahesh Pattabiraman, Ph.D",
//             role: "CONTACT",
//             phone: "3054956133",
//             email: "tricityresearch@gmail.com",
//           },
//           {
//             name: "Pravardhan Birthi, MD",
//             role: "CONTACT",
//             phone: "8592303021",
//             email: "pravardhanbirthi@gmail.com",
//           },
//         ],
//         locations: [
//           {
//             facility: "Grand Island Pain Relief Center",
//             status: "RECRUITING",
//             city: "Grand Island",
//             state: "Nebraska",
//             zip: "68803",
//             country: "United States",
//             contacts: [
//               {
//                 name: "Pravardhan Birthi, MD",
//                 role: "CONTACT",
//                 phone: "8592303021",
//                 email: "pravardhanbirthi@gmail.com",
//               },
//               { role: "CONTACT", email: "pravardhanbirthi@gmail.com" },
//               { name: "Pravardhan Birthi, MD", role: "CONTACT" },
//             ],
//             geoPoint: { lat: 40.92501, lon: -98.34201 },
//           },
//           {
//             facility: "Hastings Pain Relief Center",
//             status: "RECRUITING",
//             city: "Hastings",
//             state: "Nebraska",
//             zip: "68901",
//             country: "United States",
//             contacts: [
//               {
//                 name: "Pravardhan Birthi, MD",
//                 role: "CONTACT",
//                 phone: "8592303021",
//                 email: "pravardhanbirthi@gmail.com",
//               },
//               { role: "CONTACT", email: "pravardhanbirthi@gmail.com" },
//               { name: "Pravardhan Birthi, MD", role: "CONTACT" },
//             ],
//             geoPoint: { lat: 40.58612, lon: -98.38839 },
//           },
//         ],
//       },
//       ipdSharingStatementModule: {
//         ipdSharing: "UNDECIDED",
//         description:
//           "The research team is open to sharing individual participant data with qualified researchers who meet the appropriate criteria for data access. However, the team may decide against sharing due to concerns about the sensitive nature of the glucose monitoring data, the potential risks of re-identification even with anonymized datasets, and the need to protect patient confidentiality. Additionally, data governance and patient consent considerations may also influence the decision to withhold IPD sharing.",
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [{ id: "D000006943", term: "Hyperglycemia" }],
//         ancestors: [
//           { id: "D000044882", term: "Glucose Metabolism Disorders" },
//           { id: "D000008659", term: "Metabolic Diseases" },
//         ],
//         browseLeaves: [
//           {
//             id: "M9994",
//             name: "Hyperglycemia",
//             asFound: "Hyperglycemia",
//             relevance: "HIGH",
//           },
//           { id: "M7115", name: "Diabetes Mellitus", relevance: "LOW" },
//           { id: "M13066", name: "Pain", relevance: "LOW" },
//           { id: "M11639", name: "Metabolic Diseases", relevance: "LOW" },
//           {
//             id: "M25403",
//             name: "Glucose Metabolism Disorders",
//             relevance: "LOW",
//           },
//         ],
//         browseBranches: [
//           { abbrev: "BC18", name: "Nutritional and Metabolic Diseases" },
//           { abbrev: "All", name: "All Conditions" },
//           { abbrev: "BC19", name: "Gland and Hormone Related Diseases" },
//           { abbrev: "BC23", name: "Symptoms and General Pathology" },
//         ],
//       },
//       interventionBrowseModule: {
//         browseLeaves: [
//           { id: "M7102", name: "Dexamethasone", relevance: "LOW" },
//           { id: "M235549", name: "Dexamethasone acetate", relevance: "LOW" },
//           { id: "M16974", name: "Triamcinolone", relevance: "LOW" },
//           { id: "M14120", name: "Prednisolone", relevance: "LOW" },
//           { id: "M11749", name: "Methylprednisolone", relevance: "LOW" },
//           { id: "M1833", name: "Methylprednisolone Acetate", relevance: "LOW" },
//           {
//             id: "M11750",
//             name: "Methylprednisolone Hemisuccinate",
//             relevance: "LOW",
//           },
//           { id: "M229449", name: "Prednisolone acetate", relevance: "LOW" },
//           {
//             id: "M211887",
//             name: "Prednisolone hemisuccinate",
//             relevance: "LOW",
//           },
//           { id: "M248881", name: "Prednisolone phosphate", relevance: "LOW" },
//           { id: "M16975", name: "Triamcinolone Acetonide", relevance: "LOW" },
//           {
//             id: "M237966",
//             name: "Triamcinolone hexacetonide",
//             relevance: "LOW",
//           },
//           { id: "M209573", name: "Triamcinolone diacetate", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "Infl", name: "Anti-Inflammatory Agents" },
//           { abbrev: "ANeo", name: "Antineoplastic Agents" },
//           { abbrev: "AnEm", name: "Antiemetics" },
//           { abbrev: "Gast", name: "Gastrointestinal Agents" },
//           { abbrev: "All", name: "All Drugs and Chemicals" },
//           { abbrev: "NeuroAg", name: "Neuroprotective Agents" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628271",
//         orgStudyIdInfo: { id: "2023-03363-01" },
//         organization: { fullName: "Region Skane", class: "OTHER" },
//         briefTitle: "Breath-holding Spells and Its Management Study",
//         officialTitle:
//           "Breath-holding Spells and Its Management: a Prospective Study on Patient and Disease Characteristics, Evaluation of Novel Guidelines, Parental Handling, and Long-term Follow-up in Breath-holding Spells",
//         acronym: "BAM",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-09",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-11", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2030-11", type: "ESTIMATED" },
//         completionDateStruct: { date: "2030-11", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-09-16",
//         studyFirstSubmitQcDate: "2024-10-02",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-02",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: { type: "SPONSOR" },
//         leadSponsor: { name: "Region Skane", class: "OTHER" },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "The goal of this prospective population-based study is to evaluate the new disease description and management guidelines for breath-holding spells in children (Hellström Schmidt et al, Acta Paediatrica 2024) below the age of 5 years in southern Sweden. The main questions it aims to answer are:\n\n* Does the disease description and management guidelines lead to the expected reduction in diagnostic interventions and are the clinical managements guidelines safe to use?\n* If iron supplementation is given, does it reduce the frequency and severity of the spells?\n* What information and support does parents to children with breath-holding spells need?\n\nParticipants will undergo evaluation by a medical doctor and if typical breath-holding spells are diagnosed, be managed according to the new guidelines. If iron deficiency is found, iron supplementation is recommended. Digital surveys will be distributed and parents of patients with frequent spells will be eligible for participation in an interview sub-study.",
//         detailedDescription: "Please see the Study plan among the documents.",
//       },
//       conditionsModule: {
//         conditions: ["Breath-holding Spell"],
//         keywords: [
//           "disease definition",
//           "electrocardiography",
//           "iron deficiency anemia",
//           "long QT syndrome",
//           "parental support",
//         ],
//       },
//       designModule: {
//         studyType: "INTERVENTIONAL",
//         phases: ["NA"],
//         designInfo: {
//           allocation: "NON_RANDOMIZED",
//           interventionModel: "PARALLEL",
//           interventionModelDescription:
//             "Inclusion upon suspicion of Breath Holding Spell. Thereafter, allocation to either the group that has a defined typical Breath Holding spell, or the alternative (parallel) group that is not diagnosed with a typical Breath Holding Spell. Subsequent management of study subject in the Typical Breath Holding Spell group according to the management algorithm.",
//           primaryPurpose: "DIAGNOSTIC",
//           maskingInfo: { masking: "NONE" },
//         },
//         enrollmentInfo: { count: 120, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label: "Typical spells",
//             type: "OTHER",
//             description:
//               "Patients with typical spells should be investigated according to our guidelines",
//             interventionNames: ["Diagnostic Test: Guidelines"],
//           },
//           {
//             label: "Non-typical spells",
//             type: "NO_INTERVENTION",
//             description:
//               "Patients with non-typical spells will be investigated individually, as it is done today",
//           },
//         ],
//         interventions: [
//           {
//             type: "DIAGNOSTIC_TEST",
//             name: "Guidelines",
//             description:
//               "Participant with typical spells will be investigated according to our guidelines. These include that participants with heredity for or signs and symptoms of cardiac disease will be subjected to an ECG and participants with two or more spells should be subjected to blood tests for anemia and iron deficiency",
//             armGroupLabels: ["Typical spells"],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure: "Safety of the guidelines",
//             description:
//               "The number of wrongful and missed diagnoses (definition: managed and diagnosed as breath-holding spells at physician assessment within study but later found to be another cause for the symptoms, like long QT syndrome or epilepsy).",
//             timeFrame:
//               "From date of inclusion to end of follow up at 36 months",
//           },
//           {
//             measure: "Usability of the guidelines",
//             description:
//               "Assessed according to the following:\n\n* Number of patients with a diagnostic interventions for each intervention in the guidelines: ECGs and bloodtests.\n* Number of found pathologies for each intervention (blood tests and ECGs) - for patients with typical spells handled according to the guidelines and those with non-typical spells managed individually. This includes a retrospective assessment of ECG (a complete assessment including rythm, long QT syndrome, AV-block, ST-segment changes) and blood test results (for anemia and iron deficiency; i.e. values outside of the age adapted normal range).\n* Retrospective analysis of the clinical doctors compliance with managment guidelines, evaluated through the number of interventions for each patient that were not recommended in the guidlines (for instance number of EEGs).",
//             timeFrame:
//               "From date of inclusion until last diagnostic intervention, expected to be within 2 weeks from inclusion.",
//           },
//           {
//             measure: "Usability of the disease definition",
//             description:
//               "Assessed according to the following:\n\n* Adherence to the the prespecified definition of typical spells through comparison of clinical physicians assessment and a retrospective assessment by study physician, i.e. the number of cases with a discrepant judgment of the clinical presentation.\n* The number of typical spells compared to the number of non-typical spells and other diagnsoses.\n* Compilation of patient and spell characteristics (defined in the variable list in the attached documents) and comparison with the current definition of typical spells.",
//             timeFrame:
//               "From the inclusion date until end of physicians assessment",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure: "Need of information and support to parents",
//             description:
//               "Through interview study (qualitative study) gather information on given information and support and their need for more information and support. Will be conducted on parents of children with more than 5 spells in total at the 6 month follow up (assessed as frequent spells).",
//             timeFrame:
//               "From 6 months after inclusion until interview is performed (expected to be within three months of six month digital survey)",
//           },
//           {
//             measure:
//               "Effect of iron supplement treatment on spell frequency and severity",
//             description:
//               "In cases of iron treatment (initiated by the clinical physician). Assessed according to the following:\n\n* Comparison of spell frequency (number of spells/time unit) before start of treatment, during treatment and after completion of treament.\n* Comparison of spell severity (simple or severe spells defined as spells without and with loss of consciousness) before start of treatment, during treatment and after completion of treament.\n* Anemia and iron deficiency blood test values (Hb, MCV, reticulocytes, ferritin, CRP if signs of infection, iron, iron saturation and transferrin) comparison between patients with effect of iron treatment on spell frequency and severity, versus the group without a clinical effect of iron treatment.\n* Patient compliance for iron supplementation as per survey question with answer altneratives yes/no/don't know",
//             timeFrame:
//               "From the date of inclusion until evaluation of iron treatment, most probably within 12 months from inclusion.",
//           },
//         ],
//         otherOutcomes: [
//           {
//             measure: "Natural course of the spells through long term follow-up",
//             description:
//               "Assessed according to the following parameters, through digital surveys:\n\n* Spells during the last 3 months (yes or no)\n* Number of spells the previous month (0, 1, 2-5, 6-10, \\>10)\n* Total number of spells (free text)\n* Uncontactable or unconscious (=severity of spells) (Yes, No, Don't know)\n* Alterations in spell semiology? (Yes, No, Don't know)",
//             timeFrame: "36 months",
//           },
//           {
//             measure: "Contact with health care during long term follow-up",
//             description:
//               "Evaluation of the following questions:\n\n1. Do parents follow the advice to reach out to health care if the spell semiology change?\n2. Planned follow up?\n\nAbove questions are assessed in a digital survey:\n\n- Further contact with healthcare. Answer alternatives: (Yes, No, Don't know). If yes: (acute or planned)",
//             timeFrame: "36 months",
//           },
//           {
//             measure: "Burden of care",
//             description:
//               "Will be assessed through a combined evaluation of the following variables:\n\n* Number of acute health care visits\n* Number of planned health care visits including follow-up appointments over phone\n* Number of over-night hospital stays (number of nights)\n* Number of ambulance rides to the hospital",
//             timeFrame: "36 months",
//           },
//           {
//             measure: "Dietary impact on iron status",
//             description:
//               "At first visit, parents will answer questions on the child and family's diet in a questionnaire, to evaluate a possible association between diet and iron status (and further, to breath-holding spell frequency and severity).\n\nThe questions are as follows:\n\n* Mark all alternatives that is correct about your childs diet: (breatmilk/formula/cow's milk/taste portions/family meals)\n* Does your child drink more than 3 dl of cow's milk per day? (yes/no)\n\n  \\> If yes, estimate the amount of cow's milk your child drink during a day in dl: (a number in free text)\n* Do you eat vegetarian or vegan food only? (yes/no)",
//             timeFrame:
//               "From inclusion to blood test results, within 2 weeks from initial visit",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Below 5 years of age\n* resident in Region Skåne (Sweden)\n* suspected breath-holding spell\n\nExclusion Criteria:\n\n* previous investigation for breath-holding spell (previous spells are not a reason for exclusion)",
//         healthyVolunteers: false,
//         sex: "ALL",
//         minimumAge: "0 Months",
//         maximumAge: "60 Months",
//         stdAges: ["CHILD"],
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Sanna Hellström Schmidt, MD",
//             role: "CONTACT",
//             phone: "+4646177203",
//             email: "sanna.hellstrom_schmidt@med.lu.se",
//           },
//           {
//             name: "Cornelis J Pronk, MD, PhD",
//             role: "CONTACT",
//             email: "kees-jan.pronk@med.lu.se",
//           },
//         ],
//       },
//       referencesModule: {
//         references: [
//           {
//             pmid: "37905418",
//             type: "BACKGROUND",
//             citation:
//               "Hellstrom Schmidt S, Smedenmark J, Jeremiasen I, Sigurdsson B, Eklund EA, Pronk CJ. Overuse of EEG and ECG in children with breath-holding spells and its implication for the management of the spells. Acta Paediatr. 2024 Feb;113(2):317-326. doi: 10.1111/apa.17020. Epub 2023 Oct 31.",
//           },
//           {
//             pmid: "27060698",
//             type: "BACKGROUND",
//             citation:
//               "Hellstrom Schmidt S, Tedgard U, Pronk CJ. Breath-holding spells occur disproportionately more often in children with transient erythroblastopenia. Acta Paediatr. 2016 Sep;105(9):1088-93. doi: 10.1111/apa.13428. Epub 2016 Apr 29.",
//           },
//         ],
//       },
//       ipdSharingStatementModule: {
//         ipdSharing: "UNDECIDED",
//         description:
//           "Data will be share as far as the Swedish law (concerning patient confidentiality) and ethical considerations allows. Decisions will be made from case to case depending on what data are inquired for.",
//       },
//     },
//     documentSection: {
//       largeDocumentModule: {
//         largeDocs: [
//           {
//             typeAbbrev: "Prot",
//             hasProtocol: true,
//             hasSap: false,
//             hasIcf: false,
//             label: "Study Protocol",
//             date: "2024-10-02",
//             uploadDate: "2024-10-02T03:03",
//             filename: "Prot_000.pdf",
//             size: 433868,
//           },
//           {
//             typeAbbrev: "SAP",
//             hasProtocol: false,
//             hasSap: true,
//             hasIcf: false,
//             label: "Statistical Analysis Plan",
//             date: "2024-09-16",
//             uploadDate: "2024-09-16T06:10",
//             filename: "SAP_001.pdf",
//             size: 521564,
//           },
//         ],
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         browseLeaves: [
//           { id: "M16355", name: "Syndrome", relevance: "LOW" },
//           { id: "M4070", name: "Anemia", relevance: "LOW" },
//           { id: "M20857", name: "Anemia, Iron-Deficiency", relevance: "LOW" },
//           { id: "M2781", name: "Iron Deficiencies", relevance: "LOW" },
//           { id: "M11133", name: "Long QT Syndrome", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "BC23", name: "Symptoms and General Pathology" },
//           { abbrev: "All", name: "All Conditions" },
//           { abbrev: "BC15", name: "Blood and Lymph Conditions" },
//           { abbrev: "BC18", name: "Nutritional and Metabolic Diseases" },
//           { abbrev: "BC14", name: "Heart and Blood Diseases" },
//           {
//             abbrev: "BC16",
//             name: "Diseases and Abnormalities at or Before Birth",
//           },
//         ],
//       },
//       interventionBrowseModule: {
//         browseLeaves: [{ id: "M10533", name: "Iron", relevance: "LOW" }],
//         browseBranches: [
//           { abbrev: "Micro", name: "Micronutrients" },
//           { abbrev: "All", name: "All Drugs and Chemicals" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628258",
//         orgStudyIdInfo: { id: "NB240043-GL" },
//         organization: {
//           fullName: "NovoBliss Research Pvt Ltd",
//           class: "OTHER",
//         },
//         briefTitle:
//           'A Clinical Study to Assess the Safety and Effectiveness of Test Product "Moiz Cleansing Lotion" in Healthy Adult Human Subjects With Varied Skin Types. (Dry, Oily, Sensitive, Mixed, Normal)',
//         officialTitle:
//           'An Exploratory, Prospective, Open-Label, Interventional, Safety In-Use, Tolerability and Efficacy Study of Test Product "Moiz Cleansing Lotion" in Healthy Human Subjects.',
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-09-30", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2024-11-30", type: "ESTIMATED" },
//         completionDateStruct: { date: "2024-11-30", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-09-14",
//         studyFirstSubmitQcDate: "2024-10-02",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-02",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: { type: "SPONSOR" },
//         leadSponsor: { name: "NovoBliss Research Pvt Ltd", class: "OTHER" },
//         collaborators: [
//           { name: "Glowderma Lab Private Limited", class: "UNKNOWN" },
//         ],
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           'This is an exploratory, prospective, open-label, interventional, safety in-use, tolerability and efficacy study of the test product "Moiz Cleansing Lotion" in healthy human subjects.',
//         detailedDescription:
//           "27 subjects with different skin type (dry/ oily/ sensitive/ mixed/) of either gender aged between 18 to 65 years old (both inclusive) at time consent will be enrolled to complete 25 subjects/test product in the study.\n\nThe potential subjects will be screened as per the inclusion \\& exclusion criteria only after obtaining written informed consent from the subjects. Subjects will be pre-screened by the screening department of NovoBliss Research. Subjects will be called telephonically by the recruiting department prior to the enrolment visit. Subjects will be told during screening (prior to enrolment) not to wear any facial make-up on the study visit day. The adult female subjects will be instructed to visit the facility as per the below visits-\n\n* Visit 01 (Day 01): Screening, Enrolment, Baseline Evaluation, On Site Product Usage, Post Usage Evaluation.\n* Visit 02 (Day 15 +2 Days): Product Usage Period, Evaluations\n* Visit 03 (Day 30 +2 Days): Evaluations, End of Study",
//       },
//       conditionsModule: {
//         conditions: ["Dry, Oily, Normal, Sensitive, Mixed Skin Type"],
//       },
//       designModule: {
//         studyType: "INTERVENTIONAL",
//         phases: ["NA"],
//         designInfo: {
//           allocation: "NA",
//           interventionModel: "SINGLE_GROUP",
//           primaryPurpose: "OTHER",
//           maskingInfo: { masking: "NONE" },
//         },
//         enrollmentInfo: { count: 27, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label: "Dry, sensitive, oily, mixed, normal skin type",
//             type: "EXPERIMENTAL",
//             description:
//               "Test Product Name: Moiz Cleansing Lotion Product By: Glowderma Lab Private Limited Mode of Usage: Apply 5-10 ml of Moiz Cleansing Lotion to wet skin. Massage gently for 1-2 minutes, then rinse and pat dry.\n\nFrequency: Twice a Day Route of Administration: Topical.",
//             interventionNames: ["Other: Moiz Cleansing Lotion"],
//           },
//         ],
//         interventions: [
//           {
//             type: "OTHER",
//             name: "Moiz Cleansing Lotion",
//             description:
//               "Mode of Usage: Apply 5-10 ml of Moiz Cleansing Lotion to wet skin. Massage gently for 1-2 minutes, then rinse and pat dry.\n\nFrequency: Twice a Day Route of Administration: Topical.",
//             armGroupLabels: ["Dry, sensitive, oily, mixed, normal skin type"],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure: "change in L*, a*, b* value by using Skin Colorimeter",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in L\\*, a\\*, b\\*",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in skin impurities using Visiopor® PP34N",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in skin impurities",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//         ],
//         secondaryOutcomes: [
//           {
//             measure: "change in skin hydration using Corneometer CM 825",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in skin hydration",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in skin barrier function using TEWAMeter",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in skin barrier function",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure:
//               "change in overall dry skin score by dermatological evaluations",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in overall dry skin score where, 0: means absent and 4 means: Dominated by large scales, advanced roughness, redness present, eczematous changes and cracks",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in PGA score by dermatological evaluations",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in PGA score where 0 means: No appearance and 8 means: Severe",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in product perception questionnaire",
//             description:
//               "6. To evaluate the effectiveness of the test product in terms of change in product perception questionnaire where 0 means: Dislike extremely and 9 means liked extremly",
//             timeFrame:
//               "before usage of the test product on Day 01 and after usage of the test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in visual and tactile assessment of scaliness",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in scaliness where 0 means: Absent and 4 means: Extreme",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in visual and tactile assessment of roughness",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in roughness where 0 means: Absent and 4 means: Extreme",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in visual and tactile assessment of redness",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in redness where 0 means: Absent and 4 means: Extreme",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in visual and tactile assessment of itchiness",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in itchiness where 0 means: None and 4 means: Severe",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in visual and tactile assessment of dryness",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in dryness where 0 means: No Skin Dryness and 4 means: Extreme Xerosis",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in visual and tactile assessment of smoothness",
//             description:
//               "To evaluate the effectiveness of the test product in terms of change in smoothness where 0 means: Very rough and 4 means: Very smooth",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in skin irritation",
//             description:
//               "Safety of test product will be evaluated in terms of change in skin irritation by dermatological assessment",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in dryness",
//             description:
//               "Safety of test product will be evaluated in terms of change in dryness by dermatological assessment",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in breakouts",
//             description:
//               "Safety of test product will be evaluated in terms of change in breakouts by dermatological assessment",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//           {
//             measure: "change in allergic reactions",
//             description:
//               "Safety of test product will be evaluated in terms of change in allergical reactions by dermatological assessment",
//             timeFrame:
//               "before usage of test product on Day 01 and after usage of test product at T20 mins on Day 01, Day 15 and Day 30.",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* 1) Age: 18 to 65 years (both inclusive) at the time of consent. 2) Sex: Healthy male and non-pregnant/non-lactating females (Preferably equal).\n\n  3) Females of childbearing potential must have a self-reported negative pregnancy test.\n\n  4) Subject are generally in good health. 5) Subject with dry, oily, mixed, sensitive and normal skin at a time of screening. (Dermatological Assessment) 6) Subjects forearm must be free of cuts, tattoos, scratches, abrasions, scars, uneven skin tone, sunburn, excessive tan, excessive hair or open wounds on or near the test sites 7) Subject is able to remain on stable doses of contraceptive or replacement hormonal therapy, including no therapy, 6 weeks prior to and for the duration of the study.\n\n  8) If the subject is of childbearing potential, is practicing and agrees to maintain an established method of birth control (IUD, hormonal implant device/injection, regular use of birth control pills or patch, diaphragm, condoms with spermicide or sponge with spermicidal jelly, cream or foam, partner vasectomy or abstinence). Females will be considered as non-childbearing potential if they are surgically sterile, have been post-menopausal for at least 1 year or have had a tubal ligation.\n\n  9) Subjects are willing to give written informed consent and are willing to come for regular follow up.\n\n  10) Subjects who commit not to use medicated skincare products other than the test product for the entire duration of the study.\n\n  11) Subject who have not participated in a similar investigation in the past three months.\n\n  12) Willing to use test product throughout the study period.\n\nExclusion Criteria:\n\n* 1) History of any dermatological condition of the skin diseases. 2) Subject with present condition of allergic response to any cosmetic product. 3) Subject having allergic response to the ink. 4) Subjects under chronic medication (e.g. aspirin-based products, anti-inflammatories, anti-histamines, corticotherapy etc.) that might influence the outcome of the study.\n\n  5) Subject having acne of severe incidence (presence of nodules, cysts or numerous pustules) which requires pharmaceutical or cosmeceuticals, herbal product.\n\n  6) Subjects who have applied topical product for at least 4 weeks and any systemic product for at least 3 months, before they participated in the study.\n\n  7) History of alcohol or drug addiction. 8) Subjects using other marketed products during the study period. 9) Any other condition which could warrant exclusion from the study, as per the dermatologist's/investigator's discretion.\n\n  10) Pregnant or breastfeeding or planning to become pregnant during the study period.\n\n  11) History of chronic illness which may influence the cutaneous state. 12) Subjects participating in other similar cosmetics, devices or therapeutic trials or skincare products within the last four weeks.",
//         healthyVolunteers: true,
//         sex: "ALL",
//         minimumAge: "18 Years",
//         maximumAge: "65 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Maheshvari N Patel",
//             role: "CONTACT",
//             phone: "09909013236",
//             email: "maheshvari@novobliss.in",
//           },
//           {
//             name: "Sheetal J Khandwala",
//             role: "CONTACT",
//             email: "bd@novobliss.in",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "Dr. Nayan K Patel",
//             affiliation: "NovoBliss Research Pvt Ltd",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//         ],
//       },
//       ipdSharingStatementModule: { ipdSharing: "NO" },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [{ id: "D000006967", term: "Hypersensitivity" }],
//         ancestors: [{ id: "D000007154", term: "Immune System Diseases" }],
//         browseLeaves: [
//           {
//             id: "M10018",
//             name: "Hypersensitivity",
//             asFound: "Sensitive",
//             relevance: "HIGH",
//           },
//           { id: "M10200", name: "Immune System Diseases", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "BC20", name: "Immune System Diseases" },
//           { abbrev: "All", name: "All Conditions" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628245",
//         orgStudyIdInfo: { id: "30.09.2024/DFT" },
//         organization: {
//           fullName: "Alanya Alaaddin Keykubat University",
//           class: "OTHER",
//         },
//         briefTitle: "The Dubousset Functional Test in Lumbar Spinal Stenosis",
//         officialTitle:
//           "Validity and Reliability of Dubousset Functional Test in Lumbar Spinal Stenosis",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-10",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-12", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2025-06", type: "ESTIMATED" },
//         completionDateStruct: { date: "2025-07", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-10-03",
//         studyFirstSubmitQcDate: "2024-10-03",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-03",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: {
//           type: "PRINCIPAL_INVESTIGATOR",
//           investigatorFullName: "Ayse Unal",
//           investigatorTitle: "Associate Professor",
//           investigatorAffiliation: "Alanya Alaaddin Keykubat University",
//         },
//         leadSponsor: {
//           name: "Alanya Alaaddin Keykubat University",
//           class: "OTHER",
//         },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "The aim of this study is to investigate the validity and reliability of Dubousset Functional Test in the patients with lumbar spinal stenosis.",
//       },
//       conditionsModule: {
//         conditions: ["Lumbar Spinal Stenosis"],
//         keywords: [
//           "Lumbar Spinal Stenosis",
//           "Functional Status",
//           "Dubousset Functional Test",
//           "Reliability",
//           "Validity",
//         ],
//       },
//       designModule: {
//         studyType: "OBSERVATIONAL",
//         patientRegistry: false,
//         designInfo: {
//           observationalModel: "OTHER",
//           timePerspective: "PROSPECTIVE",
//         },
//         enrollmentInfo: { count: 60, type: "ESTIMATED" },
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure: "Dubousset Functional Test",
//             description:
//               "The four test components included the Up and Walking Test (unassisted sit-to-stand from a chair, walk forward/backward 5 meters \\[no turn\\], then unassisted stand-to-sit), Steps Test (ascend three steps, turn, descend three steps), Down and Sitting Test (stand-to-ground, followed by ground-to-stand, with assistance as needed), and Dual-Tasking Test (walk 5 meters forwards and back while counting down from 50 by 2).",
//             timeFrame: "10 minutes",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Patients aged 18-65 years, diagnosed with chronic pain (more than three months) due to lumbar spinal stenosis.\n\nExclusion Criteria:\n\n* Those with fractures, pregnancy, a disease that would prevent physical exertion, those with a body mass index (BMI) of 40 kg/m2 and above, and those with major musculoskeletal or neurological disorders that cause gait disturbance will be excluded from the study.",
//         healthyVolunteers: false,
//         sex: "ALL",
//         minimumAge: "18 Years",
//         maximumAge: "65 Years",
//         stdAges: ["ADULT", "OLDER_ADULT"],
//         studyPopulation: "Sixty patients with lumbar spinal stenosis.",
//         samplingMethod: "NON_PROBABILITY_SAMPLE",
//       },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [
//           { id: "D000013130", term: "Spinal Stenosis" },
//           { id: "D000003251", term: "Constriction, Pathologic" },
//         ],
//         ancestors: [
//           { id: "D000020763", term: "Pathological Conditions, Anatomical" },
//           { id: "D000013122", term: "Spinal Diseases" },
//           { id: "D000001847", term: "Bone Diseases" },
//           { id: "D000009140", term: "Musculoskeletal Diseases" },
//         ],
//         browseLeaves: [
//           {
//             id: "M15927",
//             name: "Spinal Stenosis",
//             asFound: "Spinal Stenosis",
//             relevance: "HIGH",
//           },
//           {
//             id: "M6475",
//             name: "Constriction, Pathologic",
//             asFound: "Stenosis",
//             relevance: "HIGH",
//           },
//           {
//             id: "M22519",
//             name: "Pathological Conditions, Anatomical",
//             relevance: "LOW",
//           },
//           { id: "M15919", name: "Spinal Diseases", relevance: "LOW" },
//           { id: "M5126", name: "Bone Diseases", relevance: "LOW" },
//           { id: "M12097", name: "Musculoskeletal Diseases", relevance: "LOW" },
//         ],
//         browseBranches: [
//           { abbrev: "BC05", name: "Musculoskeletal Diseases" },
//           { abbrev: "All", name: "All Conditions" },
//           { abbrev: "BC23", name: "Symptoms and General Pathology" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
//   {
//     protocolSection: {
//       identificationModule: {
//         nctId: "NCT06628232",
//         orgStudyIdInfo: { id: "TNKU-Z.BALKAN-2" },
//         organization: { fullName: "Namik Kemal University", class: "OTHER" },
//         briefTitle:
//           "Effect of Nursing Interventions on Pain and Salivary Cortisol Levels During Heel Stick in Preterm Newborns",
//         officialTitle:
//           "The Effect of Giving a Pacifier Dipped in Breast Milk, Heel Warming, and Applying Both Together on Pain and Salivary Cortisol Levels During Heel Stick in Preterm Newborns: Randomized Controlled Study.",
//       },
//       statusModule: {
//         statusVerifiedDate: "2024-09",
//         overallStatus: "NOT_YET_RECRUITING",
//         expandedAccessInfo: { hasExpandedAccess: false },
//         startDateStruct: { date: "2024-11-01", type: "ESTIMATED" },
//         primaryCompletionDateStruct: { date: "2025-08-01", type: "ESTIMATED" },
//         completionDateStruct: { date: "2025-11-01", type: "ESTIMATED" },
//         studyFirstSubmitDate: "2024-09-29",
//         studyFirstSubmitQcDate: "2024-10-02",
//         studyFirstPostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//         lastUpdateSubmitDate: "2024-10-02",
//         lastUpdatePostDateStruct: { date: "2024-10-04", type: "ESTIMATED" },
//       },
//       sponsorCollaboratorsModule: {
//         responsibleParty: {
//           type: "PRINCIPAL_INVESTIGATOR",
//           investigatorFullName: "Zeynem YILDIRIM BALKAN",
//           investigatorTitle: "Assistant Professor and Principal Investigator",
//           investigatorAffiliation: "Namik Kemal University",
//         },
//         leadSponsor: { name: "Namik Kemal University", class: "OTHER" },
//       },
//       oversightModule: {
//         oversightHasDmc: false,
//         isFdaRegulatedDrug: false,
//         isFdaRegulatedDevice: false,
//       },
//       descriptionModule: {
//         briefSummary:
//           "Babies born before the thirty-seventh gestational week are called preterm or premature. Most preterm newborns require Neonatal Intensive Care Unit (NICU) care depending on their gestational age and clinical condition. Although many painful invasive procedures are usually performed on newborns in the NICU, the most common procedure is heel prick. Heel prick is a painful and stressful procedure for the newborn. Neonates do not respond to pain verbally; they respond physiologically, behaviorally and hormonally. Physiologic responses of preterm infants to pain include increased heart and respiratory rate, increased blood pressure and intracranial pressure, decreased oxygenation, and sweating of palms. Among the hormonal symptoms caused by stress in newborns, the most commonly used biochemical method is the measurement of cortisol level. It is reported that there is a significant correlation between salivary and plasma cortisol levels and salivary cortisol level reflects plasma cortisol level. This method is particularly preferred because saliva sampling is much less stressful.",
//         detailedDescription:
//           'Health professionals should be able to evaluate pain, reduce or eliminate pain in pain management of neonates in interventional applications. Pharmacologic and nonpharmacologic methods are used in pain management. When these methods are applied together, their effectiveness increases in pain related to invasive interventions. Pharmacologically, opioid analgesics, sedatives and local anesthetics are used. Nonpharmacologic methods include breastfeeding, pacifier, oral sucrose, music, warm application, massage, therapeutic touch and positioning such as nesting, fetal positioning, swaddling, kangaroo care, rocking and holding.\n\nIn many studies, nonpharmacologic interventions have been applied and compared to reduce pain during heel prick in preterm newborns. In the routine of the clinic, heel prick blood collection from preterm newborns is performed by hugging the mother in her lap. The swaddling procedure for preterm newborns in the control group is recommended by the American Academy of Pediatrics. The swaddling method supports flexion and lateral posture, which is the developmental position of the newborn. With this position, the newborn comes to its position in the uterus, which is familiar to it, ensuring its physiological stability and improving its capacity. In a systematic review of 3396 participants, preterm newborns were calmed and immediately stabilized by kangaroo care, non-nutritive sucking and swaddling methods. Since these methods reduce pain and stress in preterm newborns, they are also reported to be included in "Individualized Supportive Developmental Care" practices.\n\nMany studies have shown that giving pacifiers to newborns is effective in reducing pain. In addition, oral administration of breast milk alone, without breastfeeding, has been found to reduce pain during heel prick, nasopharyngeal aspiration, venipuncture and retinopathy examination in preterms. In the study conducted by Lan et al., breast milk was sniffed to the newborn during heel prick blood collection or tasted by dropping into the newborns mouth with a syringe. As a result, they reported that sniffing and plus tasting breast milk was effective in alleviating pain in newborns.\n\nIn the literature, it is emphasized that the pain that occurs during heel blood collection is closely related to the squeezing of the heel to collect blood, not during the needle insertion into the heel, and it is thought that keeping the newborn in an upright position during heel blood collection may facilitate blood flow through gravity and reduce the amount of squeezing required to obtain the sample. However, there are studies showing that heel warming is effective in reducing pain in newborns. It has been stated that with warm application to the heel -with the effect of vasodilation- fewer needling is performed in the heel, the amount of blood required for the procedure increases and the procedure is completed in a shorter time. It is predicted that the heel of the newborn will be squeezed less thanks to the warm application.\n\nHowever, there is a very limited number of studies evaluating the effectiveness of different nonpharmacologic interventions during heel prick blood collection and measuring the stress marker cortisol. In addition, no study was found to investigate the effectiveness of other interventions (heel warming and giving a pacifier dipped in breast milk) in combination with wrapping among nonpharmacological interventions.\n\nThis study aimed to reduce pain during heel prick blood collection in preterm newborns by swaddling the baby in the mothers lap (control group), swaddling in the mothers lap together with giving a pacifier dipped in breast milk (pacifier with breast milk group), swaddling in the mother;s lap together with local dry heat application (heel heating group), and all interventions combined (swaddling in the mother;s lap together with giving a pacifier dipped in breast milk and heel heating-combined intervention group). In addition, it was planned as a randomized controlled experimental design to determine and compare the effects of these nursing interventions on the newborns physiological parameters, pain, salivary cortisol level, crying and procedure time.\n\nPlace and Time to Conduct the Research:\n\nThe research will be carried out between November 2024 and August 2025 in the Neonatal Intensive Care Unit of Tekirdag Namik Kemal University Hospital.\n\nPopulation and Sample of the Study:\n\nThe study population will consist of infants who meet the inclusion criteria in the NICU of Tekirdağ Namik Kemal University between 01.11.2024-01.08.2025.\n\nThe sample size of the study was determined by power analysis. The study comparing non-nutritive suction, sucrose and combination interventions in heel prick blood collection in newborns with the control group was taken as a basis. According to the PIPP pain assessment scale used in the study, the 1st experimental group had a mean score of 9.3 ± 1.3, the 2nd experimental group 10.1 ± 2, the 3rd group 4.4 ± 1.5, and the control group 13.3 ± 1.6. In this study, it was determined that a total of 88 infants (22 in each group) should be included in the study in the sample number calculation made in the G\\*Power (3.1.9.2.) program with a 5% alpha margin of error (two-way) and 80% power, predicting that the PIPP score mean difference would have a large effect size (.95 large effect) (the effect size was found to be 2.74).\n\nRandomization:\n\nThe sample will be randomly selected from the study population. In the study, randomization of premature newborns will be performed in a computer environment. The newborns to be subjected to heel prick blood collection were placed in groups with a randomized controlled method with 18 babies in each group. In the study, randomization was performed by entering the number of cases through the program whose URL address is http://www.randomizer.org.\n\nControl (swaddling from mothers lap) 76, 41, 70, 15, 43, 38, 63, 2, 28, 55, 30, 35, 86, 61, 57, 84, 80, 74, 3, 24, 83, 71 Experiment 2 (swaddling from mothers lap + pacifier) 18, 79, 23, 19, 48, 47, 2, 61, 10, 73, 35, 74, 87, 38, 32, 5, 11, 12, 49, 80, 44, 55 Experiment 3 (swaddling from mothers lap + heel warming) 25, 17, 50, 7, 64, 35, 45, 11, 48, 82, 73, 23, 32, 54, 49, 74, 79, 3, 68, 56, 24, 81 Experiment 4 (swaddling from mothers lap + pacifier + heel warming) 57, 33, 21, 64, 13, 47, 56, 31, 41, 28, 43, 85, 20, 1, 75, 52, 11, 14, 3, 6, 38, 15',
//       },
//       conditionsModule: {
//         conditions: ["PreTerm Neonate"],
//         keywords: [
//           "preterm",
//           "leel prick",
//           "pain",
//           "salivary cortisol",
//           "nursing care",
//         ],
//       },
//       designModule: {
//         studyType: "INTERVENTIONAL",
//         phases: ["NA"],
//         designInfo: {
//           allocation: "RANDOMIZED",
//           interventionModel: "PARALLEL",
//           interventionModelDescription:
//             "Application of 3 different interventions to reduce pain during heel prick blood collection in newborns and comparison with the control group.\n\nControl Group 1 (swaddling from mother\\&amp;amp;amp;amp;amp;#39;s lap) Experiment Group 2 (swaddling from mother\\&amp;amp;amp;amp;amp;#39;s lap + pacifier) Experiment Group 3 (swaddling from mother\\&amp;amp;amp;amp;amp;#39;s lap + heel warming) Experiment Group 4 (swaddling from mother\\&amp;amp;amp;amp;amp;#39;s lap + pacifier + heel warming)",
//           primaryPurpose: "SUPPORTIVE_CARE",
//           maskingInfo: {
//             masking: "SINGLE",
//             maskingDescription:
//               "The same neonatal nurse with at least 5 years of experience will perform the interventions.\n\nSalivary cortisol sample will be taken by the same investigator with 5 years of experience.\n\nSalivary cortisol analysis will be performed in the laboratory by biochemistry specialists who have not seen the interventions performed on the newborn.\n\nBabies will be video recorded before, during and after the procedure.\n\nVideo recordings will be monitored and recorded by 2 independent investigators.\n\nData will be analyzed by an independent statistician other than the researchers.",
//             whoMasked: ["INVESTIGATOR"],
//           },
//         },
//         enrollmentInfo: { count: 18, type: "ESTIMATED" },
//       },
//       armsInterventionsModule: {
//         armGroups: [
//           {
//             label: "pacifier with breast milk group",
//             type: "EXPERIMENTAL",
//             description:
//               "swaddling in the mother's lap together with giving a pacifier dipped in breast milk",
//             interventionNames: ["Other: pacifier with breast milk"],
//           },
//           {
//             label: "heel heating group",
//             type: "EXPERIMENTAL",
//             description:
//               "swaddling in the mother's lap together with local dry heat application",
//             interventionNames: ["Other: heel heating"],
//           },
//           {
//             label: "combined intervention group",
//             type: "EXPERIMENTAL",
//             description:
//               "all interventions combined (swaddling in the mother's lap together with giving a pacifier dipped in breast milk and heel heating",
//             interventionNames: ["Other: interventions combined"],
//           },
//           {
//             label: "Control",
//             type: "OTHER",
//             description: "swaddling the baby in the mother's lap",
//             interventionNames: ["Other: Control"],
//           },
//         ],
//         interventions: [
//           {
//             type: "OTHER",
//             name: "pacifier with breast milk",
//             description:
//               "swaddling in the mother\\&#39;s lap together with giving a pacifier dipped in breast milk",
//             armGroupLabels: ["pacifier with breast milk group"],
//           },
//           {
//             type: "OTHER",
//             name: "heel heating",
//             description:
//               "swaddling in the mother\\&#39;s lap together with local dry heat application",
//             armGroupLabels: ["heel heating group"],
//           },
//           {
//             type: "OTHER",
//             name: "interventions combined",
//             description:
//               "swaddling in the mother\\&#39;s lap together with giving a pacifier dipped in breast milk and heel heating",
//             armGroupLabels: ["combined intervention group"],
//           },
//           {
//             type: "OTHER",
//             name: "Control",
//             description: "swaddling the baby in the mother\\&#39;s lap",
//             armGroupLabels: ["Control"],
//           },
//         ],
//       },
//       outcomesModule: {
//         primaryOutcomes: [
//           {
//             measure: "Cardiac apex beat (HRV)",
//             description:
//               "HRV will be evaluated before, during and after the heel blood collection. Each baby will be video recorded for 7-10 minutes before, during and after the procedure by the researcher.",
//             timeFrame: "Through study completion, an average of 1 year.",
//           },
//           {
//             measure: "Oxygen saturation (SpO2)",
//             description:
//               "SpO2 will be evaluated before, during and after the heel blood collection. Each baby will be video recorded for 7-10 minutes before, during and after the procedure by the researcher. SpO2 will be recorded from this video recording.",
//             timeFrame: "Through study completion, an average of 1 year",
//           },
//           {
//             measure: "Crying time",
//             description:
//               "The baby crying time will be monitored and recorded 5 minutes before the heel prick and 5 minutes during the heel prick",
//             timeFrame: "Through study completion, an average of 1 year",
//           },
//           {
//             measure: "Premature Infant Pain Profile Scale (PIPP-R)",
//             description:
//               "The PIPP-R scale includes 3 behavioral (frowning, squeezing eyes, nasolabial groove), 2 physiological (heart rate and oxygen saturation) and 2 contextual (behavioral state and gestational age) items. In the scoring of the scale, items related to physiological and behavioral items are scored as 0,1,2,3 in each variable, reflecting the difference between baseline and treatment values. Items related to contextual items are scored as 3,2,1,0 before touching the baby. The babys pain is evaluated on a total score. Accordingly, the maximum score for newborns is 21. If the premature infant pain profile is between 0-6 points, the pain level in the infant is mild, between 7-12 points is moderate, and between 13-21 points is severe pain.\n\nEach baby will be video monitored and recorded for 7-10 minutes before, during and after the procedure. This video recording will be evaluated and recorded according to the Premature Infant Pain Profile Scale.",
//             timeFrame: "Through study completion, an average of 1 year",
//           },
//           {
//             measure: "Salivary cortisol level",
//             description:
//               "Since cortisol shows circadian rhythm in premature infants, samples will be taken at the same time in the morning. Before taking saliva samples, the newborns mouth will be checked and oral care will be given with SF. Saliva samples will be collected with the Salimetrics Salivary Cortisol Kit by holding it in the cheek and sublingual cavity of the newborn for 1-2 minutes. The samples will be sent to the biochemistry laboratory of the research hospital. The samples will be analyzed for quantitative determination of cortisol by 2 biochemistry experts using standard procedures in the Biochemistry laboratory of TNKU Hospital.\n\nSamples will be taken twice, both during the procedure and 25 minutes after the procedure (the highest cortisol level after pain in newborns is detected between 20-30 minutes after the procedure).",
//             timeFrame: "Through study completion, an average of 1 year",
//           },
//         ],
//       },
//       eligibilityModule: {
//         eligibilityCriteria:
//           "Inclusion Criteria:\n\n* Mother 18 years of age or older\n* Mother is literate\n* Whether the mother gives birth naturally or by caesarean section\n* Uncomplicated pregnancy and birth history in mother\n* Mother\\&#39;s voluntary participation in the study\n* Preterm babies between 34 0/7-36 6/7 weeks\n* Prematurity at 34 0/7-36 6/7 weeks and weight appropriate for the week (Appropriate Gestational Age- AGA),\n* The baby should be fed at least 1 hour in advance.\n* It has been 1 hour since the last painful intervention on the baby.\n* 6Heel blood should be taken 6 hours after taking analgesic, sedative and anticonvulsant medications.\n\nExclusion Criteria:\n\n* The baby has a fever\n* The baby receiving oxygen therapy,\n* The baby receiving antibiotic treatment\n* The baby has a congenital anomaly\n* The baby having the bed side and heater underneath\n* The baby receiving phototherapy,\n* The baby is connected to a mechanical ventilator\n* Babies whose blood was not collected on the first attempt",
//         healthyVolunteers: true,
//         sex: "ALL",
//         minimumAge: "34 Weeks",
//         maximumAge: "36 Weeks",
//         stdAges: ["CHILD"],
//       },
//       contactsLocationsModule: {
//         centralContacts: [
//           {
//             name: "Zeynem YILDIRIM BALKAN, Assist.Prof.",
//             role: "CONTACT",
//             phone: "+905073190958",
//             phoneExt: "we dnt have US",
//             email: "zyildirim@nku.edu.tr",
//           },
//           {
//             name: "Birsen Mutlu, Assoc.Prof.",
//             role: "CONTACT",
//             phone: "+905326826862",
//             phoneExt: "we dnt have US",
//             email: "bdonmez@iuc.edu.tr",
//           },
//         ],
//         overallOfficials: [
//           {
//             name: "Zeynem YILDIRIM BALKAN, Assist.Prof.",
//             affiliation: "Namik Kemal University",
//             role: "STUDY_DIRECTOR",
//           },
//           {
//             name: "Birsen Mutlu, Assoc.Prof.",
//             affiliation: "Istanbul University - Cerrahpasa (IUC)",
//             role: "PRINCIPAL_INVESTIGATOR",
//           },
//         ],
//       },
//       referencesModule: {
//         references: [
//           {
//             pmid: "24476226",
//             type: "RESULT",
//             citation:
//               "Shu SH, Lee YL, Hayter M, Wang RH. Efficacy of swaddling and heel warming on pain response to heel stick in neonates: a randomised control trial. J Clin Nurs. 2014 Nov;23(21-22):3107-14. doi: 10.1111/jocn.12549. Epub 2014 Jan 30.",
//           },
//           {
//             pmid: "24694748",
//             type: "RESULT",
//             citation:
//               "Badiee Z, Nassiri Z, Armanian A. Cobedding of twin premature infants: calming effects on pain responses. Pediatr Neonatol. 2014 Aug;55(4):262-8. doi: 10.1016/j.pedneo.2013.11.008. Epub 2014 Mar 30.",
//           },
//         ],
//       },
//       ipdSharingStatementModule: { ipdSharing: "NO" },
//     },
//     derivedSection: {
//       miscInfoModule: { versionHolder: "2024-10-04" },
//       conditionBrowseModule: {
//         meshes: [{ id: "D000047928", term: "Premature Birth" }],
//         ancestors: [
//           { id: "D000007752", term: "Obstetric Labor, Premature" },
//           { id: "D000007744", term: "Obstetric Labor Complications" },
//           { id: "D000011248", term: "Pregnancy Complications" },
//           {
//             id: "D000005261",
//             term: "Female Urogenital Diseases and Pregnancy Complications",
//           },
//           { id: "D000091642", term: "Urogenital Diseases" },
//         ],
//         browseLeaves: [
//           {
//             id: "M25869",
//             name: "Premature Birth",
//             asFound: "Preterm",
//             relevance: "HIGH",
//           },
//           { id: "M13066", name: "Pain", relevance: "LOW" },
//           {
//             id: "M10772",
//             name: "Obstetric Labor, Premature",
//             relevance: "LOW",
//           },
//           {
//             id: "M10764",
//             name: "Obstetric Labor Complications",
//             relevance: "LOW",
//           },
//           { id: "M14127", name: "Pregnancy Complications", relevance: "LOW" },
//           { id: "M2875", name: "Urogenital Diseases", relevance: "LOW" },
//           {
//             id: "M27093",
//             name: "Female Urogenital Diseases",
//             relevance: "LOW",
//           },
//           {
//             id: "M8399",
//             name: "Female Urogenital Diseases and Pregnancy Complications",
//             relevance: "LOW",
//           },
//         ],
//         browseBranches: [
//           {
//             abbrev: "BXS",
//             name: "Urinary Tract, Sexual Organs, and Pregnancy Conditions",
//           },
//           { abbrev: "All", name: "All Conditions" },
//           { abbrev: "BC23", name: "Symptoms and General Pathology" },
//         ],
//       },
//       interventionBrowseModule: {
//         browseLeaves: [
//           { id: "M9912", name: "Hydrocortisone", relevance: "LOW" },
//           {
//             id: "M155245",
//             name: "Hydrocortisone 17-butyrate 21-propionate",
//             relevance: "LOW",
//           },
//           { id: "M228609", name: "Hydrocortisone acetate", relevance: "LOW" },
//           {
//             id: "M263259",
//             name: "Hydrocortisone hemisuccinate",
//             relevance: "LOW",
//           },
//         ],
//         browseBranches: [
//           { abbrev: "Infl", name: "Anti-Inflammatory Agents" },
//           { abbrev: "All", name: "All Drugs and Chemicals" },
//         ],
//       },
//     },
//     hasResults: false,
//   },
// ];
type Study = {
  protocolSection: {
    identificationModule: {
      officialTitle: string;
      nctId: string;
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
};


export default function SearchHome() {
  const [results, setResults] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const data = await getTrials({ condition: query });
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching trials:', error);
    }
  };

  const handleStudyClick = (study: Study) => {
    setSelectedStudy(study);
  };

  const closeModal = () => {
    setSelectedStudy(null);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    },
    [modalRef]
  );

  const handleRemoveStudy = (study: Study) => {
    // Remove the study from the results array
    setResults((prevResults) =>
      prevResults.filter(
        (s) =>
          s.protocolSection.identificationModule.nctId !==
          study.protocolSection.identificationModule.nctId
      )
    );
  };

  const handleClearSearch = () => {
    console.log("BANANA");
    setResults([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="study-search">
      <h1>SEARCH FOR A CLINICAL STUDY</h1>
      <SearchForm onSearch={handleSearch} removeResult={handleClearSearch} />
      <div className="results">
        {results.map((study) => (
          <StudyCard
            key={study.protocolSection.identificationModule.nctId}
            /* 
             * This approach allows the component to work with 
             * a slightly modified version of the data 
             * without changing the original study object. 
            */
            study={{
              ...study,
              protocolSection: {
                ...study.protocolSection,
                identificationModule: {
                  ...study.protocolSection.identificationModule,
                  briefTitle:
                    study.protocolSection.identificationModule.officialTitle,
                  organization: { fullName: "Default Organization" },
                },
              },
            }}
            handleStudyClick={() => handleStudyClick(study)}
            removeStudy={() => handleRemoveStudy(study)}
          />
        ))}
      </div>
      {selectedStudy && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <StudyDetails study={selectedStudy} />
          </div>
        </div>
      )}
    </div>
  );
}
