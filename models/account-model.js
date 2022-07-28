const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getUserByUsername = async (username) => {
  const sql = `select id, username, password, role, email, concat("${process.env.DB_CONNECT}",image_path) as image_path, id_userType from users where username = "${username}"`;
  const result = await db.query(sql);
  return result;
};
exports.getUserByEmail = async (email) => {
  const sql = `select * from users where email = "${email}"`;
  const result = await db.query(sql);
  return result;
};
exports.signUp = async (username, password, email) => {
  const sql = `insert into users (username , password, email) values ("${username}", "${password}", "${email}")`;
  const result = await db.query(sql);
  return result;
};
exports.getUserById = async (id) => {
  if (Number.isNaN(id)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy người dùng',
      })
    );
  }
  const sql = `select id, username, password, status, role, email, concat("${process.env.DB_CONNECT}",image_path) as image_path, id_userType from users where id = ${id}`;
  const result = await db.query(sql);
  return result[0];
};
exports.getAllUsers = async () => {
  const sql = `select u1.id, u1.username, u1.role, u1.email, concat("${process.env.DB_CONNECT}",u1.image_path) as image_path, u1.status, u1.id_userType, u2.type as userType from users u1 join user_type u2 on u1.id_userType = u2.id`;
  const result = await db.query(sql);
  return result;
};
exports.updateUserInfoAsUser = async (id, userInfo) => {
  let sql = `update users set email = "${userInfo.email}", image_path = "${userInfo.image_path}" where id = ${id}`;
  if (userInfo.image_path == null) {
    sql = `update users set email = "${userInfo.email}" where id = ${id}`;
  }
  const result = await db.query(sql);
  return result;
};
exports.updateUserPassword = async (id, userInfo) => {
  const sql = `update users set password = "${userInfo.newPassword}" where id = ${id}`;
  const result = await db.query(sql);
  return result;
};
exports.updateUserInfoAsAdmin = async (id, userInfo) => {
  const sql = `update users set role = ${userInfo.role}, status = ${userInfo.status}, id_userType = ${userInfo.id_userType} where id = ${id}`;
  const result = await db.query(sql);
  return result;
};
