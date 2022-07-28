require('dotenv').config();
const mysql = require('mysql2/promise');

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dateStrings: 'date',
};

const query = async (sqlQuery) => {
  try {
    const connection = await mysql.createConnection(dbconfig);
    await connection.beginTransaction();
    const result = await connection.query(sqlQuery);
    await connection.commit();
    await connection.end();
    return result[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
const queryTransaction = async (queries) => {
  const connection = await mysql.createConnection(dbconfig);
  try {
    await connection.beginTransaction();
    const result1 = await connection.query(queries[0]);
    const queryPromises = [];
    queries.slice(1).forEach((q) => {
      queryPromises.push(connection.query(q, result1[0].insertId));
    });
    const results = await Promise.all(queryPromises);
    await connection.commit();
    await connection.end();
    return results[0];
  } catch (error) {
    await connection.rollback();
    await connection.end();
    return Promise.reject(error);
  }
};
module.exports = { query, queryTransaction };
