import { useState } from "react";

export default function SearchForm({
  onSearch,
  removeResult,
}: {
  onSearch: (query: string) => void;
  removeResult: () => void;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClearSearch = () => {
    setQuery("");
    onSearch(query);
    removeResult();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a clinical trial..."
      />
      <button type="submit">Search</button>{" "}
      <button onClick={handleClearSearch}>Clear Search</button>
    </form>
  );
}
