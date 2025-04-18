import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewsDetail.css";

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3004/api/news/${id}`)
            .then(res => res.json())
            .then(data => setNewsItem(data))
            .catch(err => console.error("Ошибка при получении новости:", err));

        fetch(`http://localhost:3004/api/news/${id}/photos`)
            .then(res => res.json())
            .then(data => setPhotos(data))
            .catch(err => console.error("Ошибка при получении фото:", err));
    }, [id]);

    const openModal = (path) => {
        setSelectedImage(path);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

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

                {photos.length > 0 && (
                    <div className="news-photos">
                        {photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.PhotoPath}
                                alt={`Фото ${index + 1}`}
                                className="news-photo"
                                onClick={() => openModal(photo.PhotoPath)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <a href="/news"><p>Вернуться к другим новостям</p></a>

            {selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Увеличенное фото" />
                        <button onClick={closeModal} className="close-modal">✖</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;
