import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import sqlite3 from "sqlite3";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import util from "util";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const buildPath = path.join(__dirname, 'build');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

dotenv.config({ path: './process.env' });

const allowedOrigins = [
    'http://localhost:3000',
    'http://46.149.69.12'
];

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};

import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});

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

app.get("/api/news/notArchived", (req, res) => {
    const sql = "SELECT * FROM News WHERE isArchived = 0";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Ошибка при получении новостей:", err);
            res.status(500).json({ error: "Ошибка сервера" });
        } else {
            res.json(rows);
        }
    });
});


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

    db.run(query, [id], function(err) {
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

    db.run(query, [...values, id], function(err) {
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        const folder = isImage ? 'images' : 'documents';
        cb(null, path.join(__dirname, 'uploads', folder));
    },
    filename: function(req, file, cb) {
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
    const { username, login, password, role } = req.body;

    if (!username || !login || !password || !role) {
        return res.status(400).json({ error: "Все поля должны быть заполнены." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await db.run("INSERT INTO User (Username, Login, Password, role, isBlocked) VALUES (?, ?, ?, ?, ?)",
            [username, login, hashedPassword, role, "Разблокирован"]);
    } catch (error) {
        console.error("Ошибка при добавлении пользователя:", error);
        res.status(500).json({ error: "Ошибка добавления пользователя" });
    }
});

app.get("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM User WHERE UserID = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.put("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username, role, login, isBlocked, password } = req.body;

    console.log("Received data:", req.body);

    if (!username || !role || !login) {
        return res.status(400).json({ error: "Все поля (username, role, login) обязательны." });
    }

    const user = await db.get("SELECT * FROM User WHERE UserID = ?", [id]);
    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден." });
    }

    const finalIsBlocked = isBlocked !== undefined ? isBlocked : user.isBlocked;

    if (finalIsBlocked !== "Заблокирован" && finalIsBlocked !== "Разблокирован") {
        return res.status(400).json({ error: "Неверное значение для поля isBlocked." });
    }

    const queryParams = [username, login, role, finalIsBlocked, id];

    console.log("Received data:", queryParams);

    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        queryParams.splice(3, 0, hashedPassword);
    }

    try {
        const updateQuery = password
            ? "UPDATE User SET Username = ?, Login = ?, role = ?, Password = ?, isBlocked = ? WHERE UserID = ?"
            : "UPDATE User SET Username = ?, Login = ?, role = ?, isBlocked = ? WHERE UserID = ?";

        await db.run(updateQuery, queryParams);
        res.send();
    } catch (error) {
        console.error("Ошибка обновления пользователя:", error);
        res.status(500).json({ error: "Ошибка обновления пользователя" });
    }
});

app.put("/api/admin/users/:id/password", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run("UPDATE User SET Password = ? WHERE UserId = ?", [hashedPassword, id]);
    res.send();
});

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

app.post('/api/feedback', async (req, res) => {
    const { name, phone, recaptchaToken, useRecaptcha } = req.body;

    if (useRecaptcha) {
        const secret = "6Ld7hzMrAAAAALSBit1lRK-t8v8fVroQUVi2RJO3";
        try {
            const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${secret}&response=${recaptchaToken}`
            });

            const data = await verifyRes.json();
            console.log("📥 Пришёл запрос на /api/feedback:", req.body);
            console.log("📤 Проверка токена:", recaptchaToken);

            console.log("Ответ от Google reCAPTCHA:", data);

            if (!data.success) {
                return res.status(400).json({ error: "Проверка reCAPTCHA не пройдена" });
            }
        } catch (err) {
            console.error("Ошибка при проверке reCAPTCHA:", err);
            return res.status(500).json({ error: "Ошибка проверки reCAPTCHA" });
        }
    }

    const query = 'INSERT INTO feedback (name, phone) VALUES (?, ?)';
    db.run(query, [name, phone], function(err) {
        if (err) {
            console.error('Ошибка при добавлении заявки:', err);
            return res.status(500).json({ message: 'Ошибка при добавлении заявки' });
        }
        res.status(201).json({ message: 'Заявка добавлена', id: this.lastID });
    });
});


app.get('/api/admin/feedback', (req, res) => {
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

    db.run(query, params, function(err) {
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

    if (!password || password.length < 4) {
        return res.status(400).json({ error: 'Неверный пароль' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run('UPDATE User SET Password = ? WHERE UserID = ?', [hashedPassword, userId], function(err) {
            if (err) return res.status(500).json({ error: err.message });

            db.run('DELETE FROM PasswordRequests WHERE UserID = ?', [userId], function(err2) {
                if (err2) return res.status(500).json({ error: err2.message });
                res.json({ message: 'Пароль обновлён и заявка удалена' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка хеширования пароля' });
    }
});

app.get('/api/password-requests', (req, res) => {
    const sql = `
        SELECT pr.UserID, pr.RequestDate, u.Username, u.Login
        FROM PasswordRequests pr
        JOIN User u ON pr.UserID = u.UserID
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Ошибка при получении заявок на смену пароля:", err.message);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.json(rows);
    });
});

