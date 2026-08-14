import { type FC, useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import type { PageSearchConfig } from "../types/page.types";
import { pageStyles } from "../styles/page.styles";

interface PageSearchInputProps {
  search: PageSearchConfig;
}

export const PageSearchInput: FC<PageSearchInputProps> = ({ search }) => {
  const [localSearch, setLocalSearch] = useState("");
  const onSearchRef = useRef(search.onSearch);

  useEffect(() => {
    onSearchRef.current = search.onSearch;
  }, [search.onSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearchRef.current) {
        onSearchRef.current(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  return (
    <div className={pageStyles.searchInputWrapper}>
      <div className={pageStyles.searchIcon}>
        <Search size={16} />
      </div>
      <input
        type="text"
        value={localSearch}
        placeholder={search.placeholder || "Search..."}
        className={pageStyles.searchInput}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};
