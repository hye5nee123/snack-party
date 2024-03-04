// productSql.js 

const productList =
`SELECT p.product_code
, p.category
, p.product_name
, p.product_price
, p.stock_cnt
, p.register_date
, p.product_display
, f.save_name
, f.extension
, f.thumbnail
, f.path
FROM product p 
LEFT OUTER JOIN file f
ON p.product_code = f.board_code `;

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
    productUpdate,
}