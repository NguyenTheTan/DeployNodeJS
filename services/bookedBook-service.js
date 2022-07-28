const booked_BookModel = require('../models/bookedBook-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getBookedBook = async (id_bill) => {
  const listBook = await booked_BookModel.getBookInBill(id_bill);
  if (listBook.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm sách',
      })
    );
  }
  return listBook;
};
exports.createBookedBook = async (params) => {
  const booked_book = await booked_BookModel.createBookedBook(params);
  return booked_book;
};
