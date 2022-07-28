const saleModel = require('../models/season-sale-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const listSale = await saleModel.getAll();
  if (listSale.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy chương trình sale',
      })
    );
  }
  return listSale;
};

exports.postOne = async (saleInfo) => {
  const sale = saleModel.postOne(saleInfo);
  return sale;
};

exports.deleteOne = async (saleId, saleInfo) => {
  const checkSale = await saleModel.findById(saleId);
  if (checkSale.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy chương trình sale',
      })
    );
  }
  let option;
  if (checkSale[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const sale = await saleModel.deleteOne(saleId, saleInfo, option);
  return sale;
};

exports.findById = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (sale.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy chương trình sale',
      })
    );
  }
  return sale[0];
};

exports.updateOne = async (saleInfo) => {
  const checkSale = await saleModel.findById(saleInfo.id);
  if (checkSale.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy chương trình sale',
      })
    );
  }
  const sale = await saleModel.updateOne(saleInfo);
  return sale;
};
