import React, { useEffect, useState, useRef } from "react";
import * as adminService from "../../services/adminPanelService.js";
import "./css/AdminTables.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageModal from "./Components/ImageModal.js";

function AdminTables() {
    const [tableList, setTableList] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState("");
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [newRow, setNewRow] = useState({});
    const [editingRow, setEditingRow] = useState({});
    const [notNullFields, setNotNullFields] = useState([]);
    const [validationError, setValidationError] = useState("");
    const [foreignKeys, setForeignKeys] = useState([]);
    const [foreignOptions, setForeignOptions] = useState({});
    const [primaryKey, setPrimaryKey] = useState("");
    const [isArchiveView, setIsArchiveView] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeField, setActiveField] = useState("");
    const quillRefs = useRef({});

    const archiveTables = ["News", "Documents"];
    const hiddenTables = ["User", "Feedback", "PasswordRequests"];

    const isRichTextField = (key) => /description|content|text|html/i.test(key);

    const tableNamesRu = {
        News: "Новости",
        Document: "Документы",
        CategoryDocument: "Категория документов",
        ManagementBodies: "Органы управления",
        Message: "Объявления",
        Olympiad: "Олимпиадники",
        Status: "Статус (для олимпиадников)",
        Subject: "Предмет (для олимпиадников)"
    };

    const fieldNamesRu = {
        NewsID: "Номер новости",
        DocumentID: "Номер документа",
        CategoryDocumentID: "Номер категории",
        ManagementBodiesID: "Номер органа управления",
        MessageID: "Номер объявления",
        OlympiadID: "Номер олимпиадника",
        StatusID: "Номер статуса",
        SubjectID: "Номер предмета",
        CategoryDocumentName: "Название категории",
        DocumentName: "Наименование документа",
        DocumentPath: "Путь к файлу",
        UserID: "Номер пользователя",
        isArchived: "Архивировано ( 0 = нет, 1 = да ) ",
        ManagementBodiesName: "Название",
        ManagementBodiesNumber: "Номер телефона",
        ManagementBodiesEmail: "Почта",
        ManagementBodiesStreet: "Улица",
        ManagementBodiesCity: "Город",
        ManagementBodiesHome: "Номер дома",
        ManagementBodiesPositionEmployee: "Должность заведующего",
        ManagementBodiesSurnameEmployee: "Фамилия заведующего",
        ManagementBodiesNameEmployee: "Имя заведующего",
        ManagementBodiesPatronymicEmployee: "Отчество заведующего",
        ManagementBodiesSite: "Сайт",
        ManagementBodiesOperatingMode: "Режим работы",
        MessageTheme: "Заголовок",
        MessageDescription: "Описание",
        OlympiadSurname: "Фамилия олимпиадника",
        OlympiadName: "Имя олимпиадника",
        OlympiadQuanityPoints: "Количество набранных очков",
        OlympiadClass: "Класс олимпиадника",
        OlympiadPlace: "Место",
        StatusName: "название статуса",
        SubjectName: "Название предмета",
        NewsName: "Заголовок",
        NewsDescription: "Описание",
        NewsDate: "Дата создания"
    };

    useEffect(() => {
        adminService.fetchTableList()
            .then((tables) => setTableList(tables.filter(t => !hiddenTables.includes(t))))
            .catch(() => setError("Ошибка при получении списка таблиц"));
    }, []);

    const validateFields = (data) => {
        for (let field of notNullFields) {
            if (field === primaryKey) continue;
            if (!data[field] || data[field].toString().trim() === "") {
                return `Поле "${field}" обязательно для заполнения`;
            }
        }
        return "";
    };

    const loadForeignKeys = async (tableName) => {
        const res = await adminService.fetchForeignKeys(tableName);
        const options = {};
        for (let fk of res) {
            const values = await adminService.fetchTableData(fk.table);
            options[fk.from] = values;
        }
        setForeignKeys(res);
        setForeignOptions(options);
    };

    const loadTable = async (tableName) => {
        try {
            const data = await adminService.fetchTableData(tableName);
            setTableData(data);
            setNewRow({});
            setEditRowIndex(null);
            setEditingRow({});
            setValidationError("");
        } catch {
            setError(`Ошибка при загрузке данных из таблицы ${tableName}`);
            return;
        }

        try {
            const info = await adminService.fetchTableInfo(tableName);
            setNotNullFields(info.notNullFields || []);
        } catch { }

        try {
            const columns = await adminService.fetchTableColumns(tableName);
            const pk = columns.find(col => col.pk === 1)?.name;
            setPrimaryKey(pk);
        } catch { }

        try {
            await loadForeignKeys(tableName);
        } catch { }
    };

    const handleTableSelect = (e) => {
        const tableName = e.target.value;
        setSelectedTable(tableName);
        setError("");
        if (tableName) loadTable(tableName);
    };

    const handleInputChange = (e, key, isNew = false) => {
        const value = e.target.value;
        if (isNew) {
            setNewRow({ ...newRow, [key]: value });
        } else {
            setEditingRow({ ...editingRow, [key]: value });
        }
    };

    const handleEdit = (index) => {
        setEditRowIndex(index);
        setEditingRow({ ...tableData[index] });
    };

    const handleSave = () => {
        const validationMsg = validateFields(editingRow);
        if (validationMsg) return setValidationError(validationMsg);

        const updatedRow = { ...editingRow };

        Object.keys(updatedRow).forEach(key => {
            if (isRichTextField(key)) {
                updatedRow[key] = updatedRow[key] || "";
            }
        });

        adminService.updateTableRow(selectedTable, editingRow[primaryKey], updatedRow)
            .then(() => loadTable(selectedTable))
            .catch(() => setError("Ошибка при редактировании"));
    };

    const handleDelete = (rowId) => {
        adminService.deleteTableRow(selectedTable, rowId)
            .then(() => loadTable(selectedTable))
            .catch(() => setError("Ошибка при удалении"));
    };

    const handleArchive = (row) => {
        const archivedRow = { ...row, isArchived: 1 };
        adminService.updateTableRow(selectedTable, archivedRow[primaryKey], archivedRow)
            .then(() => loadTable(selectedTable))
            .catch(() => setError("Ошибка при архивации"));
    };

    const isForeignKey = (key) => foreignKeys.find(fk => fk.from === key);

    const handleInsertImage = (url) => {
        const quill = quillRefs.current[activeField];
        if (quill) {
            const editor = quill.getEditor();
            const range = editor.getSelection();
            if (range) {
                editor.insertEmbed(range.index, "image", url);

                const updatedContent = editor.root.innerHTML;
                if (editRowIndex !== null) {
                    setEditingRow(prev => ({ ...prev, [activeField]: updatedContent }));
                } else {
                    setNewRow(prev => ({ ...prev, [activeField]: updatedContent }));
                }
            }
        }
        setShowImageModal(false);
    };

    const filteredTableData = archiveTables.includes(selectedTable)
        ? (isArchiveView
            ? tableData.filter(row => row.isArchived === 1)
            : tableData.filter(row => !row.isArchived))
        : tableData;

    const user = JSON.parse(localStorage.getItem("adminUser"));
    const isEditable = user?.Role === "admin" || user?.Role === "editor";

    return (
        <div className="admin-tables-container">
            <h1>Просмотр таблиц</h1>
            <div className="purple-line" />
            {error && <p className="error-text">{error}</p>}

            <label htmlFor="table-select">Выберите таблицу:</label>
            <select id="table-select" value={selectedTable} onChange={handleTableSelect}>
                <option value="">-- выберите таблицу --</option>
                {tableList.map((table, index) => (
                    <option key={index} value={table}>{tableNamesRu[table] ||table}</option>
                ))}
            </select>
            {validationError && <p className="error-text">{validationError}</p>}

            {archiveTables.includes(selectedTable) && (
                <label style={{ marginTop: "10px" }}>
                    <input
                        type="checkbox"
                        checked={isArchiveView}
                        onChange={() => setIsArchiveView(!isArchiveView)}
                    /> Показать архив
                </label>
            )}

            {selectedTable && filteredTableData.length > 0 && (
                <>
                    <h2>Содержимое таблицы: {tableNamesRu[selectedTable] || selectedTable}</h2>
                    <div className="table-wrapper">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    {Object.keys(filteredTableData[0]).map((col, i) => (
                                        <th key={i}>{fieldNamesRu[col] || col}</th>
                                    ))}
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.keys(row).map((key, j) => (
                                            <td key={j}>
                                                {editRowIndex === rowIndex ? (
                                                    isForeignKey(key) ? (
                                                        <select
                                                            value={editingRow[key] || ""}
                                                            onChange={(e) => handleInputChange(e, key)}>
                                                            <option value="">-- выберите --</option>
                                                            {foreignOptions[key]?.map((option, idx) => (
                                                                <option key={idx} value={option[foreignKeys.find(fk => fk.from === key).to]}>
                                                                    {Object.values(option).slice(1).join(" ")}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : isRichTextField(key) ? (
                                                        <>
                                                            <ReactQuill
                                                                ref={(el) => {
                                                                    if (el) quillRefs.current[key] = el;
                                                                }}
                                                                theme="snow"
                                                                value={editingRow[key] || ""}
                                                                onChange={(value) => setEditingRow({ ...editingRow, [key]: value })}
                                                            />
                                                            <button className="btn" onClick={() => { setShowImageModal(true); setActiveField(key); }}>
                                                                📷 Вставить изображение
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <input
                                                            value={editingRow[key] || ""}
                                                            onChange={(e) => handleInputChange(e, key)}
                                                        />
                                                    )
                                                ) : (
                                                    <div dangerouslySetInnerHTML={{ __html: row[key] }} />
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editRowIndex === rowIndex ? (
                                                <button onClick={handleSave} className="btn save">Сохранить</button>
                                            ) : (
                                                <>
                                                    {(user?.Role === "admin" || user?.Role === "editor") && (
                                                        <>
                                                            <button onClick={() => handleEdit(rowIndex)} className="btn edit">✏️</button>
                                                            {user?.Role === "admin" && (
                                                                <button onClick={() => handleDelete(row[primaryKey])} className="btn delete">🗑️</button>
                                                            )}

                                                            {archiveTables.includes(selectedTable) && !row.isArchived && (
                                                                <button onClick={() => handleArchive(row)} className="btn archive">🗄️ В архив</button>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {selectedTable && filteredTableData.length === 0 && (
                <p>Нет данных для отображения</p>
            )}

            {isEditable && selectedTable && filteredTableData.length > 0 && (
                <div className="add-form">
                    <h3>Добавить новую запись</h3>
                    {Object.keys(filteredTableData[0]).filter(key => key !== primaryKey).map((key, i) => (
                        <div key={i} className="form-group">
                            <label>{fieldNamesRu[key] || key}</label>
                            {isForeignKey(key) ? (
                                <select
                                    value={newRow[key] || ""}
                                    onChange={(e) => handleInputChange(e, key, true)}>
                                    <option value="">-- выберите --</option>
                                    {foreignOptions[key]?.map((option, idx) => (
                                        <option key={idx} value={option[foreignKeys.find(fk => fk.from === key).to]}>
                                            {Object.values(option).slice(1).join(" ")}
                                        </option>
                                    ))}
                                </select>
                            ) : isRichTextField(key) ? (
                                <>
                                    <ReactQuill
                                        ref={(el) => {
                                            if (el) quillRefs.current[key] = el;
                                        }}
                                        theme="snow"
                                        value={newRow[key] || ""}
                                        onChange={(value) => setNewRow({ ...newRow, [key]: value })}
                                    />
                                    <button className="btn" onClick={() => { setShowImageModal(true); setActiveField(key); }}>
                                        📷 Вставить изображение
                                    </button>
                                </>
                            ) : (
                                <input
                                    placeholder={key}
                                    value={newRow[key] || ""}
                                    onChange={(e) => handleInputChange(e, key, true)}
                                />
                            )}
                        </div>
                    ))}
                    <button className="btn add" onClick={() => {
                        const validationMsg = validateFields(newRow);
                        if (validationMsg) return setValidationError(validationMsg);
                        adminService.createTableRow(selectedTable, newRow)
                            .then(() => loadTable(selectedTable))
                            .catch(() => setError("Ошибка при добавлении записи"));
                    }}>
                        ➕ Добавить
                    </button>
                </div>
            )}

            {showImageModal && (
                <ImageModal
                    onClose={() => setShowImageModal(false)}
                    onSelectImage={handleInsertImage}
                    endpoint="http://localhost:3004/api/files/images"
                />
            )}
        </div>
    );
}

export default AdminTables;
