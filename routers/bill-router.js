const express = require('express');

const routes = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const bill = require('../controllers/bill-controller');

routes.post('/checkout', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  bill.generateBillController,
]);
routes.get('/confirmBill', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bill.getUnConfirmredBillController,
]);
routes.post('/confirmBill/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bill.confirmBillController,
]);
routes.get('/allBill', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bill.getAllBillController,
]);
routes.get('/bill/:code', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  bill.getBillByCodeController,
]);
routes.get('/allBill/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  bill.getBillByIdController,
]);
routes.get('/bill/', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  bill.getBillByUserController,
]);
module.exports = routes;
