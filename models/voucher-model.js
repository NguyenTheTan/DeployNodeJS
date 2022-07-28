const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM voucher');
  return result;
};

exports.getAllByIdUserType = async (id) => {
  const result = await db.query(
    `SELECT voucher.percent, voucher.expired, voucher.code, voucher.min_bill, voucher.quantity 
    FROM voucher JOIN user_type ON voucher.id_userType = user_type.id 
    WHERE voucher.id_userType = ${id} AND DATE(voucher.expired) >= DATE(NOW()) AND voucher.quantity > 0 AND voucher.isActive = 1 AND user_type.isActive = 1 AND voucher.percent > 0`
  );
  return result;
};

exports.postOne = async (voucherInfo) => {
  const result = await db.query(
    `INSERT INTO voucher(percent, expired, code, min_bill, id_userType, quantity) VALUES (${voucherInfo.percent}, '${voucherInfo.expired}', '${voucherInfo.code}', ${voucherInfo.min_bill}, ${voucherInfo.id_userType}, ${voucherInfo.quantity})`
  );
  return result;
};

exports.deleteOne = async (voucherId, option) => {
  const result = await db.query(
    `UPDATE voucher SET isActive = ${option} WHERE id = ${voucherId}`
  );
  return result;
};

exports.findById = async (voucherId) => {
  if (Number.isNaN(voucherId)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  const result = await db.query(
    `SELECT * FROM voucher WHERE id = ${voucherId}`
  );
  return result;
};

exports.checkIsValid = async (params) => {
  const result = await db.query(
    `SELECT * FROM voucher WHERE code = '${params.voucher_code}' and expired >= date(now()) and min_bill <= ${params.totalAmount} and id_userType = ${params.id_userType} and isActive = 1`
  );
  return result;
};

exports.updateOne = async (voucherInfo) => {
  const result =
    await db.query(`UPDATE voucher SET percent = ${voucherInfo.percent}, expired = '${voucherInfo.expired}', code = '${voucherInfo.code}',
    min_bill = ${voucherInfo.min_bill}, id_userType = ${voucherInfo.id_userType}, quantity = ${voucherInfo.quantity} WHERE id = ${voucherInfo.id}`);
  return result;
};
