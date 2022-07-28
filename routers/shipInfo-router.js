const express = require('express');

const routes = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const shipInfo = require('../controllers/shipInfo-controller');

routes.get('/shipInfo', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  shipInfo.getAllShipInfoController,
]);
routes.post('/shipInfo', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  shipInfo.createShipInfoController,
]);

routes.get('/shipInfo/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  shipInfo.getShipInfoByIdController,
]);

routes.put('/shipInfo/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  shipInfo.updateShipInfoController,
]);

routes.delete('/shipInfo/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  shipInfo.deleteShipInfoController,
]);
routes.get('/province/', [shipInfo.getAllProvinceController]);
routes.get('/province/:key', [shipInfo.searchProvinceController]);
routes.get('/district/:key', [shipInfo.searchDistrictByProvinceController]);
routes.post('/district/', [shipInfo.getAllDistrictByProvinceController]);
routes.post('/wards/', [shipInfo.getAllWardsByDistrictController]);
routes.get('/wards/:key', [shipInfo.searchWardsByDistrictController]);
module.exports = routes;
