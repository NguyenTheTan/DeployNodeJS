const db = require('./database');

exports.getBookInBill = async (id_bill) => {
  const sql = `SELECT book.id, book.name, booked_book.price, concat("${process.env.DB_CONNECT}",book.imgPath) as imgPath, booked_book.quantity
    FROM booked_book INNER JOIN book ON booked_book.id_book = book.id where id_bill = "${id_bill}"`;
  const result = await db.query(sql);
  return result;
};
exports.createBookedBook = async (params) => {
  const sql = `insert into booked_book (quantity, price, id_book, id_bill) 
    values (${params.quantity}, ${params.price}, ${params.id_book}, ${params.id_bill})`;
  const result = await db.query(sql);
  return result;
};
