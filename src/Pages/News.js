import React, { useEffect, useState } from "react";
import "./News.css";
import { useNavigate } from "react-router-dom";

const News = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [archiveDates, setArchiveDates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://yuliagracheva.github.io/suzdal-gymnasia/api/news")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setFilteredNews(data);
                generateArchive(data);
            })
            .catch((err) => console.error("Ошибка при получении новостей:", err));
    }, []);

    const generateArchive = (newsList) => {
        const archiveMap = {};

        newsList.forEach((item) => {
            if (item.isArchived !== 1) return;

            const date = new Date(item.NewsDate);
            const month = date.getMonth();
            const year = date.getFullYear();
            const key = `${year}-${month}`;

            if (!archiveMap[key]) {
                archiveMap[key] = {
                    year,
                    month,
                    label: date.toLocaleString("ru-RU", { month: "long", year: "numeric" }),
                };
            }
        });

        const archiveArray = Object.values(archiveMap).sort((a, b) => {
            if (sortOrder === "newest") {
                return b.year - a.year || b.month - a.month;
            } else {
                return a.year - b.year || a.month - b.month;
            }
        });

        setArchiveDates(archiveArray);
    };

    useEffect(() => {
        let filtered = news
            .filter(item => item.isArchived !== 1)
            .filter(item =>
                item.NewsName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.NewsDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );

        if (sortOrder === "newest") {
            filtered.sort((a, b) => new Date(b.NewsDate) - new Date(a.NewsDate));
        } else {
            filtered.sort((a, b) => new Date(a.NewsDate) - new Date(b.NewsDate));
        }

        setFilteredNews(filtered);
    }, [searchTerm, sortOrder, news]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleArchiveClick = (year, month) => {
        navigate(`/news/archive/${year}/${month + 1}`);
    };

    return (
        <div className="news-page">
            <div className="news-sidebar">
                <h3>Архив</h3>
                <ul className="archive-list">
                    {archiveDates.map(({ year, month, label }) => (
                        <li key={`${year}-${month}`} onClick={() => handleArchiveClick(year, month)}>
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="news-main-content">
                <p>Вы здесь: <a href="/">Главная</a> / Новости</p>
                <h1>Новости</h1>
                <div className="news-controls">
                    <input
                        type="text"
                        placeholder="Поиск по новостям..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="news-search"
                    />
                    <select value={sortOrder} onChange={handleSortChange} className="news-sort">
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                    </select>
                </div>

                <div className="news-list-vertical">
                    {filteredNews.map((item) => {
                        const shortDesc = item.NewsDescription.length > 300
                            ? item.NewsDescription.slice(0, 300) + "..."
                            : item.NewsDescription;

                        return (
                            <div className="news-card-vertical" key={item.NewsID}>
                                <h2>{item.NewsName}</h2>
                                <p className="news-date">{new Date(item.NewsDate).toLocaleDateString()}</p>
                                <p>{shortDesc}</p>
                                <a className="view-button" href={`/news/${item.NewsID}`}>Читать далее</a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default News;
