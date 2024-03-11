const express = require('express');
const app = express();
const db = require('../db.js');
const url = require('url');
const multer = require('multer');
const upload = multer({ dest: process.env.FILE_PATH + '/product' });

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

    // 공개유무(userProductList->f01/adminProductList->null)
    if (display) {
        where += " AND product_display = ?"
        data.push(display);
    }

    // 정렬이 있을 경우
    if (sort == 'name') {
        where += " ORDER BY product_name"
    } else if (sort == 'new') {
        where += " ORDER BY register_date DESC"
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
app.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'detail' }]), async (req, res) => {
    let conn = null;
    try {
        //connection 가져오기
        conn = await db.getConnecttion();

        // transaction 시작
        await db.excuteConnection(conn, 'START TRANSACTION');

        // 1. 상품 테이블 상품 등록
        let data = {};
        data.category = req.body.category;
        data.product_name = req.body.product_name;
        data.product_price = req.body.product_price;
        data.stock_cnt = req.body.product_cnt;
        data.product_display = req.body.product_display;
        let result = await db.trConnection(conn, 'productsql', 'productInsert', data).catch(err => { console.log(err) });

        // 상품 테이블 등록 후 생성된 상품 코드 불러오기
        let product_code = await db
            .trConnection(conn, 'commonsql', 'currval', ['PRO', 'PRO'])
            .catch((error) => {
                console.log(error);
            });

        // 2. 첨부파일 등록 - 썸네일 이미지
        console.log(req.files['thumbnail']);
        let thumbnailFile = {};
        thumbnailFile.board_code = product_code[0].seq;
        thumbnailFile.thumbnail = 'n01';
        console.log(req.files['thumbnail'][0]);
        thumbnailFile.path = 'product/' + req.files['thumbnail'][0].filename;
        let thumbnail_file = await db.trConnection(conn, 'productsql', 'fileInsert', thumbnailFile).catch(err => { console.log(err) });

        // 3. 첨부파일 등록 - 상세 이미지
        console.log(req.files['detail']);
        if (req.files['detail']) {
            let detailFile = {};
            detailFile.board_code = product_code[0].seq;
            detailFile.thumbnail = 'n02';
            detailFile.path = 'product/' + req.files['detail'][0].filename;
            let detail_file = await db.trConnection(conn, 'productsql', 'fileInsert', detailFile).catch(err => { console.log(err) });
        }

        // 4. 상세 정보 테이블 등록
        let detail_data = {};
        detail_data.product_code = product_code[0].seq;
        detail_data.company = req.body.company;
        detail_data.expire_date = req.body.expire_date;
        detail_data.weight = req.body.weight;
        detail_data.unit = req.body.unit;
        detail_data.allergy = req.body.allergy;
        detail_data.calorie = req.body.calorie;
        detail_data.na = req.body.na;
        detail_data.carbo = req.body.carbo;
        detail_data.sugar = req.body.sugar;
        detail_data.sfat = req.body.sfat;
        detail_data.protein = req.body.protein;
        let result_info = await db.trConnection(conn, 'productsql', 'infoInsert', detail_data).catch(err => { console.log(err) });

        //transaction commit
        await db.excuteConnection(conn, 'COMMIT');

        //실행 후 결과 반환
        return res.send(result);

    } catch (err) {
        console.log(err);

        //transaction rollback
        await db.excuteConnection(conn, 'ROLLBACK');
        return response.status(500).json(err);
    } finally {
        conn.release();
    }
});

// 수정
app.put('/:product_code', upload.fields([{ name: 'thumbnail' }, { name: 'detail' }]), async (req, res) => {
    let conn = null;
    try {
        //connection 가져오기
        conn = await db.getConnecttion();

        // transaction 시작
        await db.excuteConnection(conn, 'START TRANSACTION');

        // 1. 상품 테이블 상품 수정
        const productCode = req.params.product_code;
        let data = {};
        data.category = req.body.category;
        data.product_name = req.body.product_name;
        data.product_price = req.body.product_price;
        data.stock_cnt = req.body.product_cnt;
        data.product_display = req.body.product_display;
        let result = await db.trConnection(conn, 'productsql', 'productUpdate', [data, productCode]).catch(err => { console.log(err) });

        // 상품 테이블 등록 후 생성된 상품 코드 불러오기
        let product_code = await db
            .trConnection(conn, 'commonsql', 'currval', ['PRO', 'PRO'])
            .catch((error) => {
                console.log(error);
            });

        // 2. 첨부파일 수정 - 썸네일 이미지
        console.log(req.files['thumbnail']);
        let thumbnailFile = {};
        thumbnailFile.board_code = product_code[0].seq;
        thumbnailFile.thumbnail = 'n01';
        if (req.files['thumbnail']) {
            console.log(req.files['thumbnail'][0]);
            thumbnailFile.path = 'product/' + req.files['thumbnail'][0].filename;
            let thumbnail_file = await db.trConnection(conn, 'productsql', 'fileUpdate', [thumbnailFile, productCode, 'n01']).catch(err => { console.log(err) });
        }

        // 3. 첨부파일 수정 - 상세 이미지
        console.log(req.files['detail']);
        if (req.files['detail']) {
            let detailFile = {};
            detailFile.board_code = product_code[0].seq;
            detailFile.thumbnail = 'n02';
            detailFile.path = 'product/' + req.files['detail'][0].filename;
            let detail_file = await db.trConnection(conn, 'productsql', 'fileUpdate', [detailFile, productCode, 'n02']).catch(err => { console.log(err) });
        }

        // 4. 상세 정보 테이블 수정
        let detail_data = {};
        detail_data.product_code = product_code[0].seq;
        detail_data.company = req.body.company;
        detail_data.expire_date = req.body.expire_date;
        detail_data.weight = req.body.weight;
        detail_data.unit = req.body.unit;
        detail_data.allergy = req.body.allergy;
        detail_data.calorie = req.body.calorie;
        detail_data.na = req.body.na;
        detail_data.carbo = req.body.carbo;
        detail_data.sugar = req.body.sugar;
        detail_data.sfat = req.body.sfat;
        detail_data.protein = req.body.protein;
        let result_info = await db.trConnection(conn, 'productsql', 'infoUpdate', [detail_data, productCode]).catch(err => { console.log(err) });

        //transaction commit
        await db.excuteConnection(conn, 'COMMIT');

        //실행 후 결과 반환
        return res.send(result);

    } catch (err) {
        console.log(err);

        //transaction rollback
        await db.excuteConnection(conn, 'ROLLBACK');
        return response.status(500).json(err);
    } finally {
        conn.release();
    }
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