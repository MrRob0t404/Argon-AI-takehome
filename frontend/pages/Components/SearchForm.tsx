import React, { useState, useCallback } from "react";
import styles from "../../styles/SearchForm.module.css";

interface SearchFormProps {
  onSearch: (query: string) => void;
  removeResult: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, removeResult }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query);
    },
    [onSearch, query]
  );

  const handleClearSearch = useCallback(() => {
    setQuery("");
    onSearch("");
    removeResult();
  }, [onSearch, removeResult]);

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a clinical trial..."
            className={styles.input}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={`${styles.button} ${styles.searchButton}`}>
            Search
          </button>
          <button
            type="button"
            onClick={handleClearSearch}
            className={`${styles.button} ${styles.clearButton}`}
          >
            Clear Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
