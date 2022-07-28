const cartModel = require('../models/cart-model');
const bookService = require('./book-service');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

// CRUD cart user login
exports.getCartByUser = async (id_user) => {
  const listBookInCart = await cartModel.getCartByUser(id_user);
  let totalBookInCart = 0;
  let totalBill = 0;
  listBookInCart.forEach((item) => {
    totalBookInCart += item.quantity;
    totalBill += item.quantity * item.price;
  });
  return { listBookInCart, totalBookInCart, totalBill };
};
exports.getBookInCart = async (id_user, id_book) => {
  const cart = await cartModel.getBookInCart(id_user, id_book);
  if (cart.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách trong giỏ hàng',
      })
    );
  }
  return cart[0];
};
exports.addBookToUserCart = async (id_user, id_book, quantity) => {
  const book = await bookService.findById(id_book);
  if (book) await cartModel.insertBookToCart(id_user, id_book, quantity);
};
exports.updateUserCart = async (id_user, id_book, quantity) => {
  const book = await bookService.findById(id_book);
  if (book) await cartModel.updateCartByUser(id_user, id_book, quantity);
};
exports.deteleBookInCart = async (id_user, id_book) => {
  const book = await bookService.findById(id_book);
  if (book) await cartModel.deleteBookInCart(id_user, id_book);
};
