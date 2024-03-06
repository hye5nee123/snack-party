<template>
    <!-- Single Page Header start -->
    <div class="container-fluid py-5">
    </div>
    <!-- Single Page Header End -->


    <!-- Single Product Start -->
    <div class="container-fluid py-5 mt-5">
        <div class="container py-5">
            <div class="row g-4 mb-5">
                <div class="col-lg-12 col-xl-12">
                    <div class="row g-4">
                        <div class="col-lg-6 col-md-6">
                            <div class="border rounded imgmw">
                                <a href="#">
                                    <img :src="getImgUrl(productInfo[0].path)" class="img-fluid rounded" alt="Image">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th colspan="1">
                                            <h3 class="fw-bold mb-3">{{ productInfo[0].product_name }}</h3>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>원산지</td>
                                        <td>상세/구매 정보 참조</td>
                                    </tr>
                                    <tr>
                                        <td>판매가</td>
                                        <td style="font-weight: bold;">{{
                                        getCurrencyFormat(productInfo[0].product_price) }}원</td>
                                    </tr>
                                    <tr>
                                        <td>리뷰</td>
                                        <td>0건 | <i class="fa fa-star text-secondary" /> 0.0</td>
                                    </tr>
                                    <tr>
                                        <td>배송방법</td>
                                        <td>택배</td>
                                    </tr>
                                    <tr>
                                        <td>배송비</td>
                                        <td>3,000원 (30,000원 이상 구매 시 무료)</td>
                                    </tr>
                                    <tr>
                                        <td>수량</td>
                                        <td>
                                            <div class="input-group quantity" style="width: 100px;">
                                                <div class="input-group-btn">
                                                    <button @click="quantityDown"
                                                        class="btn btn-sm btn-minus rounded-circle bg-light border">
                                                        <i class="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" v-model="quantity"
                                                    class="form-control form-control-sm text-center border-0">
                                                <div class="input-group-btn">
                                                    <button @click="quantityUp"
                                                        class="btn btn-sm btn-plus rounded-circle bg-light border">
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table">
                                <tr>
                                    <th>
                                        <h5 class="fw-bold mb-3">총 상품금액</h5>
                                    </th>
                                    <td>
                                        <h5 class="fw-bold mb-3">{{ getCurrencyFormat(productInfo[0].product_price *
                                        quantity) }} 원</h5>
                                    </td>
                                </tr>
                            </table>
                            <div class="col-lg-12">
                                <a href="#"
                                    class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary col-lg-4"><i
                                        class="fa-regular fa-heart" /> 관심상품</a>
                                <a href="#"
                                    class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary col-lg-4"><i
                                        class="fa-solid fa-cart-plus" /> 장바구니</a>
                                <a href="#"
                                    class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary col-lg-4"><i
                                        class="fa-brands fa-shopify" /> 바로 구매하기</a>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <nav>
                                <div class="nav nav-tabs mb-3">
                                    <button class="nav-link active border-white border-bottom-0" type="button"
                                        role="tab" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                        aria-controls="nav-about" aria-selected="true">상품상세정보</button>
                                    <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                        id="nav-dilret-tab" data-bs-toggle="tab" data-bs-target="#nav-delret"
                                        aria-controls="nav-about" aria-selected="false">배송/반품 안내</button>
                                    <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                        id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review"
                                        aria-controls="nav-review" aria-selected="false">상품리뷰</button>
                                    <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                        id="nav-inquire-tab" data-bs-toggle="tab" data-bs-target="#nav-inquire"
                                        aria-controls="nav-inquire" aria-selected="false">상품문의</button>
                                </div>
                            </nav>
                            <div class="tab-content mb-5">
                                <div class="tab-pane active tacenter" id="nav-about" role="tabpanel"
                                    aria-labelledby="nav-about-tab">
                                    <img :src="getImgUrl(productInfo != null && productInfo.length > 1 ? productInfo[1].path : '') "
                                        class="img-fluid rounded" alt="Image">
                                </div>
                                <div class="tab-pane tacenter" id="nav-delret" role="tabpanel"
                                    aria-labelledby="nav-delret-tab">
                                    <table class="table taleft">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="lfont">배송정보</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>배송 방법 : 택배<br>
                                                    배송 지역 : 전국지역<br>
                                                    배송 비용 : 3,000원<br>
                                                    배송 기간 : 3일 ~ 7일<br>
                                                    배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.<br>
                                                    고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="table taleft">
                                        <thead>
                                            <tr>
                                                <th scope="row" class="lfont">유통기한 안내</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>제품별 생산 일자가 상이하여, 주문 시점에 따라 유통기한이 다를 수 있습니다.<br>
                                                    유통기한이 긴 상품일 경우 잔여 유통기한이 3분의 1이상인 제품으로 출고되고 있으며, 유통기한이 비교적 짧은 제품은 최소
                                                    1달 이상 남은 제품으로 출고됩니다.<br>
                                                    자세한 유통기한 문의는 상품문의로 직접 문의주시면 확인 가능합니다.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="table taleft">
                                        <thead>
                                            <tr>
                                                <th scope="row" class="lfont">교환 및 반품정보</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1) 교환 및 반품이 가능한 경우</td>
                                            </tr>
                                            <tr>
                                                <td>- 상품을 공급 받으신 날로부터 7일이내.<br>
                                                    - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게 이행된 경우에는 공급받은 날로부터 3개월 이내, 그
                                                    사실을 알게 된 날로부터 30일 이내</td>
                                            </tr>
                                            <tr>
                                                <td>2) 교환 및 반품이 불가능한 경우</td>
                                            </tr>
                                            <tr>
                                                <td>- 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한
                                                    경우는 제외<br>
                                                    - 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우<br>
                                                    - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우.<br>
                                                    - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우<br>
                                                    - 복제가 가능한 상품등의 포장을 훼손한 경우<br>
                                                    (자세한 내용은 상품문의를 이용해 주시기 바랍니다.)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품의 왕복 배송 비용은 고객님께서 부담하셔야 합니다.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                                    <h5>리뷰 테이블 출력</h5>
                                    <!-- <div class="d-flex">
                                        <img src="img/avatar.jpg" class="img-fluid rounded-circle p-3"
                                            style="width: 100px; height: 100px;" alt="">
                                        <div class="">
                                            <p class="mb-2" style="font-size: 14px;">April 12, 2024</p>
                                            <div class="d-flex justify-content-between">
                                                <h5>Jason Smith</h5>
                                                <div class="d-flex mb-3">
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <p>The generated Lorem Ipsum is therefore always free from repetition
                                                injected humour, or non-characteristic
                                                words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <img src="img/avatar.jpg" class="img-fluid rounded-circle p-3"
                                            style="width: 100px; height: 100px;" alt="">
                                        <div class="">
                                            <p class="mb-2" style="font-size: 14px;">April 12, 2024</p>
                                            <div class="d-flex justify-content-between">
                                                <h5>Sam Peters</h5>
                                                <div class="d-flex mb-3">
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <p class="text-dark">The generated Lorem Ipsum is therefore always free
                                                from repetition injected humour, or non-characteristic
                                                words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                        </div>
                                    </div>
                                    <form action="#">
                                        <h4 class="mb-5 fw-bold">Leave a Reply</h4>
                                        <div class="row g-4">
                                            <div class="col-lg-6">
                                                <div class="border-bottom rounded">
                                                    <input type="text" class="form-control border-0 me-4"
                                                        placeholder="Yur Name *">
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="border-bottom rounded">
                                                    <input type="email" class="form-control border-0"
                                                        placeholder="Your Email *">
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="border-bottom rounded my-4">
                                                    <textarea name="" id="" class="form-control border-0" cols="30"
                                                        rows="8" placeholder="Your Review *"
                                                        spellcheck="false"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="d-flex justify-content-between py-3 mb-5">
                                                    <div class="d-flex align-items-center">
                                                        <p class="mb-0 me-3">Please rate:</p>
                                                        <div class="d-flex align-items-center" style="font-size: 12px;">
                                                            <i class="fa fa-star text-muted"></i>
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star"></i>
                                                            <i class="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <a href="#"
                                                        class="btn border border-secondary text-primary rounded-pill px-4 py-3">
                                                        Post Comment</a>
                                                </div>
                                            </div>
                                        </div>
                                    </form> -->
                                </div>
                                <div class="tab-pane" id="nav-inquire" role="tabpanel"
                                    aria-labelledby="nav-inquire-tab">
                                    <h5>문의 테이블 출력</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Single Product End -->
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProductInfo',
    data() {
        return {
            productInfo: [{
                product_code: '',
                category: '',
                product_name: '',
                product_price: 0,
                stock_cnt: 0,
                register_date: '',
                product_display: '',
                save_name: '',
                extension: '',
                file_seq: 0,
                thumbnail: '',
                path: ''
            },
            {
                product_code: '',
                category: '',
                product_name: '',
                product_price: 0,
                stock_cnt: 0,
                register_date: '',
                product_display: '',
                save_name: '',
                extension: '',
                file_seq: 0,
                thumbnail: '',
                path: ''
            }],
            pcode: '',
            quantity: '1',
        };
    },
    created() {
        this.pcode = this.$route.query.product_code;
        this.getProductInfo();
    },
    methods: {
        async getProductInfo() {
            console.log('getProductInfo() 실행');
            console.log(`this.pcode : ${this.pcode}`);

            let result = await axios.get(`/api/product/info/${this.pcode}`)
                .catch(err => console.log(err));

            this.productInfo = result.data;

            console.log('this.productInfo : ', this.productInfo);
        },
        getImgUrl(path) {
            if (path)
                return new URL(this.url + '/common/download?path=' + path);
            else
                return '';
        },
        quantityUp() {
            this.quantity++;
        },
        quantityDown() {
            if (this.quantity > 1) {
                this.quantity--;
            } else {
                alert('최소 주문수량은 1개 입니다.');
            }
        },
        getCurrencyFormat(value) {
            return this.$currencyFormat(value);
        },
    }
}
</script>

<style scoped>
.lfont {
    font-size: large;
}

.taleft {
    text-align: left;
    line-height: 30px;
}
</style>