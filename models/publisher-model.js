const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM publisher');
  return result;
};

exports.postOne = async (pubName) => {
  const result = await db.query(
    `INSERT INTO publisher(name) VALUES ('${pubName}')`
  );
  return result;
};

exports.deleteOne = async (pubId, option) => {
  const result = await db.query(
    `UPDATE publisher SET isActive = ${option} WHERE id = ${pubId}`
  );
  return result;
};

exports.findByName = async (name) => {
  const result = await db.query(
    `SELECT * FROM publisher WHERE name = "${name}"`
  );
  return result;
};
exports.findById = async (id) => {
  if (Number.isNaN(id)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy nhà xuất bản',
      })
    );
  }
  const result = await db.query(`SELECT * FROM publisher WHERE id = "${id}"`);
  return result;
};

exports.updateOne = async (pubId, pubName) => {
  const result = await db.query(
    `UPDATE publisher SET name = '${pubName}' WHERE id = ${pubId}`
  );
  return result;
};

exports.findById = async (pubId) => {
  const result = await db.query(`SELECT * FROM publisher WHERE id = ${pubId}`);
  return result;
};
