import React, { useEffect, useState } from "react";
import "./FinancialEconomicActivity.css";

function FinancialEconomicActivity() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch("http://46.149.69.12:3004/api/document")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(doc => doc.CategoryDocumentID === 8);
        setDocuments(filtered);
      })
      .catch((err) => {
        console.error("Ошибка при получении документов:", err);
      });
  }, []);

  return (
    <div className="financial-economic-activity-main-info">
      <p>
        Вы здесь: <a href="/">Главная</a> /{" "}
        <a href="/main-info">Основные сведения</a> / Финансово-хозяйственная
        деятельность
      </p>
      <h1>Финансово-хозяйственная деятельность</h1>

      <div className="documents-list">
        {documents.map((doc) => (
          <div className="document-card" key={doc.DocumentID}>
            <a href={doc.DocumentPath} target="_blank" rel="noopener noreferrer">
              {doc.DocumentName}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialEconomicActivity;
