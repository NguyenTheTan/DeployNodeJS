const ratingService = require('../services/rating-service');
const accountService = require('../services/account-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.addRating = async (req, res) => {
  try {
    const data = req.body;
    const user = await accountService.checkUser(data.username);
    data.id_user = user.id;
    const ratings = await ratingService.addRating(data);
    res.status(SUCCESS_STATUS.CREATED).json(ratings);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
