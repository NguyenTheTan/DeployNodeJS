const categoryModel = require('../models/category-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const listCategory = await categoryModel.getAll();
  if (listCategory.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy danh mục',
      })
    );
  }
  return listCategory;
};

exports.getAllAsAdmin = async () => {
  const listCategory = await categoryModel.getAllAsAdmin();
  if (listCategory.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy danh mục',
      })
    );
  }
  return listCategory;
};

exports.postOne = (cateInfo) => {
  const category = categoryModel.postOne(cateInfo);
  return category;
};

exports.deleteOne = async (cateId, toggleInfo) => {
  const checkCategory = await categoryModel.findById(cateId);
  if (checkCategory.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy danh mục',
      })
    );
  }
  let option;
  if (checkCategory[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const category = await categoryModel.toggleActive(cateId, toggleInfo, option);
  return category;
};

exports.findById = async (cateId) => {
  const category = await categoryModel.findById(cateId);
  if (category.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy danh mục',
      })
    );
  }
  return category[0];
};

exports.updateOne = async (cateId, cateInfo) => {
  const checkCategory = await categoryModel.findById(cateId);
  if (checkCategory.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy danh mục',
      })
    );
  }
  const category = await categoryModel.updateOne(cateId, cateInfo);
  return category;
};
