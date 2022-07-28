const validator = require('../utils/validator');
const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.validateBook = (req, res, next) => {
  if (typeof req.body.name === 'string') {
    req.body.name = req.body.name.trim();
  }
  if (typeof req.body.description === 'string') {
    req.body.description = req.body.description.trim();
  }
  if (typeof req.body.pub_date === 'string' && req.body.pub_date.length > 0) {
    const [date] = req.body.pub_date.split('T');
    req.body.pub_date = date;
  }
  const result = validator.validateBook(req.body);
  if (!result.valid) {
    res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
      errorCode: ERROR_CODE.INVALID_REQUEST,
      message: result.errors.map((e) => e.message),
    });
    return;
  }
  next();
};
