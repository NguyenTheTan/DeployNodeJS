const db = require('./database');

exports.getAllShipInfo = async (id_user) => {
  const sql = `select shipinfo.id, shipinfo.name, shipinfo.phone, shipinfo.address, wards.name as ward, district.name as district, province.name as province, 
  shipinfo.id_user from shipinfo 
  inner join wards on shipinfo.id_wards = wards.id
  inner join district on wards.id_district = district.id
  inner join province on district.id_province = province.id where id_user = "${id_user}"`;
  const result = await db.query(sql);
  return result;
};
exports.getShipInfoById = async (id, id_user) => {
  const sql = `select shipinfo.id, shipinfo.name, shipinfo.phone, shipinfo.address, wards.name as ward, district.name as district, province.name as province, 
  shipinfo.id_user from shipinfo 
  inner join wards on shipinfo.id_wards = wards.id
  inner join district on wards.id_district = district.id
  inner join province on district.id_province = province.id where shipinfo.id_user = ${id_user} and shipinfo.id = ${id}`;
  const result = await db.query(sql);
  return result;
};
exports.insertShipInfo = async (args) => {
  const sql = `insert into shipinfo (name, phone, address, id_user, id_wards) 
  values ("${args.name}", "${args.phone}", "${args.address}", "${args.id_user}", "${args.id_wards}")`;
  const result = await db.query(sql);
  return result.insertId;
};
exports.deleteShipInfoById = async (id, id_user) => {
  const sql = `delete from shipinfo where id = "${id}" and id_user = "${id_user}"`;
  const result = await db.query(sql);
  // console.log(result);
  return result;
};
exports.updateShipInfoById = async (args) => {
  const sql = `update shipinfo set name = "${args.name}", phone = "${args.phone}", address = "${args.address}", 
  id_user = "${args.id_user}", id_wards = "${args.id_wards}" where id = "${args.id}" and id_user = "${args.id_user}"`;
  const result = await db.query(sql);
  return result;
};

exports.getAllProvince = async () => {
  const sql = `select * from province`;
  const result = await db.query(sql);
  return result;
};
exports.searchProvince = async (key) => {
  const sql = `select * from province where name like '%${key}%'`;
  const result = await db.query(sql);
  return result;
};
exports.getAllDistrictByProvince = async (id_province) => {
  const sql = `select * from district where id_province = ${id_province}`;
  const result = await db.query(sql);
  return result;
};
exports.searchDistrictByProvince = async (id_province, key) => {
  const sql = `select * from district where id_province = ${id_province} and name like '%${key}%'`;
  const result = await db.query(sql);
  return result;
};
exports.getAllWardsByDistrict = async (id_district) => {
  const sql = `select * from wards where id_district = ${id_district}`;
  const result = await db.query(sql);
  return result;
};
exports.searchWardsByDistrict = async (id_district, key) => {
  const sql = `select * from wards where id_district = ${id_district} and name like '%${key}%'`;
  const result = await db.query(sql);
  return result;
};
