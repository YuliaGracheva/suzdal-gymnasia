import React, { useEffect, useState } from "react";
import "./NewsList.css";

const NewsList = ({ limit, vertical = false }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://4854069-fc63586.twc1.net/api/news")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => new Date(b.NewsDate) - new Date(a.NewsDate));
                setNews(limit ? sorted.slice(0, limit) : sorted);
            })
            .catch(err => console.error("Ошибка при получении новостей:", err));
    }, [limit]);

    return (
        <div className={vertical ? "news-list-vertical" : "news-list-horizontal"}>
            {news.map(item => {
                const shortDesc = item.NewsDescription.length > 300
                    ? item.NewsDescription.slice(0, 300) + "..."
                    : item.NewsDescription;

                return (
                    <div className="news-card" key={item.NewsID}>
                        <h2>{item.NewsName}</h2>
                        <p className="news-date">{new Date(item.NewsDate).toLocaleDateString()}</p>
                        <p>{shortDesc}</p>
                        <a className="view-button" href={`/news/${item.NewsID}`}>Читать далее</a>
                    </div>
                );
            })}
        </div>
    );
};

export default NewsList;
