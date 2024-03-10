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

module.exports = {
    salesDaily,
    salesMonthly,
    inquiryNotAnswered,
    orderListPage,
    orderListCount,
}