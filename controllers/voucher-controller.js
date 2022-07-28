const voucherService = require('../services/voucher-service');
const accountService = require('../services/account-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAll = async (req, res) => {
  try {
    const response = await voucherService.getAll();
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllByUser = async (req, res) => {
  try {
    const user = await accountService.checkUser(req.body.username);
    const response = await voucherService.getAllByIdUserType(user.id_userType);
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.postOne = async (req, res) => {
  try {
    await voucherService.postOne(req.body);
    const response = await voucherService.getAll();
    res.status(SUCCESS_STATUS.CREATED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await voucherService.deleteOne(req.params.id);
    const response = await voucherService.getAll();
    res.status(SUCCESS_STATUS.DELETED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const response = await voucherService.findById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updatedVoucher = {
      id: parseInt(req.params.id, 10),
      percent: parseInt(req.body.percent, 10),
      expired: req.body.expired,
      code: req.body.code,
      quantity: parseInt(req.body.quantity, 10),
      min_bill: parseInt(req.body.min_bill, 10),
      id_userType: parseInt(req.body.id_userType, 10),
    };
    await voucherService.updateOne(updatedVoucher);
    const response = await voucherService.getAll();
    res.status(SUCCESS_STATUS.UPDATED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
