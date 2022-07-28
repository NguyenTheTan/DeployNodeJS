const express = require('express');

const router = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const saleController = require('../controllers/season-sale-controller');
const saleMiddleware = require('../middlewares/season-sale-middleware');

router.get('/sales', saleController.getAll);

router.get('/sales/:id', saleController.findById);

router.delete('/sales/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  saleController.deleteOne,
]);

router.post('/sales', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  saleMiddleware.validateSeasonSale,
  saleController.postOne,
]);

router.put('/sales/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  saleMiddleware.validateSeasonSale,
  saleController.updateOne,
]);
module.exports = router;
