const shipInfoModel = require('../models/shipInfo-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAllShipInfo = async (id_user) => {
  const listShipInfo = await shipInfoModel.getAllShipInfo(id_user);
  if (listShipInfo.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin giao hàng',
      })
    );
  }
  return listShipInfo;
};

exports.getShipInfo = async (id, id_user) => {
  const shipInfo = await shipInfoModel.getShipInfoById(id, id_user);
  if (shipInfo.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin giao hàng',
      })
    );
  }
  return shipInfo[0];
};
exports.createShipInfo = async (args) => {
  const shipInfo = await shipInfoModel.insertShipInfo(args);
  return shipInfo;
};
exports.updateShipInfo = async (args) => {
  const checkShipInfo = await shipInfoModel.getShipInfoById(
    args.id,
    args.id_user
  );
  if (checkShipInfo.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin giao hàng',
      })
    );
  }
  const shipInfo = await shipInfoModel.updateShipInfoById(args);
  return shipInfo;
};
exports.deleteShipInfo = async (id, id_user) => {
  const checkShipInfo = await shipInfoModel.getShipInfoById(id, id_user);
  if (checkShipInfo.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin giao hàng',
      })
    );
  }
  const shipInfo = await shipInfoModel.deleteShipInfoById(id, id_user);
  return shipInfo;
};

exports.searchProvince = async (key) => {
  const listProvince = await shipInfoModel.searchProvince(key);
  if (listProvince.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin tỉnh thành',
      })
    );
  }
  return listProvince;
};
exports.getAllProvince = async () => {
  const listProvince = await shipInfoModel.getAllProvince();
  if (listProvince.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin tỉnh thành',
      })
    );
  }
  return listProvince;
};
exports.getAllDistrictByProvince = async (id_province) => {
  const listDistrict = await shipInfoModel.getAllDistrictByProvince(
    id_province
  );
  if (listDistrict.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin quận huyện',
      })
    );
  }
  return listDistrict;
};
exports.searchDistrictByProvince = async (id_province, key) => {
  const listDistrict = await shipInfoModel.searchDistrictByProvince(
    id_province,
    key
  );
  if (listDistrict.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin quận huyện',
      })
    );
  }
  return listDistrict;
};
exports.searchWardsByDistrict = async (id_district, key) => {
  const listWards = await shipInfoModel.searchWardsByDistrict(id_district, key);
  if (listWards.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin phường xã',
      })
    );
  }
  return listWards;
};
exports.getAllWardsByDistrict = async (id_district) => {
  const listWards = await shipInfoModel.getAllWardsByDistrict(id_district);
  if (listWards.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy thông tin phường xã',
      })
    );
  }
  return listWards;
};
