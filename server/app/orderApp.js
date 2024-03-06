const express = require('express');
const app = express.Router();
const db = require('../db.js');
// const fs = 


//장바구니 조회
app.get('/carts/:userId', async(request, response) => {
  let data = request.params.userId;
  let result = await db.connection('ordersql', 'cartList', data);
    response.send(result);
});

//장바구니 담기
app.post('/carts', async(request, response) => {
  let data = request.body.param;
  let result = await db.connection('ordersql', 'cartInsert', data);
    response.send(result);
});

//장바구니 담기 전 상품 중복체크
app.get('/carts/:ucode/:pcode', async(request, response) => {
  let data = [request.params.ucode, request.params.pcode];
  let result = await db.connection('ordersql', 'cartCheck', data);
    response.send(result);
});

//수량
app.put('/carts/:cnt/:ccode', async(request, response) => {
  let data = [request.params.cnt, request.params.ccode];
  let result = await db.connection('ordersql', 'cartCntUpdate', data);
  response.send(result);
})

//장바구니 삭제
app.delete('/carts/:ccode', async(request, response) => {
  let data = request.params.ccode;
  let result = await db.connection('ordersql', 'cartDelete', data);
    response.send(result);
});


//=============================================================
//< orders >

//주문등록
app.post('/', async(request, response) => {
  let order = request.body.param.order;
  let details = request.body.param.orderDetail;
  let delivery = request.body.param.deliveryInfo;

  let result = await db.connection('ordersql', 'orderInsert', order).catch(error => {console.log(error)});
  console.log('order결과: ' + JSON.stringify(result));  //insertId: 0
  
  for(let i; i < details.length; i++) {
    details[i].order_code =  result.order_code//order.order_code;
    await db.connection('ordersql', 'detailInsert', details[i]).catch(error => {console.log(error)});
  }
  delivery.order_code = result.order_code; 
  
  await db.connection('ordersql', 'deliveryInsert', delivery).catch(error => {console.log(error)});

  response.send(result);
});

// //주문상세등록
// app.post('/details', async(request, response) => {
//   let data = request.body.param;
//   response.send(result);
// });

// //배송지등록
// app.post('/delivery', async(request, response) => {
//   let data = request.body.param;
//   response.send(result);
// });

//---------------------
//주문전체조회
app.get('/', async(request, response) => {
  let result = await db.connection('ordersql', 'orderListAll');
  response.send(result);
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