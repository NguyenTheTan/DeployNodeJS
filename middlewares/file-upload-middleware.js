const { ERROR_STATUS, ERROR_CODE } = require('../utils/constants');

exports.checkFileExisted = (req, res, next) => {
  if (req.files == null || req.files.photo === undefined) {
    res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
      errorCode: ERROR_CODE.INVALID_REQUEST,
      message: 'File not found',
    });
    return;
  }
  next();
};

exports.checkFileType = (req, res, next) => {
  if (req.files != null) {
    const file = req.files.photo;
    const validTypes = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];
    if (!validTypes.includes(file.mimetype)) {
      res.status(ERROR_STATUS.SERVICE_UNAVAILABLE).send({
        errorCode: ERROR_CODE.INVALID_REQUEST,
        message: 'Invalid file types',
      });
      return;
    }
  }
  next();
};
