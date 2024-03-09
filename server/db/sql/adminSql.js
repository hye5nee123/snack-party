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

module.exports = {
    salesDaily,
    salesMonthly,
    inquiryNotAnswered
}