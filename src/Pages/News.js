import React, { useEffect, useState } from "react";
import "./News.css"; // подключи стили, если ещё не

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3004/api/news")
            .then((res) => res.json())
            .then((data) => setNews(data))
            .catch((err) => console.error("Ошибка при получении новостей:", err));
    }, []);

    return (
        <div className="news-main-info">
            <p>Вы здесь: <a href="/">Главная</a> / Новости</p>

            <div className="news-list">
                {news.map((item) => {
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
    );
};

export default News;
