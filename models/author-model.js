const db = require('./database');

exports.getAllAuthor = async () => {
  const sql = `select * from author`;
  const result = await db.query(sql);
  return result;
};
exports.getAuthorByName = async (name) => {
  const sql = `select * from author where name = "${name}"`;
  const result = await db.query(sql);
  return result;
};
exports.getAuthorById = async (id) => {
  const sql = `select * from author where id = "${id}"`;
  const result = await db.query(sql);
  return result;
};
exports.insertAuthor = async (name) => {
  const sql = `insert into author (name) values ("${name}")`;
  const result = await db.query(sql);
  return result;
};
exports.deleteAuthorById = async (id, option) => {
  const sql = `update author set isActive = ${option} where id = "${id}"`;
  const result = await db.query(sql);
  // console.log(result);
  return result;
};
exports.updateAuthorById = async (id, name, about) => {
  const sql = `update author set name = "${name}", about = "${about}" where id = "${id}"`;
  const result = await db.query(sql);
  return result;
};
