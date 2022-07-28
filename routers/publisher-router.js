const express = require('express');

const router = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const publisherController = require('../controllers/publisher-controller');
const publisherMiddleware = require('../middlewares/publisher-middleware');

router.get('/publishers', publisherController.getAll);

router.get('/publishers/:id', publisherController.findById);

router.delete('/publishers/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  publisherController.deleteOne,
]);

router.post('/publishers', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  publisherMiddleware.validatePublisher,
  publisherController.postOne,
]);

router.put('/publishers/:id', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  authenMiddleware.checkIsAdmin,
  publisherMiddleware.validatePublisher,
  publisherController.updateOne,
]);
module.exports = router;
