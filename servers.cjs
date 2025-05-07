const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

const db = new sqlite3.Database('./bd/suzdal-gimnasia.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
    } else {
        console.log('Connected to database.');
    }
});

const ensureDirsExist = () => {
    const dirs = ['uploads', 'uploads/images', 'uploads/documents'];
    dirs.forEach(dir => {
        const fullPath = path.join(__dirname, dir);
        if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
    });
};
ensureDirsExist();

db.serialize(() => {
    db.on('error', (err) => {
        console.error('Database error:', err.message);
    });

    const PORT = process.env.PORT || 3004;
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

    process.on('SIGINT', () => {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
            process.exit(0);
        });
    });
});

function getAllDataFromTable(tableName, res) {
    console.log(`GET /api/${tableName.toLowerCase()} — запрос получен`);
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
        if (err) {
            console.error(`Ошибка при получении данных из таблицы ${tableName}:`, err.message);
            return res.status(500).json({ error: `Ошибка при получении данных из ${tableName}: ${err.message}` });
        }
        console.log(`Отправляем данные из ${tableName}:`, rows);
        res.json(rows);
    });
}


app.get('/api/user', (req, res) => getAllDataFromTable('User', res));
app.get('/api/employee', async (req, res) => {
    try {
        const sql = `
            SELECT e.*, c.EmployeeCategoryName
            FROM Employee e
            LEFT JOIN EmployeeCategory c ON e.EmployeeCategoryID = c.EmployeeCategoryID
        `;

        db.all(sql, (err, rows) => {
            if (err) {
                console.error('Ошибка при получении сотрудников:', err);
                res.status(500).json({ error: 'Ошибка при получении сотрудников' });
            } else {
                res.json(rows);
            }
        });
    } catch (error) {
        console.error('Ошибка при получении сотрудников:', error);
        res.status(500).json({ error: 'Ошибка при получении сотрудников' });
    }
});



app.get('/api/employeecategory', (req, res) => getAllDataFromTable('EmployeeCategory', res));
app.get('/api/categorydocument', (req, res) => getAllDataFromTable('CategoryDocument', res));
app.get('/api/document', (req, res) => getAllDataFromTable('Document', res));
app.get('/api/managementbodies', (req, res) => getAllDataFromTable('ManagementBodies', res));
app.get('/api/olympiad', (req, res) => getAllDataFromTable('Olympiad', res));
app.get('/api/news', (req, res) => getAllDataFromTable('News', res));
app.get('/api/olympiads', (req, res) => {
    const query = `
        SELECT 
            o.OlympiadID,
            o.OlympiadSurname,
            o.OlympiadName,
            o.OlympiadClass,
            o.OlympiadQuanityPoints,
            o.OlympiadPlace,
            s.SubjectName,
            st.StatusName
        FROM Olympiad o
        JOIN Subject s ON o.SubjectID = s.SubjectID
        JOIN Status st ON o.StatusID = st.StatusID
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
app.get('/api/photonews', (req, res) => getAllDataFromTable('PhotoNews', res));
app.get('/api/photonewsnews', (req, res) => getAllDataFromTable('PhotoNewsNews', res));
app.get('/api/subject', (req, res) => getAllDataFromTable('Subject', res));
app.get('/api/status', (req, res) => getAllDataFromTable('Status', res));

app.get("/api/news/:id", (req, res) => {
    const { id } = req.params;
    console.log("ПОЛУЧЕН ЗАПРОС НА НОВОСТЬ:", id);
    const sql = "SELECT * FROM News WHERE NewsID = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error("Ошибка при получении новости:", err);
            res.status(500).json({ error: "Ошибка сервера" });
        } else if (!row) {
            res.status(404).json({ error: "Новость не найдена" });
        } else {
            res.json(row);
        }
    });
});

app.get('/api/message', (req, res) => {
    const sql = `
        SELECT 
            Message.MessageID,
            Message.MessageTheme,
            Message.MessageDescription,
            User.Username
        FROM Message
        JOIN User ON Message.UserID = User.UserID
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Ошибка при получении сообщений:", err.message);
            res.status(500).json({ error: "Ошибка при получении сообщений" });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/admin/tables', (req, res) => {
    db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`, [], (err, rows) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ error: 'Ошибка при получении таблиц' });
        }

        const tableNames = rows.map(row => row.name);
        res.json(tableNames);
    });
});

app.get('/api/admin/table/:tableName', (req, res) => {
    const { tableName } = req.params;

    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) {
            console.error(`Ошибка при получении данных из таблицы ${tableName}:`, err.message);
            return res.status(500).json({ error: "Ошибка при загрузке данных" });
        }

        res.json(rows);
    });
});

app.post("/api/admin/table/:tableName", async (req, res) => {
    const tableName = req.params.tableName;
    const newData = req.body;

    try {
        const columns = Object.keys(newData).join(", ");
        const placeholders = Object.keys(newData).map(() => "?").join(", ");
        const values = Object.values(newData);

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        await db.run(query, values);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при добавлении записи" });
    }
});

app.get('/api/admin/table-info/:tableName', (req, res) => {
    const { tableName } = req.params;

    db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
        if (err) {
            console.error("Ошибка при получении информации о таблице:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        const primaryKeyField = columns.find(col => col.pk === 1)?.name;

        const notNullFields = columns
            .filter(col => col.notnull === 1)
            .map(col => col.name);

        const foreignKeys = columns
            .map(col => col.name)
            .filter(name => name.endsWith("ID") && name !== primaryKeyField);

        res.json({
            columns: columns.map(col => col.name),
            notNullFields,
            primaryKeyField,
            foreignKeys
        });
    });
});

app.get('/api/admin/table-meta/:tableName', async (req, res) => {
    const { tableName } = req.params;

    try {
        const columns = await db.all(`PRAGMA table_info(${tableName})`);
        const foreignKeys = await db.all(`PRAGMA foreign_key_list(${tableName})`);

        res.json({ columns, foreignKeys });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении мета-данных таблицы" });
    }
});

app.delete('/api/admin/table/:tableName/:id', (req, res) => {
    const { tableName, id } = req.params;
    const idField = `${tableName}ID`;

    const query = `DELETE FROM ${tableName} WHERE ${idField} = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при удалении записи' });
        } else {
            res.json({ message: 'Запись успешно удалена' });
        }
    });
});

