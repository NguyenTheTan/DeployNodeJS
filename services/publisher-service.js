const publisherModel = require('../models/publisher-model');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async () => {
  const listPublisher = await publisherModel.getAll();
  if (listPublisher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy nhà xuất bản',
      })
    );
  }
  return listPublisher;
};

exports.postOne = async (publisherName) => {
  const publisher = await publisherModel.postOne(publisherName);
  return publisher;
};

exports.deleteOne = async (pubId) => {
  const checkPublisher = await publisherModel.findById(pubId);
  if (checkPublisher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy nhà xuất bản',
      })
    );
  }
  let option;
  if (checkPublisher[0].isActive === 1) {
    option = 0;
  } else {
    option = 1;
  }
  const publisher = await publisherModel.deleteOne(pubId, option);
  return publisher;
};

exports.findById = async (pubId) => {
  const publisher = await publisherModel.findById(pubId);
  if (publisher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy nhà xuất bản',
      })
    );
  }
  return publisher[0];
};

exports.checkIsPublisherExsited = async (pubName) => {
  const publisher = await publisherModel.findByName(pubName);
  return publisher;
};

exports.updateOne = async (pubId, pubName) => {
  const checkPublisher = await publisherModel.findById(pubId);
  if (checkPublisher.length === 0) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy nhà xuất bản',
      })
    );
  }
  const publisher = await publisherModel.updateOne(pubId, pubName);
  return publisher;
};
