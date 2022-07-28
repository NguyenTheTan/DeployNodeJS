const crypto = require('crypto');
const billService = require('../services/bill-service');
const bookedBookService = require('../services/bookedBook-service');
const errorMessages = require('../utils/error-messages');
const accountService = require('../services/account-service');
const cartService = require('../services/cart-service');
const voucherService = require('../services/voucher-service');
const { SUCCESS_STATUS } = require('../utils/constants');

exports.getAllBillController = async (req, res) => {
  try {
    const listBill = await billService.getAllBill();
    res.status(SUCCESS_STATUS.SUCCESS).send(listBill);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getBillByUserController = async (req, res) => {
  try {
    const listBill = await billService.getBillByUser(req.body.username);
    res.status(SUCCESS_STATUS.SUCCESS).send(listBill);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getBillByIdController = async (req, res) => {
  try {
    const listBill = await billService.getBillById(req.params.id);
    res.status(SUCCESS_STATUS.SUCCESS).send(listBill);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getBillByCodeController = async (req, res) => {
  try {
    const bill = await billService.getBillByCode(req.params.code);
    const bookInBill = await bookedBookService.getBookedBook(bill.id);
    res.status(SUCCESS_STATUS.SUCCESS).send({ bill, bookInBill });
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.getUnConfirmredBillController = async (req, res) => {
  try {
    const listBill = await billService.getUnConfirmredBill();
    res.status(SUCCESS_STATUS.SUCCESS).send(listBill);
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.confirmBillController = async (req, res) => {
  try {
    const id_bill = req.params.id;
    await billService.confirmBill(id_bill);
    res.status(SUCCESS_STATUS.SUCCESS).send('ok');
  } catch (err) {
    errorMessages(req, res, err);
  }
};
exports.generateBillController = async (req, res) => {
  try {
    const { username, id_shipInfo, voucher_code, totalAmount, shipFee } =
      req.body;
    const description = req.body.description ? req.body.description : '';
    const user = await accountService.checkUser(username);
    const voucher =
      voucher_code != null
        ? await voucherService.checkIsValid({
            id_userType: user.id_userType,
            voucher_code,
            totalAmount,
          })
        : { id: 3, percent: 0 };
    const totalBill =
      parseInt(totalAmount, 10) -
      (parseInt(totalAmount, 10) * parseInt(voucher.percent, 10)) / 100 +
      parseInt(shipFee, 10);
    const hashString = JSON.stringify(totalBill + Date.now());
    const hash = crypto.createHash('md5').update(hashString).digest('hex');
    const listBook = await cartService.getCartByUser(user.id);
    const bill = {
      total_amount: totalBill,
      id_shipInfo: parseInt(id_shipInfo, 10),
      id_voucher: voucher.id,
      code: hash,
      listBook: listBook.listBookInCart,
      description,
      quantity: voucher.quantity - 1,
    };
    await billService.createBill(bill);
    res.status(SUCCESS_STATUS.SUCCESS).send({ billCode: hash });
  } catch (err) {
    errorMessages(req, res, err);
  }
};
