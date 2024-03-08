// memberSql.js

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

const memberInfo = //회원적립금
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
        , ( SELECT sum(point_value)
	    FROM point
	    WHERE point_status = 'd01'
	    AND member_code = ? ) 
            - 
        NVL(( SELECT sum(point_value) 
             FROM point
             WHERE point_status = 'd02'
             AND member_code = ? ), 0) AS point_value
FROM member m JOIN point p
WHERE m.member_code = p.member_code
AND m.member_code =  ? 
limit 1`;

const memberInsert =
`INSERT INTO member
SET member_code = snack.nextval('MEM')
, ?`

const memberUpdate =
`UPDATE member
SET ?
WHERE member_id = ?`

const memberDelete = 
`DELETE FROM member
WHERE member_code = ?`

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

module.exports = {
    memberList,
    memberInfo,
    memberInsert,
    memberUpdate,
    memberDelete,
    memberLogin,
}