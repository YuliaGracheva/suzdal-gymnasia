const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
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


function checkAndCreateTable(tableName, createTableQuery) {
    db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, row) => {
        if (err) {
            console.error(`Error checking table ${tableName}:`, err.message);
        }
        if (!row) {
            db.run(createTableQuery, (err) => {
                if (err) {
                    console.error(`Error creating table ${tableName}:`, err.message);
                } else {
                    console.log(`Table ${tableName} created.`);
                }
            });
        } else {
            console.log(`Table ${tableName} already exists.`);
        }
    });
}


db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");

    checkAndCreateTable("User", `CREATE TABLE User (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL,
    Login TEXT NOT NULL,
    Password TEXT NOT NULL
  )`);

    checkAndCreateTable("EmployeeCategory", `CREATE TABLE EmployeeCategory (
    EmployeeCategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmployeeCategoryName TEXT NOT NULL
  )`);

    checkAndCreateTable("Employee", `CREATE TABLE Employee (
    EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmployeeSurname TEXT NOT NULL,
    EmployeeName TEXT NOT NULL,
    EmployeePatronymic TEXT,
    EmployeePost TEXT NOT NULL,
    EmployeePhoto TEXT,
    EmployeeCategoryID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (EmployeeCategoryID) REFERENCES EmployeeCategory(EmployeeCategoryID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  )`);


    checkAndCreateTable("CategoryDocument", `CREATE TABLE CategoryDocument (
    CategoryDocumentID INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryDocumentName TEXT NOT NULL
  )`);

    checkAndCreateTable("Document", `CREATE TABLE Document (
    DocumentID INTEGER PRIMARY KEY AUTOINCREMENT,
    DocumentPath TEXT NOT NULL,
    CategoryDocumentID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (CategoryDocumentID) REFERENCES CategoryDocument(CategoryDocumentID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  )`);

    checkAndCreateTable("ManagementBodies", `CREATE TABLE ManagementBodies (
    ManagementBodiesID INTEGER PRIMARY KEY AUTOINCREMENT,
    ManagementBodiesName TEXT NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  )`);

    checkAndCreateTable("Message", `CREATE TABLE Message (
    MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
    MessageTheme TEXT NOT NULL,
    MessageText TEXT NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  )`);

    checkAndCreateTable("Status", `CREATE TABLE Status (
    StatusID INTEGER PRIMARY KEY AUTOINCREMENT,
    StatusName TEXT NOT NULL
  )`);


    checkAndCreateTable("Subject", `CREATE TABLE Subject (
    SubjectID INTEGER PRIMARY KEY AUTOINCREMENT,
    SubjectName TEXT NOT NULL
  )`);

    checkAndCreateTable("Olympiad", `CREATE TABLE Olympiad (
    OlympiadID INTEGER PRIMARY KEY AUTOINCREMENT,
    OlympiadSurname TEXT NOT NULL,
    OlympiadName TEXT NOT NULL,
    OlympiadClass TEXT NOT NULL,
    OlympiadQuanityPoints INTEGER NOT NULL,
    OlympiadPlace INTEGER NOT NULL,
    StatusID INTEGER NOT NULL,
    SubjectID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (StatusID) REFERENCES Status(StatusID),
    FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  )`);


    checkAndCreateTable("News", `CREATE TABLE News (
    NewsID INTEGER PRIMARY KEY AUTOINCREMENT,
    NewsTheme TEXT NOT NULL,
    NewsText TEXT NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  )`);

    checkAndCreateTable("PhotoNews", `CREATE TABLE PhotoNews (
    PhotoNewsID INTEGER PRIMARY KEY AUTOINCREMENT,
    PhotoPath TEXT NOT NULL
  )`);

    checkAndCreateTable("PhotoNewsNews", `CREATE TABLE PhotoNewsNews (
    PhotoNewsNewsID INTEGER PRIMARY KEY AUTOINCREMENT,
    PhotoNewsID INTEGER NOT NULL,
    NewsID INTEGER NOT NULL,
    FOREIGN KEY (PhotoNewsID) REFERENCES PhotoNews(PhotoNewsID),
    FOREIGN KEY (NewsID) REFERENCES News(NewsID)
  )`);

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

app.use(express.static('scripts'));