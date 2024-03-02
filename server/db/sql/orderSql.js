/* < cart > */

//장바구니 목록 -- 상품이미지 추가해야 됨
const cartList = 
`SELECT p.product_name
	    , c.cart_cnt
      , p.product_price
    	, c.member_code
	    , c.product_code
FROM cart c JOIN product p
			ON c.product_code = p.product_code
WHERE member_code = (SELECT member_code
                     FROM member
                     WHERE member_id = ?)`

// const cartList =
// `SELECT *
// FROM cart`

//장바구니 담기
// const cartInsert = //db에선 명령어 되는데 test가 실행 X
// `INSERT INTO cart 
// SET cart_code = snack.nextval('CART')
//     , cart_cnt = ?
//     , member_code = ?
//     , product_code = ?`
const cartInsert =
`INSERT INTO cart
SET ?`



//장바구니 담기 전 중복확인
const cartCheck =
`SELECT *
FROM cart
WHERE member_code = ?
AND product_code = ?`


//장바구니 수량 변경
const cartCntUpdate =
`UPDATE cart
SET cart_cnt = ?
WHERE cart_code = ?`


//삭제
const cartDelOne =
`DELETE FROM cart
WHERE cart_code = ?`



// //====================================================

/* < orders > */

// //주문 등록
// const orderInsert =
// `INSERT INTO orders
// SET ?`

// //주문상세 등록
// const detailInsert =
// `INSERT INTO detail
// SET ?`


// //주문 목록
// const orderList =
// `SELECT order_code
//       , member_code
//       , order_date
//       , delivery_fee
//       , order_price
//       , use_point
//       , total_price
//       , get_point
//       , order_status
//       , cancel_date
//       , imp_uid
// FROM orders
// WHERE order_code = ?`

// //주문상세 목록
// `SELECT detail_code
// 	    , detail_price
//       , product_code
//       , order_code
//       , order_cnt
//       , product_price
// FROM detail
// WHERE order_code = ?`


module.exports = {
  cartList, //목록
  cartInsert, //담기
  cartCheck, //중복확인
  cartCntUpdate, //수량수정
  cartDelOne,

//   orderInsert,
//   detailInsert,
//   orderList,
//   detailList,
}