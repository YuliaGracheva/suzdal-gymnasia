import React, { Component } from "react";
import './ProcessReception.css';

class ProcessReception extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3004/api/document") 
            .then((response) => response.json())
            .then((data) => {
                const filtered = data.filter(doc => doc.CategoryDocumentID === 9);
                this.setState({ documents: filtered });
            })
            .catch((error) => console.error("Ошибка при загрузке документов:", error));
    }

    render() {
        return (
            <div className="reception-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / Порядок приёма</p>

                <div className="reception-info">
                    <h1>Документы, регламентирующие порядок приёма</h1>

                    <div className="document-links">
                        {this.state.documents.map((doc) => (
                            <a
                                key={doc.DocumentID}
                                href={doc.DocumentPath}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {doc.DocumentName}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProcessReception;
