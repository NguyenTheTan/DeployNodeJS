const authorModel = require('../models/author-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAllAuthor = async () => {
  const listAuthor = await authorModel.getAllAuthor();
  if (listAuthor.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay tac gia',
      })
    );
  }
  return listAuthor;
};

exports.getAuthor = async (id) => {
  const author = await authorModel.getAuthorById(id);
  if (author.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay tac gia',
      })
    );
  }
  return author[0];
};
exports.checkIsAuthorExisted = async (name) => {
  const author = await authorModel.getAuthorByName(name);
  return author;
};
exports.createAuthor = async (name) => {
  const author = await authorModel.insertAuthor(name);
  return author;
};
exports.updateAuthor = async (id, name, about) => {
  const checkAuthor = await authorModel.getAuthorById(id);
  if (checkAuthor.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay tac gia',
      })
    );
  }
  const author = await authorModel.updateAuthorById(id, name, about);
  return author;
};
exports.deleteAuthor = async (id) => {
  const checkAuthor = await authorModel.getAuthorById(id);
  if (checkAuthor.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Khong tim thay tac gia',
      })
    );
  }
  let option;
  if (checkAuthor[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const author = await authorModel.deleteAuthorById(id, option);
  return author;
};