app.put('/api/admin/table/:tableName/:id', (req, res) => {
    const { tableName, id } = req.params;
    const data = req.body;
    const idField = `${tableName}ID`;

    const fields = Object.keys(data).filter(key => key !== idField);
    const values = fields.map(key => data[key]);
    const setClause = fields.map(key => `${key} = ?`).join(', ');

    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${idField} = ?`;

    db.run(query, [...values, id], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при обновлении записи' });
        } else {
            res.json({ message: 'Запись успешно обновлена' });
        }
    });
});

app.get('/api/admin/columns/:tableName', (req, res) => {
    const { tableName } = req.params;
    db.all(`PRAGMA table_info(${tableName})`, [], (err, rows) => {
        if (err) {
            console.error("Ошибка при получении структуры таблицы:", err);
            res.status(500).json({ error: "Ошибка при получении структуры таблицы" });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/admin/foreign-keys/:tableName', (req, res) => {
    const tableName = req.params.tableName;

    db.all(`PRAGMA foreign_key_list(${tableName})`, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении внешних ключей:', err);
            res.status(500).json({ error: 'Ошибка при получении внешних ключей' });
        } else {
            res.json(rows);
        }
    });
});

app.post("/api/admin/login", (req, res) => {
    const { login, password } = req.body;

    db.get(
        "SELECT * FROM User WHERE Login = ? AND Password = ?",
        [login, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: "Ошибка сервера" });
            }
            if (row) {
                res.json({ success: true, user: row });
            } else {
                res.status(401).json({ error: "Неверный логин или пароль" });
            }
        }
    );
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        const folder = isImage ? 'images' : 'documents';
        cb(null, path.join(__dirname, 'uploads', folder));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('Нет файла');
    const ext = path.extname(req.file.filename).toLowerCase();
    const folder = ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) ? 'images' : 'documents';
    res.json({ filePath: `/uploads/${folder}/${req.file.filename}` });
});

const getFileList = (folder) => {
    const fullPath = path.join(__dirname, 'uploads', folder);
    if (!fs.existsSync(fullPath)) return [];

    return fs.readdirSync(fullPath).map(filename => `/uploads/${folder}/${filename}`);
};

app.get('/api/files/images', (req, res) => {
    try {
        const files = getFileList('images');
        res.json(files);
    } catch {
        res.status(500).json({ error: 'Ошибка чтения изображений' });
    }
});

app.get('/api/files/documents', (req, res) => {
    try {
        const files = getFileList('documents');
        res.json(files);
    } catch {
        res.status(500).json({ error: 'Ошибка чтения документов' });
    }
});

app.delete('/api/delete', (req, res) => {
    const { filePath } = req.body;
    const fileFullPath = path.join(__dirname, 'uploads', filePath.replace('/uploads', ''));

    if (fs.existsSync(fileFullPath)) {
        fs.unlink(fileFullPath, (err) => {
            if (err) {
                return res.status(500).send('Ошибка при удалении файла');
            }
            res.status(200).send('Файл удален');
        });
    } else {
        res.status(404).send('Файл не найден');
    }
});

app.get("/api/news/:id/photos", (req, res) => {
    const newsID = req.params.id;

    const query = `
        SELECT pn.PhotoPath 
        FROM PhotoNews pn
        JOIN PhotoNewsNews pnn ON pn.PhotoNewsID = pnn.PhotoNewsID
        WHERE pnn.NewsID = ?
    `;

    db.all(query, [newsID], (err, rows) => {
        if (err) {
            console.error("Ошибка при получении фото:", err);
            res.status(500).json({ error: "Ошибка при получении фото" });
        } else {
            res.json(rows);
        }
    });
});

app.get("/api/admin/users", async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM User", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        res.json(users);
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.post("/api/admin/users", async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.run("INSERT INTO User (Username, Password, role) VALUES (?, ?, ?)", [username, hashedPassword, role]);
    res.status(201).send();
});

app.put("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    await db.run("UPDATE User SET Username = ?, role = ? WHERE UserId = ?", [username, role, id]);
    res.send();
});

app.delete("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params;
    await db.run("DELETE FROM User WHERE UserId = ?", [id]);
    res.send();
});

app.put("/api/admin/users/:id/password", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run("UPDATE User SET Password = ? WHERE UserId = ?", [hashedPassword, id]);
    res.send();
});

const util = require("util");

const dbGet = util.promisify(db.get.bind(db));
const dbRun = util.promisify(db.run.bind(db));

app.post("/api/admin/reset-password", async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Не указан логин" });
    }

    try {
        const user = await dbGet(
            "SELECT * FROM User WHERE Login = ?",
            [username]
        );

        console.log("Ищем пользователя по логину:", username);
        console.log("Найденный пользователь:", user);

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        await dbRun(
            "INSERT INTO PasswordRequests (UserID, RequestDate) VALUES (?, datetime('now'))",
            [user.UserID]
        );

        res.json({ message: "Запрос на изменение пароля отправлен администратору" });
    } catch (error) {
        console.error("Ошибка при сбросе пароля:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.use(bodyParser.json());

app.post('/api/feedback', (req, res) => {
    const { name, phone } = req.body;
    const query = 'INSERT INTO feedback (name, phone) VALUES (?, ?)';
    db.run(query, [name, phone], function (err) {
        if (err) {
            console.error('Ошибка при добавлении заявки:', err);
            return res.status(500).json({ message: 'Ошибка при добавлении заявки' });
        }
        res.status(201).json({ message: 'Заявка добавлена', id: this.lastID });
    });
});

app.get('/api/feedback', (req, res) => {
    const query = 'SELECT * FROM feedback';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении заявок:', err);
            return res.status(500).json({ message: 'Ошибка при получении заявок' });
        }
        res.status(200).json(rows);
    });
});

app.put('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    const { is_processed } = req.body;

    const query = 'UPDATE feedback SET is_processed = ? WHERE id = ?';
    const params = [is_processed, id];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Ошибка при обновлении статуса:', err);
            return res.status(500).json({ message: 'Ошибка при обновлении статуса' });
        }
        res.status(200).json({ message: 'Статус обновлён' });
    });
});

app.delete('/api/feedback/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM Feedback WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Заявка удалена' });
    });
});

app.put('/api/users/:userId/password', async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('UPDATE User SET Password = ? WHERE UserID = ?', [hashedPassword, userId], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Пароль обновлён' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка хеширования пароля' });
    }
});

app.get('/api/password-requests', (req, res) => {
    db.all('SELECT * FROM PasswordRequests', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows); 
    });
});


app.use(express.static('scripts'));