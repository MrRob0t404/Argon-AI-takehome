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
  const [totalResults, setTotalResults] = useState(0);
  const [noResults, setNoResults] = useState(false);

  const fetchResults = useCallback(async (query: string, page: number) => {
    setIsLoading(true);
    setNoResults(false);
    try {
      const data = await getTrials({ condition: query, page, limit: 10 });
      if (data.results.length === 0) {
        setNoResults(true);
      } else {
        if (page === 1) {
          setResults(data.results);
        } else {
          setResults((prevResults) => [...prevResults, ...data.results]);
        }
        setTotalResults(data.total);
        setHasMore(data.total > page * 10);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching trials:", error);
      setNoResults(true);
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
    setResults((prevResults) => {
      const newResults = prevResults.filter(
        (s) =>
          s.protocolSection.identificationModule.nctId !==
          study.protocolSection.identificationModule.nctId
      );
      return newResults;
    });
    setTotalResults((prevTotal) => prevTotal - 1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setResults([]);
    setCurrentPage(1);
    setSearchQuery("");
    setNoResults(false);
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

  const shouldShowLoadMore = useCallback(() => {
    return totalResults > results.length;
  }, [totalResults, results.length]);

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
      {noResults && (
        <div className="no-results">
          <p>No results found for your search. Please try a different query.</p>
        </div>
      )}
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
      {shouldShowLoadMore() && hasMore && (
        <div className="load-more">
          <button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
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
