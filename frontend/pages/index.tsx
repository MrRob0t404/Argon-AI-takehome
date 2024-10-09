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
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  const fetchResults = useCallback(async (query: string, page: number) => {
    setIsLoading(true);
    try {
      const data = await getTrials({ condition: query, page, limit: 10 });
      if (page === 1) {
        setResults(data.results);
      } else {
        setResults((prevResults) => [...prevResults, ...data.results]);
      }
      setHasMore(data.results.length === 10);
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

  const handleLoadMore = useCallback(() => {
    fetchResults(searchQuery, currentPage + 1);
  }, [fetchResults, searchQuery, currentPage]);

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
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  console.log(results.length);
  return (
    <div className="study-search">
      <h1>SEARCH FOR A CLINICAL STUDY</h1>
      <SearchForm onSearch={handleSearch} removeResult={handleClearSearch} />
      <div className="results">
        {results.map((study) => (
          <StudyCard
            key={study.protocolSection.identificationModule.nctId}
            study={study}
            handleStudyClick={() => handleStudyClick(study)}
            removeStudy={() => handleRemoveStudy(study)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="load-more">
          {results.length > 9 ? (
            <button onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load More"}
            </button>
          ) : (
            ""
          )}
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
