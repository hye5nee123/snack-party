<template>
    <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card">
            <div class="table-responsive">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>주문코드</th>
                            <td>{{ this.orderList.merchant_uid }}</td>
                        </tr>
                        <tr>
                            <th>회원코드</th>
                            <td>{{ this.orderList.member_code }}</td>
                        </tr>
                        <tr>
                            <th>주문일자</th>
                            <td>{{ $formatDate(this.orderList.order_date) }}</td>
                        </tr>
                        <tr>
                            <th>상품금액</th>
                            <td>{{ $currencyFormat(this.orderList.order_price) }}원</td>
                        </tr>
                        <tr>
                            <th>배송비</th>
                            <td>{{ $currencyFormat(this.orderList.delivery_fee) }}원</td>
                        </tr>
                        <tr>
                            <th>적립금 사용</th>
                            <td>{{ $currencyFormat(this.orderList.use_point) }}원</td>
                        </tr>
                        <tr>
                            <th>총결제금액</th>
                            <td>{{ $currencyFormat(this.orderList.total_price) }}원</td>
                        </tr>
                        <tr>
                            <th>적립금</th>
                            <td>{{ $currencyFormat(this.orderList.get_point) }}원</td>
                        </tr>
                        <tr>
                            <th>주문상태</th>
                            <td>
                                <div class="input-group w-300">
                                    <select id="ProductCategory" class="form-select text-capitalize w-150"
                                        v-model="order_status">
                                        <option value="">전체 카테고리</option>
                                        <option value="h01">결제완료</option>
                                        <option value="h02">주문취소</option>
                                        <option value="h03">배송준비중</option>
                                        <option value="h04">배송중</option>
                                        <option value="h05">배송완료</option>
                                        <option value="h06">반품취소</option>
                                        <option value="h07">반품완료</option>
                                        <option value="h08">환불완료</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>운송장번호</th>
                            <td><input type="text" class="form-control" v-model="orderList.delivery_num"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-responsive" style="text-align: center;">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">이미지</th>
                            <th scope="col">상품명</th>
                            <th scope="col">상품가격</th>
                            <th scope="col">수량</th>
                            <th scope="col">총 가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(detail, i) in detailList" :key="i">
                            <th scope="row">
                                <div class="d-flex align-items-center mt-2">
                                    <img :src="getImgUrl(detailList[i].path)" width="100px"
                                        class="img-fluid rounded-top" alt="" />
                                </div>
                            </th>
                            <td class="py-5">{{ detail.product_name }}</td>
                            <td class="py-5">{{ $currencyFormat(detail.product_price) }}원</td>
                            <td class="py-5">{{ detail.cart_cnt }}개</td>
                            <td class="py-5">{{ $currencyFormat(detail.product_price * detail.cart_cnt) }}원</td>
                            <!--리뷰 상세 버튼을 누를 시 작성 버튼이 보임 -->
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="form-control" @click="changeStatus">수정</button>
                <button type="button" class="form-control" @click="$router.go(-1)">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminOrderDetailComp',
    props: [
        "order_code",
        "merchant_uid",
        "member_code"
    ],
    data() {
        return {
            oCode: this.order_code,
            mCode: this.member_code,
            mUid: this.merchant_uid,

            orderList: [],
            detailList: [],

            order_status: '',
        };
    },
    created() {
        this.getOrderInfo();
        this.getMyOrdDetail();
        this.validation();
    },
    methods: {
        ordStatus(status) {
            if (status == 'h01') {
                return '결제완료'
            } else if (status == 'h02') {
                return '주문취소'
            } else if (status == 'h03') {
                return '배송준비중'
            } else if (status == 'h04') {
                return '배송중'
            } else if (status == 'h05') {
                return '배송완료'
            } else if (status == 'h06') {
                return '반품취소'
            } else if (status == 'h07') {
                return '반품완료'
            } else {
                return '환불완료'
            }
        },
        async changeStatus() {
            let chk = 0;
            if (this.order_status == 'h05') {
                let check = await axios.get(`/api/admin/checkPoint/${this.oCode}`)
                    .catch(err => console.log(err));
                chk = check.data[0].count
            }


            if (this.order_status == 'h04' && !this.validation(this.orderList.delivery_num)) {
                alert('올바른 운송장 정보를 입력해주세요');
                return
            }

            let result = await axios.put(`/api/admin/updateOrderStatus/${this.order_status}/${this.oCode}`)
                .catch(err => console.log(err));
            let info = result.data.affectedRows;
            if (info > 0) {

                alert('주문상태가 수정되었습니다.');

                if (this.order_status == 'h05') {

                    if (chk > 0) {
                        alert('이미 해당 주문에 적립된 적립금이 있습니다.');
                    } else {
                        let result1 = await axios.post(`/api/admin/addPoint/${this.oCode}/${this.mCode}`)
                            .catch(err => console.log(err));
                        let info1 = result1.data.affectedRows;

                        let result2 = await axios.put(`/api/admin/updateOrderPoint/${this.oCode}`)
                            .catch(err => console.log(err));
                        let info2 = result2.data.changedRows;

                        if (info1 > 0 && info2 > 0) {
                            alert('배송이 완료되어 적립금이 적립되었습니다.');
                        }
                    }

                }
                if(this.orderList.delivery_num != null){
                    console.log(`this.orderList.delivery_num : ${this.orderList.delivery_num}, this.oCode : ${this.oCode}`)
                    await axios.put(`/api/admin/updateDeliveryNum/${this.orderList.delivery_num}/${this.oCode}`)
                        .catch(err => console.log(err));
                    
                }
            }
            this.$router.go(0);

        },
        async getOrderInfo() {
            let result = await axios.get(`/api/admin/orderInfo/${this.oCode}`)
                .catch(err => console.log(err));
            this.orderList = result.data[0];
            this.order_status = this.orderList.order_status;
            console.log(this.orderList)
        },

        async getMyOrdDetail() {
            let result = await axios.get(`/api/order/myord/details/${this.oCode}/${this.mCode}`)
                .catch(err => console.log(err));
            console.log('getMyOrdDetail() : ', result);
            this.detailList = this.changeField(result.data);
            console.log(this.detailList)
        },

        changeField(objList) {
            let newArr = [];
            for (let obj of objList) {
                newArr.push({
                    detail_code: obj.detail_code,
                    merchant_uid: obj.merchant_uid,
                    product_price: obj.product_price,
                    cart_cnt: obj.order_cnt,
                    detail_price: obj.detail_price,
                    product_name: obj.product_name,
                    path: obj.path,
                    order_status: obj.order_status
                });
            }
            return newArr;
        },

        getImgUrl(path) {
            if (path)
                return new URL(this.url + '/common/download?path=' + path);
            else
                return '';
        },

        validation(delivery_num) {
            const chk = /^[0-9]{12}$/;
            if (chk.test(delivery_num)) {
                return true;
            }
            else {
                return false;
            }
        }
    },
}

</script>
<style scoped>
button {
    display: inline-block;
    width: 100px;
}

input {
    width: 300px;
}
</style>