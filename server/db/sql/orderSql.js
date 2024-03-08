/* < cart > */

//장바구니 목록 -- 상품이미지 추가해야 됨
const cartList = 
`SELECT c.cart_code
, p.product_code
, p.product_name
, c.cart_cnt
, p.product_price
, c.member_code
, c.product_code
, p.stock_cnt
, f.path
FROM cart c JOIN product p
              ON c.product_code = p.product_code
            LEFT OUTER JOIN file f
              ON c.product_code = f.board_code
WHERE member_code = ( SELECT member_code
                      FROM member
                      WHERE member_id = ? )
AND f.thumbnail = 'n01'`


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
//상품 장바구니 수량 추가
const cartCntPlus = 
`UPDATE cart
SET cart_cnt = cart_cnt + ?
WHERE cart_code = ?`

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

//주문 후 재고량 수정
const stockCntUpdate =
`UPDATE product
SET stock_cnt = stock_cnt - ?
WHERE product_code = ?`;

//주문 후 회원포인트 내역 등록(d02차감내역)
const memUsedPointInsert = //point_status d02
`INSERT INTO point
SET point_code = snack.nextval('POI')
    , ?`

//======================================================

/* < 나의 주문내역 > */

//전체 주문 목록
const orderListAll =
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
FROM orders`

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
  cartCntPlus,
  cartCntUpdate, //수량수정
  cartDelete,

//2)주문하기  
  orderInsert, //주문등록
  detailInsert, //상세등록
  deliveryInsert, //배송등록
  stockCntUpdate, //재고량수정
  memUsedPointInsert, //회원포인트 차감내역 추가


  
  //3)주문관리
  orderList,
  detailList,
  orderListAll,
}