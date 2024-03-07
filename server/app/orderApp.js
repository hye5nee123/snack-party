const express = require('express');
const app = express.Router();
const db = require('../db.js');
const url = require('url');


//장바구니 조회
app.get('/carts/:userId', async(request, response) => {
  let data = request.params.userId;
  let result = await db.connection('ordersql', 'cartList', data);
    response.send(result);
});

//장바구니 담기
app.post('/carts', async(request, response) => {
  let data = request.body.param;
  let result = await db.connection('ordersql', 'cartInsert', data).catch(error => {console.log(error)});
    response.send(result);
});

//장바구니 담기 전 상품 중복체크
app.get('/carts/:ucode/:pcode', async(request, response) => {
  let data = [request.params.ucode, request.params.pcode];
  let result = await db.connection('ordersql', 'cartCheck', data);
    response.send(result);
  console.log('장바구니 담긴 상품?', result)
});
//이미 담겨있는 상품에 수량 추가
app.put('/addCnt/:cnt/:ccode', async(request, response) => {
  let data = [request.params.cnt, request.params.ccode];
  let result = await db.connection('ordersql', 'cartCntPlus', data);
  response.send(result);
})

//장바구니 수량 변경
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

//주문, 상세, 배송 등록
app.post('/', async(request, response) => {
  let order = request.body.param.order;
  let details = selectedInfo(request.body.param.orderDetail);
  let delivery = request.body.param.deliveryInfo;
  let point = request.body.param.point;

  let result = await db.connection('ordersql', 'orderInsert', order).catch(error => {console.log(error)});
  console.log('order결과: ' ,result);  //insertId: 0
  //주문테이블 등록 후 생성된 주문코드
  let order_code = await db.connection('commonsql', 'currval', ['ORD', 'ORD']).catch(error => {console.log(error)});
  console.log('details결과', details);
  //상세테이블
  for(let i=0; i < details.length; i++) {
    details[i].order_code =  order_code[0].seq
    await db.connection('ordersql', 'detailInsert', details[i]).catch(error => {console.log(error)});
  }

  //배송테이블
  delivery.order_code = order_code[0].seq; 
  await db.connection('ordersql', 'deliveryInsert', delivery).catch(error => {console.log(error)});

  //포인트차감내역 추가
  point.order_code = order_code[0].seq;
  await db.connection('ordersql', 'memUsedPointInsert', point).catch(error => {console.log(error)});

  response.send(result);
});

//장바구니에서 넘어 온 checkList의 필드명을 변경시켜서 새로운 배열로 담기
function selectedInfo(list) {
  let newArr = [];
  for(let obj of list) {
      newArr.push( {
          product_code: obj.product_code,
          order_cnt: obj.cart_cnt,
          product_price: obj.product_price,
          detail_price: obj.product_price * obj.cart_cnt  
      }  );
  }
  return newArr;
};

//재고량 수정
app.put('/:orderedCnt/:pco', async(request, response) => {
  let data = [request.params.stockCnt, request.params.pcode];
  let result = await db.connection('ordersql', 'stockCntUpdate', data);
  response.send(result);
});

//회원포인트 수정
app.put('/:usepoint/:mco', async(request, response) => {
  let data = [request.params.usepoint, request.params.mco];
  let result = await db.connection('ordersql', 'memPointUpdate', data);
  response.send(result);
});

//=======================================
//< 나의 주문내역 >

// //주문전체조회
// app.get('/', async(request, response) => {
//   let result = await db.connection('ordersql', 'orderListAll');
//   response.send(result);
// });

// //주문조회
// app.get('/:ocode', async(request, response) => {
//   let data = request.params.ocode;
//   let result = db.connection(sql.ordersql.orderList, data).then(result => {
//     response.send(result);
//   }).catch(err => {
//     console.log(err);
//   }) 
// });

// //주문상세조회
// app.get('/details/:ocode', async(request, response) => {
//   let data = request.params.userId;
//   let result = db.connection(sql.ordersql.detailList, data).then(result => {
//     response.send(result);
//   }).catch(err => {
//     console.log(err);
//   }) 
// });


module.exports = app;