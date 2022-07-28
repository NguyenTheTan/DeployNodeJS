const validator = require('../utils/validator');
const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.validateSeasonSale = (req, res, next) => {
  if (typeof req.body.name === 'string') {
    req.body.name = req.body.name.trim();
  }
  if (typeof req.body.endDate === 'string' && req.body.endDate.length > 0) {
    const [date] = req.body.endDate.split('T');
    req.body.endDate = date;
  }
  req.body.percent = req.body.percent.toString();
  const result = validator.validateSeasonSale(req.body);

  if (!result.valid) {
    res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
      errorCode: ERROR_CODE.INVALID_REQUEST,
      message: 'Invalid request',
    });
    return;
  }
  next();
};
