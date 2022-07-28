const { ERROR_CODE, ERROR_STATUS } = require('./constants');

/**
 * Create login info
 * @param {Object} req express request for using i18next
 * @param {Object} res express response
 * @param {Object} err contains statusCode, errorCode, messageId
 */
module.exports = (req, res, err = {}) => {
  try {
    res.setHeader('Content-Type', 'text/plain');
    const messageObj = JSON.parse(err.message);
    res.statusCode = messageObj.statusCode;
    res.send({
      errorCode: messageObj.errorCode,
      message: messageObj.messageId,
    });
  } catch (error) {
    if (err.sqlMessage) {
      res.statusCode = ERROR_STATUS.INTERNAL_ERROR;
      res.send({
        errorCode: ERROR_CODE.INTERNAL_ERROR,
        message: err.message,
      });
    } else {
      res.statusCode = ERROR_STATUS.INTERNAL_ERROR;
      res.send({
        errorCode: ERROR_CODE.INTERNAL_ERROR,
        message: 'Lỗi hệ thống',
      });
    }
  }
};
