const cartService = require('../services/cart-service');
const errorMessages = require('../utils/error-messages');
const accountService = require('../services/account-service');
const bookService = require('../services/book-service');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getUserCartController = async (req, res) => {
  try {
    const user = await accountService.checkUser(req.body.username);
    const cart = await cartService.getCartByUser(user.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(cart);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.addBookToUserCartController = async (req, res) => {
  try {
    const { username, id_book } = req.body;
    let { quantity } = req.body;
    if (!quantity) {
      quantity = 1;
    }
    const user = await accountService.checkUser(username);
    try {
      // check book is exist in cart
      const checkExistedBook = await cartService.getBookInCart(
        user.id,
        id_book
      );
      // if book existed in cart => update quantity
      await cartService.updateUserCart(
        user.id,
        id_book,
        parseInt(checkExistedBook.quantity, 10) + parseInt(quantity, 10)
      );
    } catch (error) {
      let objectErr;
      try {
        // parse error message to object
        objectErr = JSON.parse(error.message);
      } catch (e) {
        throw new Error(e);
      }
      // if error from checkExistedBook func => add new book to cart
      if (objectErr.messageId === 'Không tìm thấy sách trong giỏ hàng')
        await cartService.addBookToUserCart(user.id, id_book, quantity);
    }
    const cart = await cartService.getCartByUser(user.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(cart);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.updateUserCartController = async (req, res) => {
  try {
    const { username, id_book, type } = req.body;
    const user = await accountService.checkUser(username);
    const book = await cartService.getBookInCart(user.id, id_book);
    const quantity =
      type === 'plus' ? (book.quantity += 1) : (book.quantity -= 1);
    if (quantity === 0) await cartService.deteleBookInCart(user.id, id_book);
    else await cartService.updateUserCart(user.id, id_book, quantity);
    const cart = await cartService.getCartByUser(user.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(cart);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.deleteBookInUserCart = async (req, res) => {
  try {
    const { username, id_book } = req.body;
    const user = await accountService.checkUser(username);
    const book = await cartService.getBookInCart(user.id, id_book);
    if (book) await cartService.deteleBookInCart(user.id, id_book);
    const cart = await cartService.getCartByUser(user.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(cart);
  } catch (err) {
    errorMessages(req, res, err);
  }
};

// CRUD cart no login
exports.getBookDetail = async (objCart) => {
  let totalBookInCart = 0;
  const bookPromises = Object.entries(objCart).map(async ([key, value]) => {
    const book = await bookService.findById(parseInt(key, 10));
    book.quantity = value;
    totalBookInCart += parseInt(value, 10);
    return book;
  });
  const listBookInCart = await Promise.all(bookPromises);
  return { listBookInCart, totalBookInCart };
};
exports.getCartFromCookie = async (req, res) => {
  try {
    const cookieCart = req.signedCookies.cart;
    if (!cookieCart) {
      return res.send([]);
    }
    const objCart = JSON.parse(cookieCart);
    const response = await this.getBookDetail(objCart);
    return res.json(response);
  } catch (error) {
    return errorMessages(req, res, error);
  }
};
exports.addBookToCookieCart = async (req, res) => {
  try {
    const { id_book } = req.body;
    let { quantity } = req.body;
    if (!quantity) {
      quantity = 1;
    }
    await bookService.findById(parseInt(id_book, 10));
    const cookieCart = req.signedCookies.cart;
    if (!cookieCart) {
      const cookieValue = JSON.stringify({ [id_book]: quantity });
      res.cookie('cart', cookieValue, {
        signed: true,
        httpOnly: true,
      });
      const response = await this.getBookDetail({ [id_book]: quantity });
      return res.json(response);
    }
    const cart = JSON.parse(cookieCart);
    if (cart[id_book]) {
      const oldQuantity = parseInt(cart[id_book], 10);
      cart[id_book] = oldQuantity + parseInt(quantity, 10);
    } else cart[id_book] = quantity;
    res.cookie('cart', JSON.stringify(cart), {
      signed: true,
      httpOnly: true,
    });
    const response = await this.getBookDetail(cart);
    return res.json(response);
  } catch (error) {
    return errorMessages(req, res, error);
  }
};
exports.updateCookieCart = async (req, res) => {
  try {
    const { id_book, type } = req.body;
    await bookService.findById(parseInt(id_book, 10));
    const cookieCart = req.signedCookies.cart;
    if (!cookieCart) {
      return res.send([]);
    }
    const cart = JSON.parse(cookieCart);
    if (!cart[id_book]) {
      res.statusCode = 404;
      return res.send({
        errorCode: 'NotFound',
        messageId: 'Không tìm thấy sách trong giỏ hàng',
      });
    }
    const oldQuantity = parseInt(cart[id_book], 10);
    cart[id_book] = type === 'plus' ? oldQuantity + 1 : oldQuantity - 1;
    if (cart[id_book] === 0) delete cart[id_book];
    res.cookie('cart', JSON.stringify(cart), {
      signed: true,
      httpOnly: true,
    });
    const response = await this.getBookDetail(cart);
    return res.json(response);
  } catch (error) {
    return errorMessages(req, res, error);
  }
};
exports.deleteBookInCookieCart = async (req, res) => {
  try {
    const { id_book } = req.body;
    await bookService.findById(parseInt(id_book, 10));
    const cookieCart = req.signedCookies.cart;
    if (!cookieCart) {
      return res.send([]);
    }
    const cart = JSON.parse(cookieCart);
    if (!cart[id_book]) {
      res.statusCode = 404;
      return res.send({
        errorCode: 'NotFound',
        messageId: 'Không tìm thấy sách trong giỏ hàng',
      });
    }
    delete cart[id_book];
    res.cookie('cart', JSON.stringify(cart), {
      signed: true,
      httpOnly: true,
    });
    const response = await this.getBookDetail(cart);
    return res.json(response);
  } catch (error) {
    return errorMessages(req, res, error);
  }
};
