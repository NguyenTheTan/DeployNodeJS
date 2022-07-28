const publisherService = require('../services/publisher-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAll = async (req, res) => {
  try {
    const response = await publisherService.getAll();
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.postOne = async (req, res) => {
  try {
    await publisherService.postOne(req.body.name);
    const publishers = await publisherService.getAll();
    res.status(SUCCESS_STATUS.CREATED).json(publishers);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await publisherService.deleteOne(req.params.id);
    const publishers = await publisherService.getAll();
    res.status(SUCCESS_STATUS.DELETED).json(publishers);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const response = await publisherService.findById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    await publisherService.updateOne(req.params.id, req.body.name);
    const publishers = await publisherService.getAll();
    res.status(SUCCESS_STATUS.UPDATED).json(publishers);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
