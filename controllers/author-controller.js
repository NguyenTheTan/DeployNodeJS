const authorService = require('../services/author-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAllAuthorController = async (req, res) => {
  try {
    const listAuthor = await authorService.getAllAuthor();
    res.status(SUCCESS_STATUS.SUCCESS).send(listAuthor);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getAuthorByIdController = async (req, res) => {
  try {
    const author = await authorService.getAuthor(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(author);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.createAuthorController = async (req, res) => {
  try {
    await authorService.createAuthor(req.params.name);
    res.status(SUCCESS_STATUS.SUCCESS).send('Them thanh cong');
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.updateAuthorController = async (req, res) => {
  try {
    const { name, about } = req.body;
    await authorService.updateAuthor(req.params.id, name, about);
    res.status(SUCCESS_STATUS.SUCCESS).send('Update thanh cong');
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.deleteAuthorController = async (req, res) => {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send('Xoa thanh cong');
  } catch (err) {
    errorMessages(req, res, err);
  }
};
