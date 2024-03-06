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

const memberInfo =
`SELECT m.member_code
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
        , p.point_value
FROM member m JOIN point p
WHERE m.member_code = p.member_code
AND m.member_id = ?`;

const memberInsert =
`INSERT INTO member
SET member_code = snack.nextval('MEM')
, ?`

const memberUpdate =
`UPDATE member
SET ?
WHERE member_code = ?`

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
WHERE member_id = ?`;

module.exports = {
    memberList,
    memberInfo,
    memberInsert,
    memberUpdate,
    memberDelete,
    memberLogin
}