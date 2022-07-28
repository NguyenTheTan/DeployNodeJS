/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginModel = require('../models/account-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getUser = async (username, password, loginType) => {
  const user = await loginModel.getUserByUsername(username);
  if (user.length === 0)
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Sai tên đăng nhập hoặc mật khẩu',
      })
    );
  const isPasswordValid = bcrypt.compareSync(password, user[0].password);
  if (!isPasswordValid)
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Sai tên đăng nhập hoặc mật khẩu',
      })
    );
  if (loginType != user[0].role)
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.ACCESS_DENIED,
        errorCode: ERROR_CODE.ACCESS_DENIED,
        messageId: 'Tài khoản này không có quyền truy cập',
      })
    );
  return user[0];
};

exports.checkUser = async (username) => {
  const user = await loginModel.getUserByUsername(username);
  if (user.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy user',
      })
    );
  }
  return user[0];
};

exports.createUser = async (username, password, email) => {
  const userByUsername = await loginModel.getUserByUsername(username);
  const userByEmail = await loginModel.getUserByEmail(email);
  if (userByUsername.length != 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.ACCOUNT_PROBLEM,
        errorCode: ERROR_CODE.ACCOUNT_PROBLEM,
        messageId: 'Tên đăng nhập đã tồn tại',
      })
    );
  }
  if (userByEmail.length != 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.ACCOUNT_PROBLEM,
        errorCode: ERROR_CODE.ACCOUNT_PROBLEM,
        messageId: 'Email này đã được sử dụng',
      })
    );
  }
  const createUser = await loginModel.signUp(
    username,
    bcrypt.hashSync(password, 5),
    email
  );
  return createUser;
};

exports.createToken = (loginObject) => {
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const dataForAccessToken = {
    username: loginObject.username,
    role: loginObject.role,
  };
  const user = {
    id: loginObject.id,
    username: loginObject.username,
    password: loginObject.password,
    role: loginObject.role,
    status: loginObject.status,
  };
  const dataForRefreshToken = bcrypt.hashSync(JSON.stringify(user), 5);
  // Create a refresh token
  const refreshToken = jwt.sign({ dataForRefreshToken }, accessTokenSecret, {
    expiresIn: refreshTokenLife,
  });
  // Create a access token
  const accessToken = jwt.sign({ dataForAccessToken }, accessTokenSecret, {
    expiresIn: accessTokenLife,
  });

  // return the information including token as JSON and refreshToken
  return { accessToken, refreshToken };
};

exports.getAllUsers = async () => {
  const listUsers = await loginModel.getAllUsers();
  if (listUsers.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay nguoi dung',
      })
    );
  }
  return listUsers;
};

exports.getUserById = async (id) => {
  const checkUser = await loginModel.getUserById(id);
  if (checkUser.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay nguoi dung',
      })
    );
  }
  return checkUser;
};

exports.updateUserInfoAsAdmin = async (id, userInfo) => {
  const checkUser = await loginModel.getUserById(id);
  if (checkUser.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay nguoi dung',
      })
    );
  }
  const user = await loginModel.updateUserInfoAsAdmin(id, userInfo);
  return user;
};

exports.updateUserInfoAsUser = async (id, userInfo) => {
  const checkUser = await loginModel.getUserById(id);
  if (checkUser.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay nguoi dung',
      })
    );
  }
  const userByEmail = await loginModel.getUserByEmail(userInfo.email);
  if (userByEmail.length != 0 && checkUser.email != userInfo.email) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.ACCOUNT_PROBLEM,
        errorCode: ERROR_CODE.ACCOUNT_PROBLEM,
        messageId: 'Email này đã được sử dụng',
      })
    );
  }
  const user = await loginModel.updateUserInfoAsUser(id, userInfo);
  return user;
};

exports.updateUserPassword = async (id, userInfo) => {
  const checkUser = await loginModel.getUserById(id);
  if (checkUser.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay nguoi dung',
      })
    );
  }
  if (userInfo.newPassword != userInfo.confirmPassword) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Confirm mật khẩu không khớp',
      })
    );
  }
  const isPasswordValid = bcrypt.compareSync(
    userInfo.oldPassword,
    checkUser.password
  );
  if (!isPasswordValid) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Sai mật khẩu',
      })
    );
  }
  userInfo.newPassword = bcrypt.hashSync(userInfo.newPassword, 5);
  const user = await loginModel.updateUserPassword(id, userInfo);
  return user;
};
