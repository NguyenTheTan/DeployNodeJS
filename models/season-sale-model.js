const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM season_sale');
  return result;
};

exports.postOne = async (saleInfo) => {
  const result = await db.query(
    `INSERT INTO season_sale(name, percent, endDate, created_at, created_by) VALUES ('${saleInfo.name}', ${saleInfo.percent}, '${saleInfo.endDate}', '${saleInfo.created_at}', ${saleInfo.created_by})`
  );
  return result;
};

exports.deleteOne = async (saleId, saleInfo, option) => {
  const result = await db.query(
    `UPDATE season_sale SET isActive = ${option}, updated_at = '${saleInfo.updated_at}', updated_by = ${saleInfo.updated_by} WHERE id = ${saleId}`
  );
  return result;
};

exports.findById = async (saleId) => {
  if (Number.isNaN(saleId)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy chương trình sale',
      })
    );
  }
  const result = await db.query(
    `SELECT * FROM season_sale WHERE id = ${saleId}`
  );
  return result;
};

exports.updateOne = async (saleInfo) => {
  const result = await db.query(
    `UPDATE season_sale SET name = '${saleInfo.name}', percent = ${saleInfo.percent}, endDate = '${saleInfo.endDate}', updated_at = '${saleInfo.updated_at}', updated_by = ${saleInfo.updated_by} WHERE id = ${saleInfo.id}`
  );
  return result;
};
