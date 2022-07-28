const shipInfoService = require('../services/shipInfo-service');
const accountService = require('../services/account-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAllShipInfoController = async (req, res) => {
  try {
    const user = await accountService.checkUser(req.body.username);
    const listShipInfo = await shipInfoService.getAllShipInfo(user.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(listShipInfo);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getShipInfoByIdController = async (req, res) => {
  try {
    const user = await accountService.checkUser(req.body.username);
    const shipInfo = await shipInfoService.getShipInfo(
      parseInt(req.params.id, 10),
      user.id
    );
    res.status(SUCCESS_STATUS.SUCCESS).send(shipInfo);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.createShipInfoController = async (req, res) => {
  try {
    const args = req.body;
    const user = await accountService.checkUser(args.username);
    args.id_user = user.id;
    const id = await shipInfoService.createShipInfo(args);
    res.status(SUCCESS_STATUS.SUCCESS).send({ id_shipInfo: id });
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.updateShipInfoController = async (req, res) => {
  try {
    const args = req.body;
    const user = await accountService.checkUser(args.username);
    args.id_user = user.id;
    args.id = parseInt(req.params.id, 10);
    await shipInfoService.updateShipInfo(args);
    res.status(SUCCESS_STATUS.SUCCESS).send('Update thành công');
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.deleteShipInfoController = async (req, res) => {
  try {
    const user = await accountService.checkUser(req.body.username);
    await shipInfoService.deleteShipInfo(req.params.id, user.id);
    res.status(SUCCESS_STATUS.SUCCESS).send('Xóa thành công');
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getAllProvinceController = async (req, res) => {
  try {
    const listProvince = await shipInfoService.getAllProvince();
    res.status(SUCCESS_STATUS.SUCCESS).send(listProvince);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.searchProvinceController = async (req, res) => {
  try {
    const listProvince = await shipInfoService.searchProvince(req.params.key);
    res.status(SUCCESS_STATUS.SUCCESS).send(listProvince);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.searchDistrictByProvinceController = async (req, res) => {
  try {
    const listDistrict = await shipInfoService.searchDistrictByProvince(
      req.body.id_province,
      req.params.key
    );
    res.status(SUCCESS_STATUS.SUCCESS).send(listDistrict);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getAllDistrictByProvinceController = async (req, res) => {
  try {
    const listDistrict = await shipInfoService.getAllDistrictByProvince(
      req.body.id_province
    );
    res.status(SUCCESS_STATUS.SUCCESS).send(listDistrict);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getAllWardsByDistrictController = async (req, res) => {
  try {
    const listWards = await shipInfoService.getAllWardsByDistrict(
      req.body.id_district
    );
    res.status(SUCCESS_STATUS.SUCCESS).send(listWards);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.searchWardsByDistrictController = async (req, res) => {
  try {
    const listWards = await shipInfoService.searchWardsByDistrict(
      req.body.id_district,
      req.params.key
    );
    res.status(SUCCESS_STATUS.SUCCESS).send(listWards);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
