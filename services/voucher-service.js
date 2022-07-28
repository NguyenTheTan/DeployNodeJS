const voucherModel = require('../models/voucher-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const listVoucher = await voucherModel.getAll();
  if (listVoucher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  return listVoucher;
};

exports.getAllByIdUserType = async (id) => {
  const listVoucher = await voucherModel.getAllByIdUserType(id);
  if (listVoucher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  return listVoucher;
};

exports.postOne = async (voucherInfo) => {
  const voucher = voucherModel.postOne(voucherInfo);
  return voucher;
};

exports.deleteOne = async (voucherId) => {
  const checkVoucher = await voucherModel.findById(voucherId);
  if (checkVoucher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  let option;
  if (checkVoucher[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const sale = await voucherModel.deleteOne(voucherId, option);
  return sale;
};

exports.findById = async (voucherId) => {
  const voucher = await voucherModel.findById(voucherId);
  if (voucher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  return voucher[0];
};
exports.checkIsValid = async (params) => {
  params.voucher_code = params.voucher_code.toUpperCase();
  const voucher = await voucherModel.checkIsValid(params);
  if (voucher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  return voucher[0];
};

exports.updateOne = async (voucherInfo) => {
  const checkVoucher = await voucherModel.findById(voucherInfo.id);
  if (checkVoucher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy voucher',
      })
    );
  }
  const voucher = await voucherModel.updateOne(voucherInfo);
  return voucher;
};
