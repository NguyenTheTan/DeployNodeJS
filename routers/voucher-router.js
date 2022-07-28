const express = require('express');

const router = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const voucherController = require('../controllers/voucher-controller');
const voucherMiddleware = require('../middlewares/voucher-middleware');

router.get('/vouchers', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  voucherController.getAll,
]);

router.get('/voucher', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  voucherController.getAllByUser,
]);

router.get('/vouchers/:id', voucherController.findById);

router.delete('/vouchers/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  voucherController.deleteOne,
]);

router.post('/vouchers', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  voucherMiddleware.validateVoucher,
  voucherController.postOne,
]);

router.put('/vouchers/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  voucherMiddleware.validateVoucher,
  voucherController.updateOne,
]);
module.exports = router;
