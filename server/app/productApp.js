const express = require('express');
const app = express();
const db = require('../db.js');

// 전체조회
app.get('/', async (req, res) => {
    let result = await db.connection('productsql', 'productList');
    res.send(result);        
});

// 단건조회
app.get('/info/:product_code', async (req, res) => {
    let data = req.params.product_code;
    let result = await db.connection('productsql', 'productInfo', data);
    res.send(result);        
});

// 등록
app.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await db.connection('productsql', 'productInsert', data);
    res.send(result);
});

// 수정
app.put('/:product_code', async (req, res) => {
    let data = [req.body.param, req.params.product_code];
    let result = await db.connection('productsql', 'productUpdate', data);
    res.send(result);
});

// 카테고리 리스트
app.get('/category', async (req, res) => {
    let result = await db.connection('commonsql', 'categoryList', '0E');
    res.json(result);
});

// 카테고리별 상품 리스트
app.get('/category/:category', async (req, res) =>{
    let data = [req.params.category];
    let result = await db.connection('productsql', 'categoryProductList', data);
    res.send(result);
});

module.exports = app;