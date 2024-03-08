const express = require('express');
const app = express();
const db = require('../db.js');
const url = require('url');

// 게시물 수 조회
app.get('/count', async (req, res) => {
    let data = [];
    let where = " WHERE 1=1";
    var queryData = url.parse(req.url, true).query;
    let category = queryData.category;
    let keyword = queryData.keyword;
    let display = queryData.display;
    let status = queryData.status;

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

    // 상품상태 조건이 있을 경우
    if (status == 'so') {
        where += " AND stock_cnt = 0"
    }

    // 공개유무 조건이 있을 경우
    if (display) {
        where += " AND product_display = ?"
        data.push(display);
    }

    let result = await db.connection('productsql', 'productListCount', data, where).catch(err => { console.log(err) });
    res.send(result);
});

// 전체조회
app.get('/', async (req, res) => {
    let data = [];
    let where = "";
    var queryData = url.parse(req.url, true).query;
    let category = queryData.category;
    let keyword = queryData.keyword;
    let sort = queryData.sort;
    let display = queryData.display;
    let status = queryData.status;
    let offset = queryData.offset;

    // 키워드가 있을 경우
    if (keyword) {
        where += " AND product_name LIKE ?"
        data.push("%" + keyword + "%");
    }

    // 카테고리가 있을 경우
    if (category) {
        where += " AND category = ?"
        data.push(category);
    }

    // 상품상태 조건이 있을 경우
    if (status == 'so') {
        where += " AND stock_cnt = 0"
    }

    // 공개유무 조건이 있을 경우
    if (display) {
        where += " AND product_display = ?"
        data.push(display);
    }

    // 정렬이 있을 경우
    if (sort == 'name') {
        where += " ORDER BY product_name"
    } else if (sort == 'new') {
        where += " ORDER BY register_date"
    } else if (sort == 'lprice') {
        where += " ORDER BY product_price"
    } else if (sort == 'hprice') {
        where += " ORDER BY product_price DESC"
    }

    // LIMIT OFFSET
    if (offset) {
        where += " LIMIT 12 OFFSET ?"
        data.push(Number(offset));
    }

    let result = await db.connection('productsql', 'productList', data, where).catch(err => { console.log(err) });
    res.send(result);
});

// 단건조회
app.get('/info/:product_code', async (req, res) => {
    let data = req.params.product_code;
    let result = await db.connection('productsql', 'productInfo', data).catch(err => { console.log(err) });
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