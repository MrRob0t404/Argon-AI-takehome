import React, { useState, useCallback } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a clinical trial..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClearSearch}>
        Clear Search
      </button>
    </form>
  );
};

export default SearchForm;
