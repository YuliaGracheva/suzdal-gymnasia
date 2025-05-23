import React, { useEffect, useState } from "react";
import './Employee.css';

const Employee = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch("http://46.149.69.12:3004/api/document")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter(doc => doc.CategoryDocumentID === 7);
        setDocuments(filtered);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке документов:", error);
      });
  }, []);

  return (
    <div className="employee-container">
      <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / Педагогический состав</p>
      <h1>Педагогический состав</h1>

      <div className="documents-block">
        <h2>Документы</h2>
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>
              <a href={doc.DocumentPath} target="_blank" rel="noopener noreferrer">
                {doc.DocumentName || `Документ ${index + 1}`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Employee;
