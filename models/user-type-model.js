const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM user_type');
  return result;
};

exports.postOne = async (userTypeInfo) => {
  const result = await db.query(
    `INSERT INTO user_type(type, total_bill) VALUES ('${userTypeInfo.type}', ${userTypeInfo.total_bill})`
  );
  return result;
};

exports.deleteOne = async (userTypeId, option) => {
  const result = await db.query(
    `UPDATE user_type SET isActive = ${option} WHERE id = ${userTypeId}`
  );
  return result;
};

exports.updateOne = async (id, userTypeInfo) => {
  const result = await db.query(
    `UPDATE user_type SET type = '${userTypeInfo.type}', total_bill = ${userTypeInfo.total_bill} WHERE id = ${id}`
  );
  return result;
};

exports.findById = async (id) => {
  if (Number.isNaN(id)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy loại user',
      })
    );
  }
  const result = await db.query(`SELECT * FROM user_type WHERE id = ${id}`);
  return result;
};
