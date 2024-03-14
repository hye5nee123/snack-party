// memberSql.js

// 전체조회
const memberList =
`SELECT member_code
        , member_id
        , pw
        , member_name
        , member_phone
        , member_email
        , birthday
        , gender
        , postcode
        , member_type
        , join_date
        , address
        , address_detail
        , member_status
        , quit_date
        , token
FROM member
ORDER BY member_code`;

// 등록
const memberInsert =
`INSERT INTO member
SET member_code = snack.nextval('MEM')
, ?`

// 수정
const memberUpdate =
`UPDATE member
SET ?
WHERE member_id = ?`

// 삭제
const memberDelete = 
`DELETE FROM member
WHERE member_code = ?`

// 단건조회, 로그인, 아이디/비밀번호 찾기
const memberLogin = 
`SELECT member_code
        , member_id
        , pw
        , member_name
        , member_phone
        , member_email
        , birthday
        , gender
        , postcode
        , member_type
        , join_date
        , address
        , address_detail
        , member_status
        , quit_date
        , token
FROM member
WHERE member_id = ?
OR member_name = ?`;

//==< 박정언 >===================================
const memberInfo = //회원적립금(주문)
`SELECT m.member_code
, member_id
, member_name
, member_phone
, member_email
, birthday
, postcode
, member_type
, join_date
, address
, address_detail
, member_status
, NVL(( SELECT sum(point_value)
    FROM point
    WHERE point_status = 'd01'
    AND member_code = ? ), 0)
    - 
  NVL(( SELECT sum(point_value) 
        FROM point
        WHERE point_status = 'd02'
        AND member_code = ? ), 0) AS point_value
FROM member m LEFT OUTER JOIN point p
ON m.member_code = p.member_code
WHERE m.member_code =  ? 
LIMIT 1`

//보유적립금 내역
const memPointList =
`SELECT point_code
      , order_code
      , review_code
      , point_status
      , DATE_FORMAT(point_date, '%Y-%m-%d') as point_date
      , point_value
      , member_code
      , NVL(( SELECT sum(point_value)
	      FROM point
	      WHERE point_status = 'd01'
              AND member_code = ?), 0)
	- 
	NVL(( SELECT sum(point_value) 
	      FROM point
              WHERE point_status = 'd02'
              AND member_code = ?), 0) AS total_point
FROM point
WHERE member_code = ?
ORDER BY point_date DESC
LIMIT ? OFFSET ?`

//페이징용 개수
const pointListCount = 
`SELECT COUNT(*) count
FROM point
WHERE member_code = ?`

module.exports = {
    memberList,
    memberInsert,
    memberUpdate,
    memberDelete,
    memberLogin,

    memberInfo,
    memPointList,
    pointListCount
}