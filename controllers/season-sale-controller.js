const saleService = require('../services/season-sale-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAll = async (req, res) => {
  try {
    const response = await saleService.getAll();
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.postOne = async (req, res) => {
  try {
    const saleInfo = {
      name: req.body.name,
      percent: req.body.percent,
      endDate: req.body.endDate,
      created_at: new Date().toISOString().split('T')[0],
      created_by: 1,
    };
    await saleService.postOne(saleInfo);
    const response = await saleService.getAll();
    res.status(SUCCESS_STATUS.CREATED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const saleInfo = {
      updated_at: new Date().toISOString().split('T')[0],
      updated_by: 1,
    };
    await saleService.deleteOne(req.params.id, saleInfo);
    const response = await saleService.getAll();
    res.status(SUCCESS_STATUS.DELETED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const response = await saleService.findById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updatedSale = {
      id: req.params.id,
      name: req.body.name,
      percent: req.body.percent,
      endDate: req.body.endDate,
      updated_at: new Date().toISOString().split('T')[0],
      updated_by: 1,
    };
    await saleService.updateOne(updatedSale);
    const response = await saleService.findById(req.params.id);
    res.status(SUCCESS_STATUS.UPDATED).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
