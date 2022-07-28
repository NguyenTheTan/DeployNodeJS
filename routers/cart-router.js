const express = require('express');

const routes = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const cart = require('../controllers/cart-controller');

routes.get('/cart', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  cart.getUserCartController,
]);
routes.post('/cart', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  cart.addBookToUserCartController,
]);
routes.put('/cart', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  cart.updateUserCartController,
]);
routes.delete('/cart', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  cart.deleteBookInUserCart,
]);
routes.get('/unAuthCart', [cart.getCartFromCookie]);
routes.post('/unAuthCart', [cart.addBookToCookieCart]);
routes.put('/unAuthCart', [cart.updateCookieCart]);
routes.delete('/unAuthCart', [cart.deleteBookInCookieCart]);

module.exports = routes;
