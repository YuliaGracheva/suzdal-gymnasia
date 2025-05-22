import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NewsDetail.css";

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://YuliaGracheva.github.io/suzdal_gymnazia/api/news/${id}`)
            .then(res => res.json())
            .then(data => setNewsItem(data))
            .catch(err => console.error("Ошибка при получении новости:", err));

        fetch(`http://YuliaGracheva.github.io/suzdal_gymnazia/api/news/${id}/photos`)
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
                <p dangerouslySetInnerHTML={{ __html: newsItem.NewsDescription }} ></p>

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

            <p onClick={() => navigate(-1)} className="back-link">Вернуться</p>

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
