//< cart >

//장바구니 목록
//상품이미지 추가해야 됨
const cartList = 
`SELECT p.product_name
	    , c.cart_cnt
      , p.product_price * c.cart_cnt as pro_price
	    , c.member_code
	    , c.product_code
FROM cart c JOIN product p
			ON c.product_code = p.product_code
WHERE member_code = ?
ORDER BY c.product_code`

//장바구니 추가
const cartInsert =
`INSERT INTO cart SET ?`
//장바구니 삭제
const cartDeleteAll =
`DELETE FROM cart
WHERE member_code = (select member_code
                     FROM member
                     WHERE member_id = ?)`

//선택
// const cartCheck =



//< orders >
// const orderInsert =


module.exports = {
  cartList,
  cartInsert,
  cartDeleteAll,
}
