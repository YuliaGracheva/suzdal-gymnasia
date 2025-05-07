import React, { useContext } from "react";
import { SearchContext } from "./SearchContext.js";

const pagesContent = [
    { path: "/main-info/documents", content: "Документы, устав, лицензия, свидетельства" },
    { path: "/about/leadership", content: "Руководство, директор, замдиректора" },
    { path: "/main-info/organisation-eat", content: "Организация питания, меню, питание учащихся" },
    { path: "/news", content: "Новости, мероприятия, события" },
];

const SearchPage = () => {
    const { query } = useContext(SearchContext);

    const results = pagesContent.filter(page =>
        page.content.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="search-results">
            <h1>Результаты поиска по: «{query}»</h1>
            {results.length === 0 ? (
                <p>Ничего не найдено.</p>
            ) : (
                <ul>
                    {results.map((page, idx) => (
                        <li key={idx}>
                            <a href={page.path}>{page.content}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchPage;
