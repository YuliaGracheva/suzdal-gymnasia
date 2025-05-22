import React, { Component } from "react";
import "./PaidEducationalServices.css";

class PaidEducationalServices extends Component {
    state = {
        documents: [],
    };

    componentDidMount() {
        fetch("http://YuliaGracheva.github.io/suzdal_gymnazia/api/document")
            .then(res => res.json())
            .then(data => {
                const filteredDocs = data.filter(doc => doc.CategoryDocumentID === 6);
                this.setState({ documents: filteredDocs });
            })
            .catch(err => console.error("Ошибка загрузки документов:", err));
    }

    render() {
        const { documents } = this.state;

        return (
            <div className="paid-educational-services-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info"> Основные сведения </a> / Платные образовательные услуги</p>

                <div className="paid-educational-services-info">
                    <h1>Платные образовательные услуги</h1>
                    <div className="purple-line"></div>

                    <p className="paid-text">
                        Организация оказывает платные образовательные услуги.
                    </p>

                    <ul className="paid-documents-list">
                        {documents.map(doc => (
                            <li key={doc.DocumentID}>
                                <a href={doc.DocumentPath} target="_blank" rel="noopener noreferrer">
                                    {doc.DocumentName}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default PaidEducationalServices;
