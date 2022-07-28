const validator = require('../utils/validator');
const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.validateCategory = (req, res, next) => {
  if (typeof req.body.name === 'string') {
    req.body.name = req.body.name.trim();
  }
  const result = validator.validateCategory(req.body);

  if (!result.valid) {
    res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
      errorCode: ERROR_CODE.INVALID_REQUEST,
      message: 'Invalid request',
    });
    return;
  }
  next();
};
