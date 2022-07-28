const db = require('./database');

exports.getAllBill = async () => {
  const sql = `SELECT bill.id, bill.total_amount, bill.date_pay, bill.status, shipinfo.name, shipinfo.phone, shipinfo.address ,wards.name as ward, 
  district.name as district, province.name as province FROM users inner join shipinfo on users.id = shipinfo.id_user 
  inner join bill on bill.id_shipInfor = shipinfo.id inner join wards on wards.id = shipinfo.id_wards
  inner join district on district.id = wards.id_district inner join province on province.id = district.id_province`;
  const result = await db.query(sql);
  return result;
};
exports.getBillByUser = async (username) => {
  const sql = `SELECT bill.id, bill.total_amount, bill.date_pay, bill.status, shipinfo.name, shipinfo.phone, shipinfo.address ,wards.name as ward
  FROM users inner join shipinfo on users.id = shipinfo.id_user inner join bill on bill.id_shipInfor = shipinfo.id 
  inner join wards on wards.id = shipinfo.id_wards where username = '${username}'`;
  const result = await db.query(sql);
  return result;
};
exports.getUnConfirmredBill = async () => {
  const sql = `SELECT bill.id, bill.total_amount, bill.date_pay, bill.status, shipinfo.name, shipinfo.phone, shipinfo.address ,wards.name as ward, district.name as district, province.name as province
  FROM users inner join shipinfo on users.id = shipinfo.id_user inner join bill on bill.id_shipInfor = shipinfo.id 
  inner join wards on wards.id = shipinfo.id_wards inner join district on district.id = wards.id_district inner join province on province.id = district.id_province where bill.status = 0`;
  const result = await db.query(sql);
  return result;
};
exports.getBillById = async (id) => {
  const sql = `SELECT bill.id, bill.total_amount, bill.date_pay, bill.status, shipinfo.name, shipinfo.phone, shipinfo.address ,wards.name as ward,
  district.name	as district, province.name as province
  FROM bill inner join shipinfo on shipinfo.id = bill.id_shipInfor 
  inner join wards on wards.id = shipinfo.id_wards 
  inner join district on district.id = wards.id_district
  inner join province on province.id = district.id_province where bill.id = ${id}`;
  const result = await db.query(sql);
  return result;
};
exports.getBillByCode = async (code) => {
  const sql = `SELECT bill.id, bill.total_amount, bill.date_pay, bill.status, shipinfo.name, shipinfo.phone, shipinfo.address ,wards.name as ward,
  district.name	as district, province.name as province
  FROM bill inner join shipinfo on shipinfo.id = bill.id_shipInfor 
  inner join wards on wards.id = shipinfo.id_wards 
  inner join district on district.id = wards.id_district
  inner join province on province.id = district.id_province where bill.code = '${code}'`;
  const result = await db.query(sql);
  return result;
};
exports.createBill = async (params) => {
  const sqls = [
    `insert into bill (total_amount, date_pay, description, id_shipInfor, status, code, id_voucher) 
  values (${params.total_amount}, now(), '${params.description}', ${params.id_shipInfo}, 0, '${params.code}', ${params.id_voucher})`,
  ];
  params.listBook.forEach((book) => {
    sqls.push(`insert into booked_book (quantity, price, id_book, id_bill) 
    values (${book.quantity}, ${book.price}, ${book.id}, ?)`);
  });
  if (params.id_voucher !== 3) {
    sqls.push(
      `update voucher set quantity = ${params.quantity} where id = ${params.id_voucher}`
    );
  }
  const result = await db.queryTransaction(sqls);
  return result;
};
exports.confirmBill = async (id) => {
  const sql = `update bill set status = 1 where id = ${id}`;
  const result = await db.query(sql);
  return result;
};
