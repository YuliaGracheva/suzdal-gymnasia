import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./SearchContext.js";

const SearchPage = () => {
    const { query } = useContext(SearchContext);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`/search?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => setResults(data))
            .catch(console.error);
    }, [query]);

    return (
        <div className="search-results">
            <h1>Результаты поиска по: «{query}»</h1>
            {results.length === 0 ? (
                <p>Ничего не найдено.</p>
            ) : (
                <ul>
                    {results.map((page, idx) => (
                        <li key={idx}>
                            <a href={page.path}>{page.path}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchPage;
