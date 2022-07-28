const bookModel = require('../models/book-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async (getMethod, params) => {
  const listBook = await bookModel.getAll(getMethod, params);
  if (listBook.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  return listBook;
};

exports.getAllAsAdmin = async (getMethod, params) => {
  const listBook = await bookModel.getAllAsAdmin(getMethod, params);
  if (listBook.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  return listBook;
};

exports.deleteOne = async (bookId, bookInfo) => {
  const checkBook = await bookModel.findByIdAsAdmin(bookId);
  if (checkBook.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  let option;
  if (checkBook[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const book = await bookModel.deleteOne(bookId, bookInfo, option);
  return book;
};

exports.findById = async (bookId) => {
  const book = await bookModel.findById(bookId);
  if (book.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  return book[0];
};

exports.findByIdAsAdmin = async (bookId) => {
  const book = await bookModel.findByIdAsAdmin(bookId);
  if (book.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  return book[0];
};

exports.postOne = async (bookInfo) => {
  const book = bookModel.postOne(bookInfo);
  return book;
};

exports.updateOne = async (bookInfo) => {
  const checkBook = await bookModel.findById(bookInfo.id);
  if (checkBook.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  const book = await bookModel.updateOne(bookInfo);
  return book;
};
