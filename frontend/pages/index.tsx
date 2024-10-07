import SearchForm from "./Components/SearchForm";
import Results from "./Components/Results";

export default function Home() {
  return (
    <div>
      <h1>Search for a Clinical Trial!</h1>
      <SearchForm />
      <Results />
    </div>
  );
}
