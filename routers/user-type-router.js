const express = require('express');

const router = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const userTypeController = require('../controllers/user-type-controller');
const userTypeMiddleware = require('../middlewares/user-type-middleware');

router.get('/types', userTypeController.getAll);

router.get('/types/:id', userTypeController.findById);

router.delete('/types/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  userTypeController.deleteOne,
]);

router.post('/types', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  userTypeMiddleware.validateUserType,
  userTypeController.postOne,
]);

router.put('/types/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  userTypeMiddleware.validateUserType,
  userTypeController.updateOne,
]);
module.exports = router;
