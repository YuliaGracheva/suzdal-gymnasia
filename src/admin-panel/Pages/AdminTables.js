import React, { useEffect, useState } from "react";
import * as adminService from "../../services/adminPanelService";
import "./css/AdminTables.css";

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

    useEffect(() => {
        adminService.fetchTableList()
            .then(setTableList)
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
        } catch (err) {
            console.error("Ошибка при загрузке данных таблицы:", err);
            setError(`Ошибка при загрузке данных из таблицы ${tableName}`);
            return;
        }

        try {
            const info = await adminService.fetchTableInfo(tableName);
            setNotNullFields(info.notNullFields || []);
        } catch (err) {
            console.error("Ошибка при получении информации о таблице:", err);
        }

        try {
            const columns = await adminService.fetchTableColumns(tableName);
            const pk = columns.find(col => col.pk === 1)?.name;
            setPrimaryKey(pk);
        } catch (err) {
            console.error("Ошибка при получении структуры таблицы:", err);
        }

        try {
            await loadForeignKeys(tableName);
        } catch (err) {
            console.error("Ошибка при загрузке внешних ключей:", err);
        }
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
        if (validationMsg) {
            setValidationError(validationMsg);
            return;
        }

        if (!editingRow[primaryKey]) {
            setValidationError("Ошибка: не найден ID строки для редактирования");
            return;
        }

        adminService.updateTableRow(selectedTable, editingRow[primaryKey], editingRow)
            .then(() => {
                loadTable(selectedTable);
                setValidationError("");
            })
            .catch(() => setError("Ошибка при редактировании"));
    };

    const handleDelete = (rowId) => {
        adminService.deleteTableRow(selectedTable, rowId)
            .then(() => loadTable(selectedTable))
            .catch(() => setError("Ошибка при удалении"));
    };

    const isForeignKey = (key) => foreignKeys.find(fk => fk.from === key);

    return (
        <div className="admin-tables-container">
            <h1>Просмотр таблиц</h1>
            <div className="purple-line" />
            {error && <p className="error-text">{error}</p>}

            <label htmlFor="table-select">Выберите таблицу:</label>
            <select id="table-select" value={selectedTable} onChange={handleTableSelect}>
                <option value="">-- выберите таблицу --</option>
                {tableList.map((table, index) => (
                    <option key={index} value={table}>{table}</option>
                ))}
            </select>
            {validationError && <p className="error-text">{validationError}</p>}

            {selectedTable && tableData.length > 0 && (
                <>
                    <h2>Содержимое таблицы: {selectedTable}</h2>
                    <div className="table-wrapper">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    {Object.keys(tableData[0]).map((col, i) => (
                                        <th key={i}>{col}</th>
                                    ))}
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, rowIndex) => (
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
                                                    ) : (
                                                        <input
                                                            value={editingRow[key] || ""}
                                                            onChange={(e) => handleInputChange(e, key)}
                                                        />
                                                    )
                                                ) : (
                                                    row[key]
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editRowIndex === rowIndex ? (
                                                <button onClick={handleSave} className="btn save">Сохранить</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEdit(rowIndex)} className="btn edit">✏️</button>
                                                    <button onClick={() => handleDelete(row[primaryKey])} className="btn delete">🗑️</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    {Object.keys(tableData[0]).filter(key => key !== primaryKey).map((key, i) => (
                                        <td key={i}>
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
                                            ) : (
                                                <input
                                                    placeholder={key}
                                                    value={newRow[key] || ""}
                                                    onChange={(e) => handleInputChange(e, key, true)}
                                                />
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <button className="btn add" onClick={() => {
                                            const validationMsg = validateFields(newRow);
                                            if (validationMsg) {
                                                setValidationError(validationMsg);
                                                return;
                                            }

                                            adminService.createTableRow(selectedTable, newRow)
                                                .then(() => {
                                                    loadTable(selectedTable);
                                                    setValidationError("");
                                                })
                                                .catch(() => setError("Ошибка при добавлении записи"));
                                        }}>
                                            ➕
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminTables;
