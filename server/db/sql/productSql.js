// productSql.js 
const productListCount = 
`SELECT COUNT(*) count
FROM product`

const productList =
`SELECT product_code
      , category
      , product_name
      , product_price
      , stock_cnt
      , register_date
      , product_display
      , save_name
      , extension
      , file_seq
      , thumbnail
      , path
   FROM product p LEFT OUTER 
   JOIN file f
     ON product_code = board_code
  WHERE thumbnail='n01'`;

const productInfo =
`SELECT product_code
      , category
      , product_name
      , product_price
      , stock_cnt
      , register_date
      , product_display
      , save_name
      , extension
      , file_seq
      , thumbnail
      , path
   FROM product LEFT OUTER 
   JOIN file
     ON product_code = board_code 
  WHERE product_code = ?
  ORDER BY file_seq`;

const productInsert =
`INSERT INTO product
    SET product_code = snack.nextval('PRO'), ?`;

const infoInsert =
`INSERT INTO info
    SET info_code = snack.nextval('INFO'), ?`;

const fileInsert =
`INSERT INTO file
    SET file_code = snack.nextval('FILE'), ?`;

const productUpdate =
`UPDATE product
    SET ?
  WHERE product_code = ?`;

const productReview =
`SELECT r.review_code
      , r.review_title
      , r.review_content
      , r.stars
      , r.review_date
      , r.member_code
   FROM detail d 
   JOIN review r
     ON d.detail_code = r.detail_code
  WHERE d.product_code = ?`;

module.exports = {
    productList,    
    productInfo,
    productInsert,
    productUpdate,
    productReview,
    productListCount,
    infoInsert,
    fileInsert
}