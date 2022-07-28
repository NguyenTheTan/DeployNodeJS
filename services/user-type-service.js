const userTypeModel = require('../models/user-type-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const listUserType = await userTypeModel.getAll();
  if (listUserType.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy loại user',
      })
    );
  }
  return listUserType;
};

exports.postOne = async (userTypeInfo) => {
  const userType = userTypeModel.postOne(userTypeInfo);
  return userType;
};

exports.deleteOne = async (id) => {
  const checkType = await userTypeModel.findById(id);
  if (checkType.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy loại user',
      })
    );
  }
  let option;
  if (checkType[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const userType = await userTypeModel.deleteOne(id, option);
  return userType;
};

exports.updateOne = async (id, userTypeInfo) => {
  const checkType = await userTypeModel.findById(id);
  if (checkType.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy loại user',
      })
    );
  }
  const userType = await userTypeModel.updateOne(id, userTypeInfo);
  return userType;
};

exports.findById = async (id) => {
  const userType = await userTypeModel.findById(id);
  if (userType.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy loại user',
      })
    );
  }
  return userType[0];
};
