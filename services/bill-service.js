const billModel = require('../models/bill-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAllBill = async () => {
  const listBill = await billModel.getAllBill();
  if (listBill.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy hóa đơn',
      })
    );
  }
  return listBill;
};
exports.getBillByUser = async (username) => {
  const listBill = await billModel.getBillByUser(username);
  if (listBill.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy hóa đơn',
      })
    );
  }
  return listBill;
};
exports.getUnConfirmredBill = async () => {
  const listBill = await billModel.getUnConfirmredBill();
  if (listBill.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy hóa đơn',
      })
    );
  }
  return listBill;
};
exports.getBillById = async (id) => {
  const bill = await billModel.getBillById(id);
  if (bill.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy hóa đơn',
      })
    );
  }
  return bill;
};
exports.getBillByCode = async (code) => {
  code = code.trim();
  const bill = await billModel.getBillByCode(code);
  if (bill.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy hóa đơn',
      })
    );
  }
  return bill[0];
};
exports.createBill = async (params) => {
  const bill = await billModel.createBill(params);
  return bill;
};
exports.confirmBill = async (id) => {
  const bill = await billModel.confirmBill(id);
  return bill;
};
