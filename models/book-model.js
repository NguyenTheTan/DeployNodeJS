const db = require('./database');
const { ERROR_CODE, ERROR_STATUS } = require('../utils/constants');

exports.getAll = async (getMethod, params) => {
  let statement;
  const paramsLower = params.toLowerCase();
  switch (getMethod) {
    case 1:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status,
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, t5.name AS category
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t5.isActive = 1 AND t1.isActive = 1 AND t4.isActive = 1 AND t3.isActive = 1 order by t1.id`;
      break;
    case 2:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, t5.name AS category
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t1.id_Category = ${params} AND t5.isActive = 1 AND t1.isActive = 1 AND t4.isActive = 1 AND t3.isActive = 1 ORDER BY t1.id`;
      break;
    case 3:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, t5.name AS category
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t1.id_publisher = ${params} AND t5.isActive = 1 AND t1.isActive = 1 AND t4.isActive = 1 AND t3.isActive = 1 ORDER BY t1.id`;
      break;
    case 4:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, t5.name AS category
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE LOWER(t1.name) LIKE '%${paramsLower}%' AND t5.isActive = 1 AND t1.isActive = 1 AND t4.isActive = 1 AND t3.isActive = 1 ORDER BY t1.id`;
      break;
    default:
      break;
  }
  let result = await db.query(statement);
  if (result.length > 0) {
    result = await Promise.all(
      result.map(async (r) => {
        const checkRating = await db.query(
          `SELECT * from rating where id_book =${r.id}`
        );
        if (checkRating.length > 0) {
          const ratings = await db.query(
            `SELECT ROUND(AVG(t2.rating), 1) AS rating FROM book t1 INNER JOIN rating t2 ON t1.id = t2.id_book WHERE t1.id = ${r.id}`
          );
          r.rating = parseFloat(ratings[0].rating);
        } else {
          r.rating = 0;
        }
        return r;
      })
    );
  }
  return result;
};

