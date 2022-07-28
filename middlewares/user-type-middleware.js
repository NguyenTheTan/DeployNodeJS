const validator = require('../utils/validator');
const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.validateUserType = (req, res, next) => {
  if (typeof req.body.type === 'string') {
    req.body.type = req.body.type.trim();
  }
  req.body.total_bill = parseFloat(req.body.total_bill);
  const result = validator.validateUserType(req.body);
  if (!result.valid) {
    res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
      errorCode: ERROR_CODE.INVALID_REQUEST,
      message: 'Invalid request',
    });
    return;
  }
  next();
};
