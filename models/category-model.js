const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const result = await db.query(
    'SELECT id, name FROM category WHERE isActive = 1'
  );
  return result;
};

exports.getAllAsAdmin = async () => {
  const result = await db.query('SELECT id, name, isActive FROM category');
  return result;
};

exports.postOne = async (cateInfo) => {
  const result = await db.query(
    `INSERT INTO category(name, created_at, created_by, isActive) VALUES ('${cateInfo.name}', '${cateInfo.created_at}', ${cateInfo.created_by}, 1)`
  );
  return result;
};

exports.toggleActive = async (cateId, deleteInfo, option) => {
  const result = await db.query(
    `UPDATE category SET isActive = ${option}, updated_at = '${deleteInfo.updated_at}', updated_by = '${deleteInfo.updated_by}' WHERE id = ${cateId}`
  );
  return result;
};

exports.findById = async (cateId) => {
  if (Number.isNaN(cateId)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy danh mục',
      })
    );
  }
  const result = await db.query(`SELECT * FROM category WHERE id = ${cateId}`);
  return result;
};

exports.updateOne = async (cateId, cateInfo) => {
  const result = await db.query(
    `UPDATE category SET name = '${cateInfo.name}', updated_at = '${cateInfo.updated_at}', updated_by = '${cateInfo.updated_by}' WHERE id = ${cateId}`
  );
  return result;
};
