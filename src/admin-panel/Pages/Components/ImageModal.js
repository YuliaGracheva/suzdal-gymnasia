import React, { useEffect, useState } from "react";
import "./css/ImageModal.css";

function ImageModal({ onClose, onSelectImage, endpoint }) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchImages = () => {
            fetch(endpoint)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setImages(data);
                    } else {
                        throw new Error("Неверный формат данных");
                    }
                })
                .catch(() => setError("Не удалось загрузить изображения."));

        };

        fetchImages();

        const handleImageUploaded = () => {
            fetchImages();
        };

        window.addEventListener("imageUploaded", handleImageUploaded);
        return () => {
            window.removeEventListener("imageUploaded", handleImageUploaded);
        };
    }, [endpoint]);

    const handleImageClick = (url) => {
        onSelectImage(`/${url}`);
        onClose();
    };

    return (
        <div className="image-modal-backdrop">
            <div className="image-modal">
                <div className="modal-header">
                    <h2>Выбор изображения</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
                {error && <p className="error-text">{error}</p>}
                <div className="image-grid">
                    {images
                        .filter(url => typeof url === "string")
                        .map((url, index) => (
                            <img
                                key={index}
                                src={url.startsWith("http") ? url : `/api/${url}`}
                                alt={`Изображение ${index + 1}`}
                                onClick={() => handleImageClick(url)}
                                className="selectable-image"
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ImageModal;
