const validator = require('../utils/validator');
const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.validateLoginFields = (req, res, next) => {
  if (typeof req.body.username === 'string') {
    req.body.username = req.body.username.trim();
  }
  const result = validator.validateLogin(req.body);
  if (!result.valid) {
    const error = [];
    let i = 0;
    result.errors.forEach((element) => {
      const err = { property: element.property, message: element.message };
      error[i] = err;
      i += 1;
    });
    return res.status(ERROR_STATUS.INVALID_REQUEST).send({
      status: ERROR_STATUS.INVALID_REQUEST,
      error: {
        errorCode: ERROR_CODE.INVALID_REQUEST,
        errorMessage: error,
      },
    });
  }
  return next();
};
exports.validateSignUpFields = (req, res, next) => {
  if (typeof req.body.username === 'string') {
    req.body.username = req.body.username.trim();
  }
  const result = validator.validateSignUp(req.body);
  if (!result.valid) {
    const error = [];
    let i = 0;
    result.errors.forEach((element) => {
      const err = { property: element.property, message: element.message };
      error[i] = err;
      i += 1;
    });
    return res.status(ERROR_STATUS.INVALID_REQUEST).send({
      status: ERROR_STATUS.INVALID_REQUEST,
      error: {
        errorCode: ERROR_CODE.INVALID_REQUEST,
        errorMessage: error,
      },
    });
  }
  return next();
};
exports.validateUpdateInfo = (req, res, next) => {
  if (typeof req.body.email === 'string') {
    req.body.email = req.body.email.trim();
  }
  const result = validator.validateUpdateInfo(req.body);
  if (!result.valid) {
    const error = [];
    let i = 0;
    result.errors.forEach((element) => {
      const err = { property: element.property, message: element.message };
      error[i] = err;
      i += 1;
    });
    return res.status(ERROR_STATUS.INVALID_REQUEST).send({
      status: ERROR_STATUS.INVALID_REQUEST,
      error: {
        errorCode: ERROR_CODE.INVALID_REQUEST,
        errorMessage: error,
      },
    });
  }
  return next();
};

exports.validateUpdatePassword = (req, res, next) => {
  if (typeof req.body.oldPassword === 'string') {
    req.body.oldPassword = req.body.oldPassword.trim();
  }
  if (typeof req.body.newPassword === 'string') {
    req.body.newPassword = req.body.newPassword.trim();
  }
  if (typeof req.body.confirmPassword === 'string') {
    req.body.confirmPassword = req.body.confirmPassword.trim();
  }
  const result = validator.validateUpdatePassword(req.body);
  if (!result.valid) {
    const error = [];
    let i = 0;
    result.errors.forEach((element) => {
      const err = { property: element.property, message: element.message };
      error[i] = err;
      i += 1;
    });
    return res.status(ERROR_STATUS.INVALID_REQUEST).send({
      status: ERROR_STATUS.INVALID_REQUEST,
      error: {
        errorCode: ERROR_CODE.INVALID_REQUEST,
        errorMessage: error,
      },
    });
  }
  return next();
};