exports.getAllAsAdmin = async (getMethod, params) => {
  let statement;
  const paramsLower = params.toLowerCase();
  switch (getMethod) {
    case 1:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t1.isActive, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, 
            t5.name AS category, t5.isActive AS isCategoryActive, t4.isActive AS isPublisherActive
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id
            INNER JOIN category t5 ON t1.id_Category = t5.id order by t1.id`;
      break;
    case 2:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t1.isActive, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, 
            t5.name AS category, t5.isActive AS isCategoryActive, t4.isActive AS isPublisherActive
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t1.id_Category = ${params} ORDER BY t1.id`;
      break;
    case 3:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t1.isActive, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, 
            t5.name AS category, t5.isActive AS isCategoryActive, t4.isActive AS isPublisherActive
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t1.id_publisher = ${params} ORDER BY t1.id`;
      break;
    case 4:
      statement = `SELECT t1.id, t1.name, t1.price, t1.remain, t1.status, 
            CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
            ELSE t1.price END AS price2, t1.isActive, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, 
            t5.name AS category, t5.isActive AS isCategoryActive, t4.isActive AS isPublisherActive
            FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
            INNER JOIN author t3 ON t1.id_Author = t3.id
            INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
            INNER JOIN category t5 ON t1.id_Category = t5.id WHERE LOWER(t1.name) LIKE '%${paramsLower}%' ORDER BY t1.id`;
      break;
    default:
      break;
  }
  let result = await db.query(statement);
  if (result.length > 0) {
    result = await Promise.all(
      result.map(async (r) => {
        const checkRating = await db.query(
          `SELECT * from rating where id_book =${r.id}`
        );
        if (checkRating.length > 0) {
          const ratings = await db.query(
            `SELECT ROUND(AVG(t2.rating), 1) AS rating FROM book t1 INNER JOIN rating t2 ON t1.id = t2.id_book WHERE t1.id = ${r.id}`
          );
          r.rating = parseFloat(ratings[0].rating);
        } else {
          r.rating = 0;
        }
        return r;
      })
    );
  }
  return result;
};

exports.postOne = async (bookInfo) => {
  const result =
    await db.query(`INSERT INTO book(name, pub_date, import_date, description, price, remain, status, id_publisher, imgPath, id_Author, id_Category, id_seasonSale, created_by)
    VALUES ('${bookInfo.name}', '${bookInfo.pub_date}', '${bookInfo.import_date}', '${bookInfo.description}', ${bookInfo.price}, ${bookInfo.remain}, ${bookInfo.status}, ${bookInfo.id_publisher}, '${bookInfo.imgPath}', ${bookInfo.id_Author}, ${bookInfo.id_Category}, ${bookInfo.id_seasonSale}, ${bookInfo.created_by})`);
  return result;
};

exports.deleteOne = async (bookId, bookInfo, option) => {
  const result = await db.query(
    `UPDATE book SET isActive = ${option}, updated_at = '${bookInfo.updated_at}', updated_by = ${bookInfo.updated_by} WHERE id = ${bookId}`
  );
  return result;
};

exports.findById = async (bookId) => {
  if (Number.isNaN(bookId)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  let result;
  const checkRating = await db.query(
    `SELECT * from rating where id_book =${bookId}`
  );
  if (checkRating.length > 0) {
    result =
      await db.query(`SELECT t1.id, t1.name, t1.description, t1.price, t1.remain, t1.status, DATE(t1.pub_date) as pub_date, t1.import_date, t1.id_seasonSale,
      CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
      ELSE t1.price END AS price2, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, t5.name AS category, ROUND(AVG(t6.rating), 1) AS rating
    FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
    INNER JOIN author t3 ON t1.id_Author = t3.id
    INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
    INNER JOIN category t5 ON t1.id_Category = t5.id
    INNER JOIN rating t6 ON t1.id = t6.id_book  WHERE t1.id = ${bookId} AND t5.isActive = 1 AND t1.isActive = 1 AND t4.isActive = 1`);
  } else {
    result =
      await db.query(`SELECT t1.id, t1.name, t1.description, t1.price, t1.remain, t1.status, DATE(t1.pub_date) as pub_date, t1.import_date, t1.id_seasonSale,
      CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
      ELSE t1.price END AS price2, t3.name AS author, t4.name AS publisher, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, t5.name AS category, 0 AS rating
    FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
    INNER JOIN author t3 ON t1.id_Author = t3.id
    INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
    INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t1.id = ${bookId} AND t5.isActive = 1 AND t1.isActive = 1 AND t4.isActive = 1`);
  }
  if (result.length > 0) {
    result[0].rating = parseFloat(result[0].rating);
    const feedbackArray = await db.query(
      `SELECT rating.feedback, users.username,concat("${process.env.DB_CONNECT}",users.image_path) as image_path  FROM rating JOIN users ON rating.id_user = users.id WHERE id_book = ${bookId}`
    );
    result[0].feedback = feedbackArray;
  }
  return result;
};

exports.findByIdAsAdmin = async (bookId) => {
  if (Number.isNaN(bookId)) {
    throw new Error(
      JSON.stringify({
        statusCode: ERROR_STATUS.NOT_FOUND,
        errorCode: ERROR_CODE.NOT_FOUND,
        messageId: 'Không tìm thấy sách',
      })
    );
  }
  let result;
  const checkRating = await db.query(
    `SELECT * from rating where id_book =${bookId}`
  );
  if (checkRating.length > 0) {
    result =
      await db.query(`SELECT t1.id, t1.name, t1.description, t1.price, t1.remain, t1.status, t1.pub_date, t1.import_date, t1.id_Category, t1.isActive,
      CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
      ELSE t1.price END AS price2, t3.name AS authorName, t4.name AS publisherName, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, 
      t5.name AS category, ROUND(AVG(t6.rating), 1) AS rating, t1.isActive, t5.isActive AS isCategoryActive, t4.isActive AS isPublisherActive
      FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
      INNER JOIN author t3 ON t1.id_Author = t3.id
      INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
      INNER JOIN category t5 ON t1.id_Category = t5.id
      INNER JOIN rating t6 ON t1.id = t6.id_book  WHERE t1.id = ${bookId}`);
  } else {
    result =
      await db.query(`SELECT t1.id, t1.name, t1.description, t1.price, t1.remain, t1.status, t1.pub_date, t1.import_date, t1.id_Category, t1.isActive,
      CASE WHEN DATE(t2.endDate) >= DATE(NOW()) AND t2.isActive = 1 THEN t1.price - (t1.price * (t2.percent/100)) 
      ELSE t1.price END AS price2, t3.name AS authorName, t4.name AS publisherName, concat("${process.env.DB_CONNECT}",t1.imgPath) as imgPath, 
      t5.name AS category, 0 AS rating, t1.isActive, t5.isActive AS isCategoryActive, t4.isActive AS isPublisherActive
      FROM book t1 INNER JOIN season_sale t2 ON t1.id_seasonSale = t2.id
      INNER JOIN author t3 ON t1.id_Author = t3.id
      INNER JOIN publisher t4 ON t1.id_publisher = t4.id 
      INNER JOIN category t5 ON t1.id_Category = t5.id WHERE t1.id = ${bookId}`);
  }
  if (result.length > 0) {
    result[0].rating = parseFloat(result[0].rating);
    const feedbackArray = await db.query(
      `SELECT feedback FROM rating WHERE id_book = ${bookId}`
    );
    result[0].feedback = feedbackArray
      .map((f) => f.feedback)
      .filter((feed) => feed !== null);
  }
  return result;
};

exports.updateOne = async (bookInfo) => {
  const result =
    await db.query(`UPDATE book SET name='${bookInfo.name}', pub_date='${bookInfo.pub_date}', description='${bookInfo.description}', price=${bookInfo.price},
    remain=${bookInfo.remain}, status=${bookInfo.status}, id_publisher=${bookInfo.id_publisher}, imgPath='${bookInfo.imgPath}', id_Author=${bookInfo.id_Author}, id_Category=${bookInfo.id_Category}, id_seasonSale=${bookInfo.id_seasonSale},
    updated_at='${bookInfo.updated_at}', updated_by=${bookInfo.updated_by}
    WHERE id=${bookInfo.id}`);
  return result;
};
