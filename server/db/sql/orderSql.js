/* < cart > */

//장바구니 목록 -- 상품이미지 추가해야 됨
const cartList = 
`SELECT c.cart_code
      ,p.product_name
	    , c.cart_cnt
      , p.product_price
    	, c.member_code
	    , c.product_code
      , p.stock_cnt
FROM cart c JOIN product p
			ON c.product_code = p.product_code
WHERE member_code = (SELECT member_code
                     FROM member
                     WHERE member_id = ?)`


//장바구니 담기
const cartInsert = //db에선 명령어 되는데 test가 실행 X
`INSERT INTO cart 
SET cart_code = snack.nextval('CART')
    , ?`

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
const cartDelete =
`DELETE FROM cart
WHERE cart_code = ?`



//====================================================

/* < orders > */

//주문 등록
const orderInsert =
`INSERT INTO orders
SET order_code = snack.nextval('ORD')
    , ?`

//주문상세 등록
const detailInsert =
`INSERT INTO detail
SET detail_code = snack.nextval('DET')
    , ?`

//배송정보 등록
const deliveryInsert =
`INSERT INTO delivery
SET delivery_code = snack.nextval('DEL')
    , ?`


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
const detailList =
`SELECT detail_code
	    , detail_price
      , product_code
      , order_code
      , order_cnt
      , product_price
FROM detail
WHERE order_code = ?`


module.exports = {
//1)장바구니
  cartList, //목록
  cartInsert, //담기
  cartCheck, //중복확인
  cartCntUpdate, //수량수정
  cartDelete,

//2)주문하기  
  orderInsert,
  detailInsert,
  deliveryInsert,


  orderList,
  detailList,
}