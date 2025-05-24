import React, { useEffect, useState } from "react";
import "./OrganizationEat.css";

function OrganizationEat() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        fetch("/api/document")
            .then((res) => res.json())
            .then((data) => {
                console.log("Все документы:", data);
                const filtered = data.filter(doc => doc.CategoryDocumentID === 5);
                console.log("Отфильтрованные документы (CategoryDocumentID = 5):", filtered);
                setDocuments(filtered);
            })
            
            .catch((err) => console.error("Ошибка загрузки документов:", err));
    }, []);

    return (
        <div className="organization-eat-main-info">
            <p>
                Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / Организация питания в образовательной организации
            </p>
            <h1>Организация питания</h1>
            <div className="purple-line"></div>

            <div className="documents-list">
                {documents.map((doc) => (
                    <div key={doc.DocumentID} className="document-card">
                        <a href={doc.DocumentPath} target="_blank" rel="noopener noreferrer">
                            {doc.DocumentName}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrganizationEat;
