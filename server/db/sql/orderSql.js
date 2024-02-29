//< cart >
//목록 -- 상품이미지 추가해야 됨
const cartList = 
`SELECT p.product_name
	    , c.cart_cnt
      , p.product_price
	    , c.member_code
	    , c.product_code
FROM cart c JOIN product p
			ON c.product_code = p.product_code
WHERE member_code = (SELECT member_code
                     FROM MEMBER
                     WHERE member_id = ?)`

//담기
const cartInsert = //확인 cart_code = 'cart'+cart_seq.nextval
`INSERT INTO cart 
SET ?`
//중복확인
const cartCheck =
`SELECT *
FROM cart
WHERE member_code = ?
AND product_code = ?`

//전체선택(주문,삭제)
// const cartAllUpdate =
// `UPDATE cart
// SET `

//삭제
const cartDeleteAll =
`DELETE FROM cart
WHERE member_code = (select member_code
                     FROM member
                     WHERE member_id = ?)`



//====================================================
//< orders >
//주문 등록
const orderInsert =
`INSERT INTO orders
SET ?`

//주문상세 등록
const detailInsert =
`INSERT INTO detail
SET ?`


//주문 목록
const orderList =
`SELECT order_code
      , member_code
      , order_date
      , delivery_fee
      , order_price
      , use_point
      , total_price
      , get_point
      , order_status
      , cancel_date
      , imp_uid
FROM orders
WHERE order_code = ?`

//주문상세 목록
const detailList=
`SELECT detail_code
	, detail_price
      , product_code
      , order_code
      , order_cnt
      , product_price
FROM detail
WHERE order_code = ?`


module.exports = {
  cartList,
  cartInsert,
  cartCheck,
  cartDeleteAll,
  orderInsert,
  detailInsert,
  orderList,
  detailList,
}
