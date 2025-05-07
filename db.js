const { computeHeadingLevel } = require('@testing-library/dom');
const sql = require('mssql');

require("dotenv").config();

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: { 
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to db');
        return pool;
    })
    .catch(err => {
        console.error('Db connection failed: ', err);
        process.exit(1); 
    });

module.exports ={
    sql, 
    poolPromise
};