app.delete('/api/password-requests/:userId', (req, res) => {
    const { userId } = req.params;

    db.run('DELETE FROM PasswordRequests WHERE UserID = ?', [userId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Заявка не найдена' });
        }
        res.json({ message: 'Заявка удалена' });
    });
});

const pagesDir = path.join(__dirname, "Pages");

function getAllPageTexts() {
    const files = fs.readdirSync(pagesDir);
    const pages = files.map(filename => {
        const content = fs.readFileSync(path.join(pagesDir, filename), "utf-8");
        return {
            path: "/" + filename.replace(/\.txt|\.html|\.json/, ""),
            content: content.toLowerCase()
        };
    });
    return pages;
}

app.get("/search", (req, res) => {
    const query = (req.query.q || "").toLowerCase();
    if (!query) return res.json([]);

    const pages = getAllPageTexts();
    const results = pages.filter(page => page.content.includes(query));
    res.json(results);
});

app.post("/api/admin/login", async (req, res) => {
    const { login, password } = req.body;

    try {
        console.log("Login attempt:", login);

        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM User WHERE Login = ?", [login], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        console.log("Queried user from database:", user);

        if (!user) {
            console.log("User not found:", login);
            return res.status(401).json({ error: "Неверный логин или пароль" });
        }

        console.log("User found:", user.Username);

        if (user.isBlocked === "Заблокирован") {
            console.log("Account is blocked for user:", user.Username);
            return res.status(403).json({ error: "Ваш аккаунт заблокирован" });
        }

        console.log("Stored password hash:", user.Password);
        console.log("Password entered by user:", password);

        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            console.log("Password mismatch for user:", user.Username);
            return res.status(401).json({ error: "Неверный логин или пароль" });
        }

        console.log("Password is valid for user:", user.Username);

        res.json({
            user: {
                UserID: user.UserID,
                Username: user.Username,
                Role: user.role
            }
        });

    } catch (err) {
        console.error("Ошибка входа:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.get("/api/settings", (req, res) => {
    db.get("SELECT * FROM Settings LIMIT 1", (err, row) => {
        if (err) return res.status(500).json({ error: "Ошибка сервера" });
        res.json(row || {});
    });
});

app.post("/api/settings", (req, res) => {
    const {
        siteTitle, siteDescription, logo, contacts, socialLinks, newsCount, useRecaptcha
    } = req.body;

    const settingsJson = {
        siteTitle,
        siteDescription,
        logo,
        contacts: JSON.stringify(contacts),
        socialLinks: JSON.stringify(socialLinks),
        newsCount,
        useRecaptcha
    };

    db.run(`
        INSERT OR REPLACE INTO Settings (id, siteTitle, siteDescription, logo, contacts, socialLinks, newsCount, useRecaptcha)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?)
    `,
        [
            settingsJson.siteTitle,
            settingsJson.siteDescription,
            settingsJson.logo,
            settingsJson.contacts,
            settingsJson.socialLinks,
            settingsJson.newsCount,
            settingsJson.useRecaptcha ? 1 : 0
        ],
        (err) => {
            if (err) return res.status(500).json({ error: "Ошибка сохранения" });
            res.json({ success: true });
        }
    );
});

app._router.stack.forEach(r => {
  if (r.route && r.route.path) {
    console.log("Route:", r.route.path);
  }
});

