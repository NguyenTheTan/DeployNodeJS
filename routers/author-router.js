const express = require('express');

const routes = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const author = require('../controllers/author-controller');

routes.get('/author', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  author.getAllAuthorController,
]);
routes.post('/author', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  author.createAuthorController,
]);

routes.get('/author/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  author.getAuthorByIdController,
]);

routes.put('/author/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  author.updateAuthorController,
]);

routes.delete('/author/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  author.deleteAuthorController,
]);
module.exports = routes;
