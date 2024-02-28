const express = require('express');
const productRouter = express.Router();
const db = require('../db.js');

// 전체조회
app.get('/product', async(req, res)=>{
    let list = await db.connection('productList',data);
    res.send(list);
});

module.exports = productRouter;