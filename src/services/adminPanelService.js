const API_URL = 'https://yuliagracheva.github.io/suzdal-gymnasia/api/admin';

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
    const user = JSON.parse(localStorage.getItem("adminUser"));
    if (user && user.ID) {
        rowData.UserID = user.ID;
    }

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

export async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error(`Ошибка загрузки пользователей: ${response.status}`);
    }
    return await response.json();
}

export const createUser = async (user) => {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Ошибка при создании пользователя");
    }
    return response.json();
};

export const updateUser = async (user) => {
    if (!user || !user.UserID) {
        throw new Error("Некорректный пользователь: отсутствует UserID");
    }

    const updateData = {
        username: user.Username,
        login: user.Login,
        role: user.role,
        isBlocked: user.isBlocked,
    };

    if (user.password) {
        updateData.password = user.password;
    }

    console.log("Sending update request with data:", updateData);  

    const res = await fetch(`${API_URL}/users/${user.UserID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("Error response:", error); 
        throw new Error(`Ошибка обновления пользователя: ${res.status}`);
    }

    return true;
};

export const updateUserPassword = async (UserID, Password) => {
    const res = await fetch(`${API_URL}/users/${UserID}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Password }),
    });

    if (!res.ok) {
        throw new Error(`Ошибка обновления пароля: ${res.status}`);
    }

    return true;
};

export const deleteUser = async (UserID) => {
    const res = await fetch(`${API_URL}/users/${UserID}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Ошибка удаления пользователя: ${res.status}`);
    }

    return true;
};

export async function fetchImageList() {
    try {
        const response = await fetch(`https://yuliagracheva.github.io/suzdal-gymnasia/api/files/images`);
        if (!response.ok) {
            throw new Error("Не удалось загрузить изображения");
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке изображений:", error);
        throw error;
    }
}