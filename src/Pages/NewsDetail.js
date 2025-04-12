import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewsDetail.css";

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3004/api/news/${id}`)
            .then(res => res.json())
            .then(data => setNewsItem(data))
            .catch(err => console.error("Ошибка при получении новости:", err));
    }, [id]);

    if (!newsItem) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="news-detail-info">
            <h1>Новости</h1>
            <div className="purple-line"></div>
            <div className="news-detail">
                <h2>{newsItem.NewsName}</h2>
                <p>{newsItem.NewsDescription}</p>
            </div>
            <a href="/News"><p>Вернуться к другим новостям</p></a>
        </div>
    );
};

export default NewsDetail;
