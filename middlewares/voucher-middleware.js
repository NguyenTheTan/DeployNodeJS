const validator = require('../utils/validator');
const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.validateVoucher = (req, res, next) => {
  if (typeof req.body.code === 'string') {
    req.body.code = req.body.code.trim();
  }
  if (typeof req.body.expired === 'string' && req.body.expired.length > 0) {
    const [date] = req.body.expired.split('T');
    req.body.expired = date;
  }
  req.body.percent = req.body.percent.toString();
  req.body.quantity = req.body.quantity.toString();
  req.body.min_bill = req.body.min_bill.toString();
  req.body.id_userType = req.body.id_userType.toString();
  const result = validator.validateVoucher(req.body);
  if (!result.valid) {
    res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
      errorCode: ERROR_CODE.INVALID_REQUEST,
      message: 'Invalid request',
    });
    return;
  }
  next();
};
