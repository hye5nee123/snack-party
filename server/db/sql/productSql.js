// productSql.js 

const productList =
`SELECT product_code
        , category
        , product_name
        , product_price
        , stock_cnt
        , register_date
        , product_display
FROM product`;

const productInfo =
`SELECT product_code
        , category
        , product_name
        , product_price
        , stock_cnt
        , register_date
        , product_display
FROM product
WHERE product_code = ?`;

const productInsert =
`INSERT INTO product
SET ?`;

const productUpdate =
`UPDATE product
SET ?
WHERE product_code = ?`;

module.exports = {
    productList,
    productInfo,
    productInsert,
    productUpdate
}