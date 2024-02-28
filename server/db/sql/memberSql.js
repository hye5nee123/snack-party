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

module.exports = {
    memberList
}