const express = require('express');

const router = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const categoryController = require('../controllers/category-controller');
const categoryMiddleware = require('../middlewares/category-middleware');

router.get('/categories', categoryController.getAll);

router.get('/admin/categories', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  categoryController.getAllAsAdmin,
]);

router.get('/categories/:id', categoryController.findById);

router.delete('/categories/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  categoryController.deleteOne,
]);

router.post('/categories', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  categoryMiddleware.validateCategory,
  categoryController.postOne,
]);

router.put('/categories/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  categoryMiddleware.validateCategory,
  categoryController.updateOne,
]);
module.exports = router;
