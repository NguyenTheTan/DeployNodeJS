const express = require('express');

const fileUpload = require('express-fileupload');

const routes = express.Router();
const accountMiddleware = require('../middlewares/account');
const authenMiddleware = require('../middlewares/authentication');
const uploadMiddleware = require('../middlewares/file-upload-middleware');
const account = require('../controllers/account-controller');
const router = require('./book-router');

routes.post('/login', [
  accountMiddleware.validateLoginFields,
  account.loginController,
]);

routes.post('/signup', [
  accountMiddleware.validateSignUpFields,
  account.signupController,
]);

routes.put('/user', fileUpload(), [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  accountMiddleware.validateUpdateInfo,
  uploadMiddleware.checkFileType,
  account.updateUserInfoAsUser,
]);

routes.put('/password', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  accountMiddleware.validateUpdatePassword,
  account.updateUserPassword,
]);

routes.put('/users/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  account.updateUserInfoAsAdmin,
]);

routes.get('/users', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  account.getAllUsers,
]);

router.get('/user', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  account.getUserAsUser,
]);

routes.get('/user/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  account.getUserById,
]);
module.exports = routes;
