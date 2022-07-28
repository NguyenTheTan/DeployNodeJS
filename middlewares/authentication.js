const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');
// const dotenv = require('dotenv').config();
const accountService = require('../services/account-service');
const errorMessages = require('../utils/error-messages');

/**
 * Validate access token
 * @param req header info
 * @returns
 */
exports.checkAccessToken = (req, res, next) => {
  // Check header for the token
  const accessToken = req.headers['bookstore-access-token'];
  // Check token exist
  if (!accessToken) {
    res.status(ERROR_STATUS.UNAUTHORIZED).send({
      status: ERROR_STATUS.UNAUTHORIZED,
      error: {
        errorCode: ERROR_CODE.UNAUTHORIZED,
        message: 'Không tìm thấy access-token',
      },
    });
    return;
  }

  // Verify token
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    { ignoreExpiration: true },
    async (err, decoded) => {
      if (err) {
        return res.status(ERROR_STATUS.UNAUTHORIZED).send({
          errorCode: ERROR_CODE.UNAUTHORIZED,
          message: 'Access token không hợp lệ',
        });
      }

      const data = decoded.dataForAccessToken;
      const user = await accountService.checkUser(data.username);
      if (user === undefined || user.role !== data.role) {
        return res.status(ERROR_STATUS.UNAUTHORIZED).send({
          errorCode: ERROR_CODE.UNAUTHORIZED,
          message: 'Không thể xác thực',
        });
      }
      req.body.username = data.username;
      next();
      return true;
    }
  );
};
/**
 * Validate access token
 * @param req header info
 * @returns
 */
exports.authAccessToken = (req, res, next) => {
  // Check header for the token
  const accessToken = req.headers['bookstore-access-token'];
  // Verify token
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    { ignoreExpiration: false },
    async (err) => {
      if (err) {
        const userModel = await accountService.checkUser(req.body.username);
        const newToken = accountService.createToken(userModel);
        const newAccessToken = newToken.accessToken;
        return res.status(ERROR_STATUS.UNAUTHORIZED).send({
          errorCode: ERROR_CODE.UNAUTHORIZED,
          message: 'Access token đã hết hạn',
          newAccessToken,
        });
      }
      next();
      return true;
    }
  );
};

/**
 * Validate refresh token
 * @param req body info
 * @returns
 */
exports.authRefreshToken = (req, res, next) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  try {
    // Get refresh token from body
    const refreshToken = req.headers['bookstore-refresh-token'];

    // Check token exist
    if (!refreshToken) {
      res.status(ERROR_STATUS.UNAUTHORIZED).send({
        errorCode: ERROR_CODE.UNAUTHORIZED,
        message: 'Không tìm thấy refresh-token',
      });
      return;
    }

    // Verify refresh token
    jwt.verify(refreshToken, accessTokenSecret, async (err, decoded) => {
      if (err) {
        return res.status(ERROR_STATUS.UNAUTHORIZED).send({
          errorCode: ERROR_CODE.UNAUTHORIZED,
          message: 'Không thể xác thực',
        });
      }

      // Validate refresh token
      const loginInfo = await accountService.checkUser(req.body.username);
      const user = JSON.stringify({
        id: loginInfo.id,
        username: loginInfo.username,
        password: loginInfo.password,
        role: loginInfo.role,
        status: loginInfo.status,
      });
      const isUserValid = bcrypt.compareSync(user, decoded.dataForRefreshToken);
      if (!isUserValid) {
        return res.status(ERROR_STATUS.UNAUTHORIZED).send({
          errorCode: ERROR_CODE.UNAUTHORIZED,
          message: 'Không thể xác thực',
        });
      }
      return next();
    });
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.checkIsAdmin = async (req, res, next) => {
  try {
    const userModel = await accountService.checkUser(req.body.username);
    if (parseInt(userModel.role, 10) !== 0) {
      res.status(ERROR_STATUS.ACCESS_DENIED).send({
        errorCode: ERROR_CODE.ACCESS_DENIED,
        message: 'Không có quyền thực hiện thao tác',
      });
      return;
    }
    next();
  } catch (err) {
    errorMessages(req, res, err);
  }
};
