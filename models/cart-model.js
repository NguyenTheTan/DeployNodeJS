const db = require('./database');

exports.getCartByUser = async (id_user) => {
  const sql = `SELECT book.id, book.name, 
  CASE WHEN season_sale.isActive = 1 AND DATE(season_sale.endDate) >= DATE(NOW()) THEN book.price - book.price * (season_sale.percent/100) 
  ELSE book.price END as price, concat("${process.env.DB_CONNECT}",book.imgPath) as imgPath, cart.quantity, price * cart.quantity as total
  FROM cart INNER JOIN book ON cart.id_book = book.id
  INNER JOIN season_sale  ON book.id_seasonSale = season_sale.id
  INNER JOIN author ON book.id_Author = author.id
  INNER JOIN publisher ON book.id_publisher = publisher.id 
  INNER JOIN category ON book.id_Category = category.id where id_user = "${id_user}" and book.isActive = 1 and publisher.isActive = 1 and category.isActive = 1`;
  const result = await db.query(sql);
  return result;
};
exports.getBookInCart = async (id_user, id_book) => {
  const sql = `select * from cart where id_user = "${id_user}" and id_book = "${id_book}"`;
  const result = await db.query(sql);
  return result;
};
exports.insertBookToCart = async (id_user, id_book, quantity) => {
  const sql = `insert into cart (id_user, id_book, quantity) values ("${id_user}", "${id_book}", "${quantity}")`;
  const result = await db.query(sql);
  return result;
};
exports.deleteBookInCart = async (id_user, id_book) => {
  const sql = `delete from cart where id_user = "${id_user}" and id_book = "${id_book}"`;
  const result = await db.query(sql);
  // console.log(result);
  return result;
};
exports.updateCartByUser = async (id_user, id_book, quantity) => {
  const sql = `update cart set quantity = "${quantity}" where id_user = "${id_user}" and id_book = "${id_book}"`;
  const result = await db.query(sql);
  return result;
};
