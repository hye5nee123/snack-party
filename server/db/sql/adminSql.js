// adminSql.js

// 오늘 매출
const salesDaily =
`SELECT NVL(SUM(order_price), 0) daily 
FROM orders
WHERE order_date = curdate();`;

// 월간 매출
const salesMonthly =
`SELECT NVL(SUM(order_price), 0) monthly
FROM orders
WHERE YEAR(order_date) = YEAR(CURDATE()) AND MONTH(order_date) = MONTH(CURDATE());`;

// 미답변 문의
const inquiryNotAnswered = 
`SELECT COUNT(*) count
FROM   inquiry
WHERE  answer_status is null`;

//나의 전체 주문 목록 (-외 몇 개) + 페이징
const orderListPage =
`SELECT row_number() over(order by o.order_date desc, order_code desc) as num
      , o.order_code
      , member_code
      , DATE_FORMAT(order_date, '%Y-%m-%d') as order_date
      , merchant_uid
      , total_price
      , order_status
      , DATE_FORMAT(cancel_date, '%Y-%m-%d') as cancel_date
      , imp_uid
      , p.product_name
      , COUNT(d.order_code)-1 as buy_cnt
FROM orders o JOIN detail d
				        ON o.order_code = d.order_code
              JOIN product p
				        ON d.product_code = p.product_code `

const orderListCount = 
`SELECT COUNT(*) count
FROM orders`

const orderInfo = 
`SELECT  o.order_code
, o.member_code
, o.order_date
, o.delivery_fee
, o.order_price
, o.use_point
, o.total_price
, o.get_point
, o.order_status
, o.cancel_date
, o.imp_uid
, o.merchant_uid
, d.delivery_num
FROM    orders o JOIN delivery d
ON      o.order_code = d.order_code
WHERE   o.order_code = ?`

const updateOrderStatus = 
`UPDATE orders
SET order_status = ?
WHERE order_code = ?`

const addPoint = 
`INSERT INTO point
SET point_code = snack.nextval('POI')
	, order_code = ?
	, point_status = 'd01'
    , point_date = curdate()
	, point_value = (SELECT (NVL(total_price,0)-NVL(delivery_fee,0)-NVL(use_point,0))*0.01 point
                    FROM   orders
                    WHERE  order_code = ?)
	, member_code = ?`

const updateOrderPoint = 
`UPDATE orders
SET get_point = (SELECT point_value
				FROM   point
				WHERE  order_code = ?)
WHERE order_code = ?`

const checkPoint = 
`SELECT COUNT(*) count 
FROM   point 
WHERE  order_code = ?`

// 회원조회
const memberList =
`SELECT row_number() over(order by member_code) AS num
        , member_code
        , member_id
        , pw
        , member_name
        , member_phone
        , member_email
        , DATE_FORMAT(birthday, '%Y-%m-%d') as birthday
        , gender
        , postcode
        , member_type
        , DATE_FORMAT(join_date, '%Y-%m-%d') as join_date
        , address
        , address_detail
        , member_status
        , DATE_FORMAT(quit_date, '%Y-%m-%d') as quit_date
        , token
FROM member`;

// 회원조회 상세
const memberInfo =
`SELECT member_code
        , member_id
        , pw
        , member_name
        , member_phone
        , member_email
        , DATE_FORMAT(birthday, '%Y-%m-%d') as birthday
        , gender
        , postcode
        , member_type
        , DATE_FORMAT(join_date, '%Y-%m-%d') as join_date
        , address
        , address_detail
        , member_status
        , DATE_FORMAT(quit_date, '%Y-%m-%d') as quit_date
        , token
FROM member
WHERE member_code = ?`;

const checkDeliveryNum = 
`SELECT delivery_num
FROM  delivery
WHERE order_code = ?`

const updateDeliveryNum = 
`UPDATE delivery
SET   delivery_num = ?
WHERE order_code = ?`

module.exports = {
    salesDaily,
    salesMonthly,
    inquiryNotAnswered,
    orderListPage,
    orderListCount,
    orderInfo,
    updateOrderStatus,
    addPoint,
    checkPoint,
    memberList,
    updateOrderPoint,
    checkDeliveryNum,
    updateDeliveryNum,
    memberInfo
}