import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchForm from "./Components/SearchForm";
import StudyCard from "./Components/StudyCard";
import StudyDetails from "./Components/StudyDetails";
import { getTrials } from "./utils/api";
import { Study } from "../types/study";

const SearchHome: React.FC = () => {
  const [results, setResults] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  const fetchResults = useCallback(async (query: string, page: number) => {
    setIsLoading(true);
    try {
      const data = await getTrials({ condition: query, page, limit: 10 });
      setResults(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching trials:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
      fetchResults(query, 1);
    },
    [fetchResults]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      fetchResults(searchQuery, newPage);
    },
    [fetchResults, searchQuery]
  );

  const handleStudyClick = useCallback((study: Study) => {
    setSelectedStudy(study);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedStudy(null);
  }, []);

  const handleRemoveStudy = useCallback((study: Study) => {
    setResults((prevResults) =>
      prevResults.filter(
        (s) =>
          s.protocolSection.identificationModule.nctId !==
          study.protocolSection.identificationModule.nctId
      )
    );
  }, []);

  const handleClearSearch = useCallback(() => {
    setResults([]);
    setTotalPages(0);
    setCurrentPage(1);
    setSearchQuery("");
  }, []);

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
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            Next
          </button>
        </div>
      )}
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
};

export default SearchHome;
