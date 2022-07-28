const express = require('express');

const router = express.Router();
const fileUpload = require('express-fileupload');
const authenMiddleware = require('../middlewares/authentication');
const bookController = require('../controllers/book-controller');
const bookMiddleware = require('../middlewares/book-middleware');
const uploadMiddleware = require('../middlewares/file-upload-middleware');

router.get('/books', bookController.getAll);

router.get('/admin/books', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookController.getAllAsAdmin,
]);

router.get('/books/category/:cateId', bookController.getAllByCategoryId);

router.get('/admin/books/category/:cateId', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookController.getAllByCategoryIdAsAdmin,
]);

router.get('/books/publisher/:pubId', bookController.getAllByPublisherId);

router.get('/admin/books/publisher/:pubId', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookController.getAllByPublisherIdAsAdmin,
]);

router.get('/books/search/:search?', bookController.getAllBySearchText);

router.get('/admin/books/search/:search?', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookController.getAllBySearchTextAsAdmin,
]);

router.get('/books/:id', bookController.findById);

router.get('/admin/book/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookController.findByIdAsAdmin,
]);

router.delete('/books/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookController.deleteOne,
]);

router.post('/books', fileUpload(), [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookMiddleware.validateBook,
  uploadMiddleware.checkFileExisted,
  uploadMiddleware.checkFileType,
  bookController.postOne,
]);

router.put('/books/:id', fileUpload(), [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bookMiddleware.validateBook,
  uploadMiddleware.checkFileType,
  bookController.updateOne,
]);
module.exports = router;
