const userTypeService = require('../services/user-type-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAll = async (req, res) => {
  try {
    const response = await userTypeService.getAll();
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.postOne = async (req, res) => {
  try {
    await userTypeService.postOne(req.body);
    const response = await userTypeService.getAll();
    res.status(SUCCESS_STATUS.CREATED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await userTypeService.deleteOne(req.params.id);
    const response = await userTypeService.getAll();
    res.status(SUCCESS_STATUS.DELETED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const response = await userTypeService.findById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    await userTypeService.updateOne(req.params.id, req.body);
    const response = await userTypeService.getAll();
    res.status(SUCCESS_STATUS.UPDATED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
