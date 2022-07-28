const categoryService = require('../services/category-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

// Get all categories
exports.getAll = async (req, res) => {
  try {
    const response = await categoryService.getAll();
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllAsAdmin = async (req, res) => {
  try {
    const response = await categoryService.getAllAsAdmin();
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

// Add one category
exports.postOne = async (req, res) => {
  try {
    const categoryInfo = {
      name: req.body.name,
      created_at: new Date().toISOString().split('T')[0],
      created_by: 1,
    };
    await categoryService.postOne(categoryInfo);
    const categories = await categoryService.getAllAsAdmin();
    res.status(SUCCESS_STATUS.CREATED).json(categories);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

// Delete one category
exports.deleteOne = async (req, res) => {
  try {
    const deleteInfo = {
      updated_at: new Date().toISOString().split('T')[0],
      updated_by: 1,
    };
    await categoryService.deleteOne(req.params.id, deleteInfo);
    const categories = await categoryService.findById(req.params.id);
    res.status(SUCCESS_STATUS.DELETED).json(categories);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const response = await categoryService.findById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updateInfo = {
      name: req.body.name,
      updated_at: new Date().toISOString().split('T')[0],
      updated_by: 1,
    };
    await categoryService.updateOne(req.params.id, updateInfo);
    const categories = await categoryService.getAllAsAdmin();
    res.status(SUCCESS_STATUS.UPDATED).json(categories);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
