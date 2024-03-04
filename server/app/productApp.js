const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');
const url = require('url')

// 전체조회
app.get('/', async (req, res) => {
    let data = [];
    let where = "WHERE 1=1";
    var queryData = url.parse(req.url, true).query;
    let category = queryData.category;
    let keyword = queryData.keyword;
    let order = queryData.order;
    //키워드가 있을 경우
    if (keyword) {
        where += " AND product_name LIKE ?"
        data.push("%" + keyword + "%");
    }

    //카테고리가 있을 경우
    if (category) {
        where += " AND category = ?"
        data.push(category);
    }

    //페이징이 있을 경우
    if (order == 'new') {
        where += " ORDER BY register_date"
    } else {
        where += " ORDER BY product_name"
    }

    let result = await db.connection('productsql', 'productList', data, where);
    res.send(result);
});

// 단건조회
app.get('/info/:product_code', async (req, res) => {
    let data = req.params.product_code;
    let result = await db.connection('productsql', 'productInfo', data)
    res.send(result);
});

// 등록
app.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await db.connection('productsql', 'productInsert', data)
    res.send(result);
});

// 수정
app.put('/:product_code', async (req, res) => {
    let data = [req.body.param, req.params.product_code];
    let result = await db.connection('productsql', 'productUpdate', data)
    res.send(result);
});

// 카테고리 리스트
app.get('/category', async (req, res) => {
    let data = '0E';
    let result = await db.connection('commonsql', 'categoryList', data)
    res.send(result);
});

// 카테고리별 상품 리스트
app.get('/category/:category', async (req, res) => {
    let data = [req.params.category];
    let result = await db.connection('productsql', 'categoryProductList', data)
    res.send(result);
});

module.exports = app;