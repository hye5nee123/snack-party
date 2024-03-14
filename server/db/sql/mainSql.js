// mainSql.js

const productListPopular =
`SELECT p.product_code
, p.category
, p.product_name
, p.product_price
, p.stock_cnt
, p.register_date
, p.product_display
, f.save_name
, f.extension
, f.file_seq
, f.thumbnail
, f.path
, o.order_date
, SUM(NVL(d.order_cnt, 0)) sum
FROM product p LEFT OUTER JOIN detail d ON p.product_code = d.product_code 
            LEFT OUTER JOIN file f ON p.product_code = f.board_code
            JOIN orders o ON d.order_code = o.order_code
WHERE thumbnail='n01'
AND   p.product_display = 'f01'
GROUP BY p.product_code
ORDER BY sum DESC
LIMIT 8`;

const productListNew =
`SELECT p.product_code
, p.category
, p.product_name
, p.product_price
, p.stock_cnt
, p.register_date
, p.product_display
, f.save_name
, f.extension
, f.file_seq
, f.thumbnail
, f.path
FROM product p LEFT OUTER JOIN file f ON p.product_code = f.board_code
WHERE thumbnail='n01'
AND   p.product_display = 'f01'
ORDER BY register_date DESC
LIMIT 8`;

module.exports = {
    productListPopular,
    productListNew
}