const express = require('express');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
const accountRouter = require('./routers/account-router');
const authorRouter = require('./routers/author-router');
const bookRouter = require('./routers/book-router');
const categoryRouter = require('./routers/category-router');
const publisherRouter = require('./routers/publisher-router');
const saleRouter = require('./routers/sale-router');
const voucherRouter = require('./routers/voucher-router');
const cartRouter = require('./routers/cart-router');
const ratingRouter = require('./routers/rating-router');
const shipInfoRouter = require('./routers/shipInfo-router');
const userTypeRouter = require('./routers/user-type-router');
const billRouter = require('./routers/bill-router');

const app = express();
dotenv.config();

// Header request
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'
  );
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range, bookstore-access-token, bookstore-refresh-token, Pragma, Cache-Control'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});
app.use(cookie('bookstore-RESTful-APIs'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/avatars', express.static('avatars'));

app.use('/', accountRouter);
app.use('/', authorRouter);
app.use('/', bookRouter);
app.use('/', categoryRouter);
app.use('/', publisherRouter);
app.use('/', saleRouter);
app.use('/', voucherRouter);
app.use('/', cartRouter);
app.use('/', billRouter);
app.use('/', ratingRouter);
app.use('/', shipInfoRouter);
app.use('/', userTypeRouter);
const PORT = process.env.PORT || 8686;
app.listen(PORT, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`Server running on port: ${PORT}`);
});
