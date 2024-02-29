const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');


//장바구니 조회
app.get('/carts/:userId', async(request, response) => {
  let data = request.params.userId;
  let result = db.connection(sql.ordersql.cartList, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  }) 
});

//장바구니 추가
app.post('/carts', async(request, response) => {
  let data = request.body.param;
  let result = db.connection(sql.ordersql.cartInsert, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  })
});
//장바구니 상품 중복체크
app.get('/carts/:ucode', async(request, response) => {
  let data = [request.params.ucode, request.params.pcode];
  let result = db.connection(sql.ordersql.cartCheck, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  })
});
//장바구니 전체선택(주문,삭제)
//수량

//=================================
//< orders >

//주문등록
app.post('/', async(request, response) => {
  let data = request.body.param;
  let result = db.connection(sql.ordersql.orderInsert, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  })
});

//주문상세등록
app.post('/details', async(request, response) => {
  let data = request.body.param;
  let result = db.connection(sql.ordersql.detailInsert, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  })
});

//주문조회
app.get('/:ocode', async(request, response) => {
  let data = request.params.ocode;
  let result = db.connection(sql.ordersql.orderList, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  }) 
});

//주문상세조회
app.get('/details/:ocode', async(request, response) => {
  let data = request.params.userId;
  let result = db.connection(sql.ordersql.detailList, data).then(result => {
    response.send(result);
  }).catch(err => {
    console.log(err);
  }) 
});


module.exports = app;