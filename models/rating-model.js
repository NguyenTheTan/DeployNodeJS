const db = require('./database');

exports.addRating = async (ratingInfo) => {
  let sql = `insert into rating (rating, id_user, id_book, feedback) values (${ratingInfo.rating}, ${ratingInfo.id_user}, ${ratingInfo.id_book}, "${ratingInfo.feedback}")`;
  if (!ratingInfo.feedback || ratingInfo.feedback.trim().length === 0) {
    sql = `insert into rating (rating, id_user, id_book) values (${ratingInfo.rating}, ${ratingInfo.id_user}, ${ratingInfo.id_book})`;
  }
  const result = await db.query(sql);
  return result;
};

exports.getRatingByIdBook = async (id) => {
  const sql = `select * from rating where id_book = ${id}`;
  const ratings = await db.query(sql);
  return ratings;
};
