const path = require('path');
const bookService = require('../services/book-service');
const authorService = require('../services/author-service');
const publisherService = require('../services/publisher-service');
const errorMessages = require('../utils/error-messages');
const { SUCCESS_STATUS } = require('../utils/constants');

const filepath = path.join(__dirname, '../images/books/');
const pageLimit = 5;

exports.getAll = async (req, res) => {
  try {
    const response = await bookService.getAll(1, 'a');
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllAsAdmin = async (req, res) => {
  try {
    const books = await bookService.getAllAsAdmin(1, 'a');
    // let pageCount;
    // if (response.length === 0) {
    //   pageCount = 1;
    // } else {
    //   pageCount = Math.ceil(response.length / pageLimit);
    // }
    // let skip = pageLimit * (req.body.pagenumber - 1);
    // if (req.body.pagenumber === undefined || req.body.pagenumber < 1) {
    //   skip = 0;
    // }
    // const books = response.splice(skip, pageLimit);
    res.status(SUCCESS_STATUS.SUCCESS).json(books);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllByCategoryId = async (req, res) => {
  try {
    const { cateId } = req.params;
    const response = await bookService.getAll(2, cateId);
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllByCategoryIdAsAdmin = async (req, res) => {
  try {
    const { cateId } = req.params;
    const response = await bookService.getAllAsAdmin(2, cateId);
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllByPublisherId = async (req, res) => {
  try {
    const { pubId } = req.params;
    const response = await bookService.getAll(3, pubId);
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllByPublisherIdAsAdmin = async (req, res) => {
  try {
    const { pubId } = req.params;
    const response = await bookService.getAllAsAdmin(3, pubId);
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllBySearchText = async (req, res) => {
  try {
    const searchText = req.params.search;
    let response;
    if (searchText == null || searchText.length === 0) {
      response = await bookService.getAll(1, null);
    } else {
      response = await bookService.getAll(4, searchText);
    }
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.getAllBySearchTextAsAdmin = async (req, res) => {
  try {
    const searchText = req.params.search;
    let response;
    if (searchText == null || searchText.length === 0) {
      response = await bookService.getAllAsAdmin(1, null);
    } else {
      response = await bookService.getAllAsAdmin(4, searchText);
    }
    res.status(SUCCESS_STATUS.SUCCESS).json(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const bookInfo = {
      updated_at: new Date().toISOString().split('T')[0],
      updated_by: 1,
    };
    await bookService.deleteOne(req.params.id, bookInfo);
    const book = await bookService.findByIdAsAdmin(req.params.id);
    res.status(SUCCESS_STATUS.DELETED).json(book);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const response = await bookService.findById(req.params.id);
    if (response.isActive === 1) {
      response.isActiveBoolean = true;
    } else {
      response.isActiveBoolean = false;
    }
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.findByIdAsAdmin = async (req, res) => {
  try {
    const response = await bookService.findByIdAsAdmin(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(response);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.postOne = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files.photo);
    const file = req.files.photo;
    const data = req.body;
    file.mv(filepath + file.name, (err) => {
      if (err) {
        errorMessages(req, res, err);
      }
    });
    if (!data.id_seasonSale) {
      data.id_seasonSale = 1;
    }
    let author = await authorService.checkIsAuthorExisted(data.authorName);
    let publisher = await publisherService.checkIsPublisherExsited(
      data.publisherName
    );
    if (author.length === 0) {
      await authorService.createAuthor(data.authorName);
      author = await authorService.checkIsAuthorExisted(data.authorName);
    }
    const id_author = author[0].id;
    if (publisher.length === 0) {
      await publisherService.postOne(data.publisherName);
      publisher = await publisherService.checkIsPublisherExsited(
        data.publisherName
      );
    }
    const id_publisher = publisher[0].id;
    const book = {
      name: data.name,
      pub_date: data.pub_date,
      import_date: new Date().toISOString().split('T')[0],
      description: data.description,
      price: parseInt(data.price, 10),
      remain: parseInt(data.remain, 10),
      status: parseInt(data.status, 10),
      id_publisher: parseInt(id_publisher, 10),
      imgPath: `/images/books/${file.name}`,
      id_Author: parseInt(id_author, 10),
      id_Category: parseInt(data.id_Category, 10),
      id_seasonSale: parseInt(data.id_seasonSale, 10),
      created_by: 1,
    };
    await bookService.postOne(book);
    const books = await bookService.getAllAsAdmin(1, 'a');
    res.status(SUCCESS_STATUS.CREATED).json(books);
  } catch (error) {
    errorMessages(req, res, error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const book = await bookService.findById(req.params.id);
    book.imgPath = book.imgPath.replace(process.env.DB_CONNECT, '');
    if (req.files != null) {
      const file = req.files.photo;
      book.imgPath = `/images/books/${file.name}`;
      file.mv(filepath + file.name, (err) => {
        if (err) {
          errorMessages(req, res, err);
        }
      });
    }
    const data = req.body;
    if (data.id_seasonSale && data.id_seasonSale >= 0) {
      book.id_seasonSale = parseInt(data.id_seasonSale, 10);
    }
    let author = await authorService.checkIsAuthorExisted(data.authorName);
    let publisher = await publisherService.checkIsPublisherExsited(
      data.publisherName
    );
    if (author.length === 0) {
      await authorService.createAuthor(data.authorName);
      author = await authorService.checkIsAuthorExisted(data.authorName);
    }
    const id_author = author[0].id;
    if (publisher.length === 0) {
      await publisherService.postOne(data.publisherName);
      publisher = publisherService.checkIsPublisherExsited(data.publisherName);
    }
    const id_publisher = publisher[0].id;
    const updatedbook = {
      id: req.params.id,
      name: data.name,
      pub_date: data.pub_date,
      import_date: book.import_date,
      description: data.description,
      price: parseInt(data.price, 10),
      remain: parseInt(data.remain, 10),
      status: parseInt(data.status, 10),
      id_publisher: parseInt(id_publisher, 10),
      imgPath: book.imgPath,
      id_Author: parseInt(id_author, 10),
      id_Category: parseInt(data.id_Category, 10),
      id_seasonSale: book.id_seasonSale,
      updated_at: new Date().toISOString().split('T')[0],
      updated_by: 1,
    };
    await bookService.updateOne(updatedbook);
    const books = await bookService.findByIdAsAdmin(req.params.id);
    res.status(SUCCESS_STATUS.UPDATED).json(books);
  } catch (error) {
    errorMessages(req, res, error);
  }
};
