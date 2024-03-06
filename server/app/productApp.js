const express = require('express');
const app = express();
const db = require('../db.js');
const url = require('url');

// 전체조회
app.get('/', async (req, res) => {
    let data = [];
    let where = "";
    var queryData = url.parse(req.url, true).query;
    let category = queryData.category;
    let keyword = queryData.keyword;
    let sort = queryData.sort;

    // LIMIT OFFSET
    

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

    //정렬이 있을 경우
    if (sort == 'name') {
        where += " ORDER BY product_name"
    } else if (sort == 'new') {
        where += " ORDER BY register_date"
    } else if (sort == 'lprice') {
        where += " ORDER BY product_price"
    } else if (sort == 'hprice') {
        where += " ORDER BY product_price DESC"
    }

    let result = await db.connection('productsql', 'productList', data, where).catch(err=>{console.log(err)});
    res.send(result);
});

// 단건조회
app.get('/info/:product_code', async (req, res) => {
    let data = req.params.product_code;
    let result = await db.connection('productsql', 'productInfo', data).catch(err=>{console.log(err)});
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