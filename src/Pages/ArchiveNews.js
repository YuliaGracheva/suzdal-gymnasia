import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./News.css";

const ArchiveNews = () => {
    const { year, month } = useParams();
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);

    useEffect(() => {
        fetch("http://YuliaGracheva.github.io/suzdal_gymnazia/api/news")
            .then(res => res.json())
            .then(data => {
                setNews(data);
                const filtered = data.filter(item => {
                    const date = new Date(item.NewsDate);
                    return (
                        date.getFullYear() === parseInt(year) &&
                        date.getMonth() + 1 === parseInt(month)
                    );
                });
                setFilteredNews(filtered);
            })
            .catch(err => console.error("Ошибка при загрузке новостей:", err));
    }, [year, month]);

    const getMonthName = (num) => {
        const date = new Date(2025, num - 1, 1);
        return date.toLocaleString("ru-RU", { month: "long" });
    };

    return (
        <div className="news-main-info">
            <p>Вы здесь: <Link to="/">Главная</Link> / <Link to="/news">Новости</Link> / Архив</p>
            <h1>Архив новостей — {getMonthName(month)} {year}</h1>

            {filteredNews.length === 0 ? (
                <p>Нет новостей за выбранный период.</p>
            ) : (
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
            )}
        </div>
    );
};

export default ArchiveNews;
