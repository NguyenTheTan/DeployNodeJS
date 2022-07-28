const path = require('path');
const accountService = require('../services/account-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

const filepath = path.join(__dirname, '../images/avatars/');

exports.loginController = async (req, res) => {
  const { username, password, loginType } = req.body;
  try {
    const loginResponse = {};
    const login = await accountService.getUser(username, password, loginType);
    loginResponse.role = login.role;
    loginResponse.id = login.id;
    loginResponse.username = login.username;
    loginResponse.imagePath = login.image_path;
    const { accessToken, refreshToken } = await accountService.createToken(
      login
    );
    loginResponse.accessToken = accessToken;
    loginResponse.refreshToken = refreshToken;
    res.status(SUCCESS_STATUS.SUCCESS).send(loginResponse);
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.signupController = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await accountService.createUser(username, password, email);
    res.status(SUCCESS_STATUS.CREATED).send('Dang ki thanh cong');
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const listUser = await accountService.getAllUsers();
    res.status(SUCCESS_STATUS.SUCCESS).send(listUser);
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await accountService.getUserById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(user);
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.getUserAsUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await accountService.checkUser(data.username);
    res.status(SUCCESS_STATUS.SUCCESS).send(user);
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.updateUserInfoAsUser = async (req, res) => {
  try {
    const data = req.body;
    const oldUser = await accountService.checkUser(data.username);
    if (oldUser.image_path != null) {
      oldUser.image_path = oldUser.image_path.replace(
        process.env.DB_CONNECT,
        ''
      );
    }
    if (req.files != null) {
      const file = req.files.photo;
      oldUser.image_path = `/images/avatars/${file.name}`;
      file.mv(filepath + file.name, (err) => {
        if (err) {
          errorMessages(req, res, err);
        }
      });
    }
    const newUser = {
      email: data.email,
      image_path: oldUser.image_path,
    };
    await accountService.updateUserInfoAsUser(oldUser.id, newUser);
    res.status(SUCCESS_STATUS.SUCCESS).send({ message: 'Cập nhật thành công' });
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.updateUserInfoAsAdmin = async (req, res) => {
  try {
    const data = req.body;
    await accountService.updateUserInfoAsAdmin(req.params.id, data);
    res.status(SUCCESS_STATUS.SUCCESS).send({ message: 'Update thành công' });
  } catch (err) {
    errorMessages(req, res, err);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const data = req.body;
    const updateResponse = {};
    const oldUser = await accountService.checkUser(data.username);
    await accountService.updateUserPassword(oldUser.id, data);
    updateResponse.message = 'Cập nhật thành công';
    const { accessToken, refreshToken } = await accountService.createToken({
      id: oldUser.id,
      username: oldUser.username,
      password: data.newPassword,
      role: oldUser.role,
      status: oldUser.status,
    });
    updateResponse.accessToken = accessToken;
    updateResponse.refreshToken = refreshToken;
    res.status(SUCCESS_STATUS.SUCCESS).send(updateResponse);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
