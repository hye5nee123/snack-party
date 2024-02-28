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
})

module.exports = app;