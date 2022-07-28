const { Validator } = require('jsonschema');
const {
  LOGIN_SCHEMA,
  SIGNUP_SCHEMA,
  UPDATE_INFO_SCHEMA,
  UPDATE_PASSWORD_SCHEMA,
} = require('./account-schema');
const { CREATE_CATEGORY_SCHEMA } = require('./category-schema');
const { CREATE_BOOK_SCHEMA } = require('./book-schema');
const { CREATE_PUBLISHER_SCHEMA } = require('./publisher-schema');
const { SEASON_SALE_SCHEMA } = require('./season-sale-schema');
const { VOUCHER_SCHEMA } = require('./voucher-schema');
const { USER_TYPE_SCHEMA } = require('./usertype-schema');

const validator = new Validator();
module.exports = {
  // Valiate username, password
  validateLogin: (loginInfo) => validator.validate(loginInfo, LOGIN_SCHEMA),
  // Valiate username, password, email
  validateSignUp: (signUpInfo) => validator.validate(signUpInfo, SIGNUP_SCHEMA),
  validateCategory: (cateName) =>
    validator.validate(cateName, CREATE_CATEGORY_SCHEMA),
  validateBook: (bookInfo) => validator.validate(bookInfo, CREATE_BOOK_SCHEMA),
  validatePublisher: (pubName) =>
    validator.validate(pubName, CREATE_PUBLISHER_SCHEMA),
  validateSeasonSale: (saleInfo) =>
    validator.validate(saleInfo, SEASON_SALE_SCHEMA),
  validateVoucher: (voucherInfo) =>
    validator.validate(voucherInfo, VOUCHER_SCHEMA),
  validateUpdateInfo: (userInfo) =>
    validator.validate(userInfo, UPDATE_INFO_SCHEMA),
  validateUpdatePassword: (userInfo) =>
    validator.validate(userInfo, UPDATE_PASSWORD_SCHEMA),
  validateUserType: (userTypeInfo) =>
    validator.validate(userTypeInfo, USER_TYPE_SCHEMA),
};
