const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');
const url = require('url');

// 일일 매출
app.get('/salesdaily', async (request, response) => {
  let result = await db.connection('adminsql', 'salesDaily')
    .catch(err => console.log(err));
  response.send(result);
});

// 월간 매출
app.get('/salesmonthly', async (request, response) => {
  let result = await db.connection('adminsql', 'salesMonthly')
    .catch(err => console.log(err));
  response.send(result);
});

// 미답변 문의 
app.get('/inquirynotanswered', async (request, response) => {
  let result = await db.connection('adminsql', 'inquiryNotAnswered')
    .catch(err => console.log(err));
  response.send(result);
});

// 전체조회(페이징)
app.get('/orderlist', async (req, res) => {
  let data = [];
  let where = " WHERE 1=1";

  var queryData = url.parse(req.url, true).query;

  let start_date = queryData.start_date;
  let end_date = queryData.end_date;
  let merchant_uid = queryData.merchant_uid;
  let member_code = queryData.member_code;
  let product_name = queryData.product_name;
  let order_status = queryData.order_status;
  let offset = queryData.offset;

  // 시작일자, 끝날짜 있을 경우
  if (start_date && end_date) {
    // let input = [start_date, end_date]
    where += " AND order_date BETWEEN ?"
    data.push(start_date);
    where += "AND ?"
    data.push(end_date);
    // 끝날짜만 있을 경우
  } else if (!start_date && end_date) {
    where += " AND order_date between '2024-01-01' and ?"
    data.push(end_date);
    // 시작일자만 있을 경우
  } else if (start_date && !end_date) {
    where += " AND order_date between ? and curdate()"
    data.push(start_date);
  }

  // 주문번호가 있을 경우
  if (merchant_uid) {
    where += " AND merchant_uid = ?"
    data.push(merchant_uid);
  }

  // 주문자가 있을 경우
  if (member_code) {
    where += " AND member_code = ?"
    data.push(member_code);
  }

  // 상품명이 있을 경우
  if (product_name) {
    where += " AND product_name LIKE ?"
    data.push("%" + product_name + "%");
  }

  // 상품상태 조건이 있을 경우
  if (order_status) {
    where += " AND order_status = ?"
    data.push(order_status);
  }

  // GROUP BY / ORDER BY
  where += ' GROUP BY d.order_code ORDER BY order_date desc, order_code desc'

  // LIMIT OFFSET
  if (offset) {
    where += " LIMIT 10 OFFSET ?"
    data.push(Number(offset));
  }

  let result = await db.connection('adminsql', 'orderListPage', data, where).catch(err => { console.log(err) });
  res.send(result);
});

// 전체 데이터 count(페이징)
app.get('/ordercnt', async (req, res) => {
  let data = [];
  let where = " WHERE 1=1";

  var queryData = url.parse(req.url, true).query;

  let start_date = queryData.start_date;
  let end_date = queryData.end_date;
  let merchant_uid = queryData.merchant_uid;
  let member_code = queryData.member_code;
  let product_name = queryData.product_name;
  let order_status = queryData.order_status;

  // 시작일자, 끝날짜 있을 경우
  if (start_date && end_date) {
    // let input = [start_date, end_date]
    where += " AND order_date BETWEEN ?"
    data.push(start_date);
    where += "AND ?"
    data.push(end_date);
    // 끝날짜만 있을 경우
  } else if (!start_date && end_date) {
    where += " AND order_date between '2024-01-01' and ?"
    data.push(end_date);
    // 시작일자만 있을 경우
  } else if (start_date && !end_date) {
    where += " AND order_date between ? and curdate()"
    data.push(start_date);
  }

  // 주문번호가 있을 경우
  if (merchant_uid) {
    where += " AND merchant_uid = ?"
    data.push(merchant_uid);
  }

  // 주문자가 있을 경우
  if (member_code) {
    where += " AND member_code = ?"
    data.push(member_code);
  }

  // 상품명이 있을 경우
  if (product_name) {
    where += " AND product_name LIKE ?"
    data.push("%" + product_name + "%");
  }

  // 상품상태 조건이 있을 경우
  if (order_status) {
    where += " AND order_status = ?"
    data.push(order_status);
  }

  let result = await db.connection('adminsql', 'orderListCount', data, where).catch(err => { console.log(err) });
  res.send(result);
});

// 주문 단건 조회
app.get('/orderInfo/:order_code', async (request, response) => {
  let data = request.params.order_code;
  let result = await db
    .connection('adminsql', 'orderInfo', data)
    .catch((err) => console.log(err));
  response.send(result);
});

module.exports = app;