import React, { useState, useEffect } from 'react';
import './css/AdminFileUpload.css';

const AdminFileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('image');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchFiles = async () => {
        try {
            const response = await fetch(`http://localhost:3004/api/files/${fileType === 'image' ? 'images' : 'documents'}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setUploadedFiles(data);
            } else {
                setUploadedFiles([]);
            }
        } catch (error) {
            console.error('Ошибка получения файлов:', error);
            setUploadedFiles([]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Выберите файл');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`http://localhost:3004/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Ошибка при загрузке');

            setFile(null);
            await fetchFiles();
        } catch (error) {
            alert('Ошибка при загрузке файла');
            console.error(error);
        }
    };

    const handleDelete = async (filePath) => {
        try {
            const response = await fetch(`http://localhost:3004/api/delete`, {
                method: 'DELETE',
                body: JSON.stringify({ filePath }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setUploadedFiles(uploadedFiles.filter(file => file !== filePath));
            } else {
                alert('Ошибка при удалении файла');
            }
        } catch (error) {
            console.error('Ошибка при удалении файла:', error);
        }
    };

    const handleCopy = (filePath) => {
        navigator.clipboard.writeText(`http://localhost:3004${filePath}`);
        alert('Путь скопирован в буфер обмена!');
    };

    useEffect(() => {
        fetchFiles();
    }, [fileType]);

    const user = JSON.parse(localStorage.getItem("adminUser"));
    const isEditable = user.role === "admin" || user.role === "editor";

    return (
        <div style={{ padding: 20 }}>
            <h2>Загрузка файла</h2>
            {isEditable && (
                <form onSubmit={handleUpload}>
                    <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
                        <option value="image">Изображение</option>
                        <option value="document">Документ</option>
                    </select>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Загрузить</button>
                </form>
            )}

            <div className="uploaded-files-list">
                <h3>Загруженные файлы ({fileType === 'image' ? 'Фото' : 'Документы'})</h3>
                <ul>
                    {uploadedFiles.map((file, index) => {
                        const fileNameWithoutExt = file.split('/').pop().split('.')[0]; // Убираем расширение
                        return (
                            <li key={index} className="file-item">
                                {file.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                    <div className="file-image-container">
                                        <img
                                            src={`http://localhost:3004${file}`}
                                            alt={fileNameWithoutExt}
                                            className="uploaded-file"
                                        />
                                        <div className="file-actions">
                                            <button onClick={() => handleDelete(file)}>Удалить</button>
                                            <button onClick={() => handleCopy(file)}>Копировать путь</button>
                                        </div>
                                        <div className="file-name">{fileNameWithoutExt}</div>
                                    </div>
                                ) : (
                                    <div className="file-document-container">
                                        <a href={`http://localhost:3004${file}`} target="_blank" rel="noreferrer">
                                            📄 {fileNameWithoutExt}
                                        </a>
                                        <div className="file-actions">
                                            <button onClick={() => handleDelete(file)}>Удалить</button>
                                            <button onClick={() => handleCopy(file)}>Копировать путь</button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AdminFileUpload;