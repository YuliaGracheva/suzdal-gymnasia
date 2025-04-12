const API_URL = 'http://localhost:3004/api/admin';

export const fetchTableList = async () => {
    const res = await fetch(`${API_URL}/tables`);
    if (!res.ok) throw new Error('Не удалось загрузить список таблиц');
    return res.json();
};

export const fetchTableData = async (tableName) => {
    const res = await fetch(`${API_URL}/table/${tableName}`);
    if (!res.ok) throw new Error(`Ошибка загрузки данных из таблицы ${tableName}`);
    return res.json();
};

export const fetchTableInfo = async (tableName) => {
    const res = await fetch(`${API_URL}/table-info/${tableName}`);
    if (!res.ok) throw new Error(`Ошибка получения информации о таблице ${tableName}`);
    return res.json();
};

export const updateTableRow = async (tableName, id, updatedRow) => {
    const res = await fetch(`${API_URL}/table/${tableName}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow),
    });

    if (!res.ok) throw new Error(`Ошибка при обновлении записи`);
    return res.json();
};

export const deleteTableRow = async (tableName, id) => {
    const res = await fetch(`${API_URL}/table/${tableName}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error(`Ошибка при удалении записи`);
    return res.json();
};

export async function fetchForeignKeys(tableName) {
    const res = await fetch(`${API_URL}/foreign-keys/${tableName}`);
    if (!res.ok) {
        throw new Error(`Ошибка при получении внешних ключей: ${res.status}`);
    }
    return res.json();
}

export async function fetchTableColumns(tableName) {
    const res = await fetch(`${API_URL}/columns/${tableName}`);
    if (!res.ok) {
        throw new Error(`Ошибка при получении структуры таблицы: ${res.status}`);
    }
    return res.json();
}

export async function createTableRow(tableName, rowData) {
    const response = await fetch(`${API_URL}/table/${tableName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
    });

    if (!response.ok) {
        throw new Error("Ошибка при добавлении записи");
    }

    return response.json();
}
