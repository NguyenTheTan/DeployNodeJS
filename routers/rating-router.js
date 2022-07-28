const express = require('express');

const router = express.Router();
const authenMiddleware = require('../middlewares/authentication');
const ratingController = require('../controllers/rating-controller');

router.post('/rating', [
  authenMiddleware.checkAccessToken,
  authenMiddleware.authRefreshToken,
  authenMiddleware.authAccessToken,
  ratingController.addRating,
]);
module.exports = router;
