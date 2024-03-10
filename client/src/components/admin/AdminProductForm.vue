<template>
    <div class="col-12 col-lg-8">
        <!-- Product Information -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-tile mb-0">상품 등록</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label" for="product_code">상품코드(필수)</label>
                    <input type="text" class="form-control" id="product_code" placeholder="등록하면 자동으로 생성됩니다."
                        name="product_code" aria-label="product_code" v-model="productInfo.product_code" readonly>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="category">카테고리(필수)</label>
                    <div class="input-group">
                        <select ref="category" class="form-select text-capitalize w-150" v-model="productInfo.category">
                            <option value="e01">과자</option>
                            <option value="e02">비스킷/크래커</option>
                            <option value="e03">쿠키/파이</option>
                            <option value="e04">유기농/전통과자</option>
                            <option value="e05">초콜릿</option>
                            <option value="e06">젤리/캐러멜</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="product_name">상품명(필수)</label>
                    <input type="text" class="form-control" ref="product_name" placeholder="상품명을 입력하세요."
                        name="product_name" aria-label="Product title" v-model="productInfo.product_name">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="product_price">가격(필수)</label>
                    <div class="input-group">
                        <input type="number" class="form-control" ref="product_price" min="0" name="product_price"
                            aria-label="product_price" v-model="productInfo.product_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="product_cnt">수량</label>
                    <div class="input-group">
                        <input type="number" class="form-control" ref="product_cnt" min="0" name="product_cnt"
                            aria-label="product_cnt" v-model="productInfo.stock_cnt">
                        <span class="input-group-text">개</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="company">제조사</label>
                    <input type="text" class="form-control" ref="company" placeholder="제조사를 입력하세요." name="company"
                        aria-label="company" v-model="productInfo.company">
                </div>
                <div class="mb-3">
                    <label class="form-label">대표사진(필수)</label>
                    <input type="file" class="form-control" ref="thumbnail" accept="image/png, image/jpeg">
                </div>
                <div class="mb-3">
                    <label class="form-label">상세사진</label>
                    <input type="file" class="form-control" accept="image/png, image/jpeg">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="expire_date">유통기한</label>
                    <input type="date" class="form-control" ref="expire_date" v-model="productInfo.expire_date">
                </div>
                <div class="mb-3">
                    <label class="form-label">공개유무</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                            value="f01" v-model="productInfo.product_display">
                        <label class="form-check-label" for="inlineRadio1">공개</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                            value="f02" v-model="productInfo.product_display">
                        <label class="form-check-label" for="inlineRadio2">비공개</label>
                    </div>
                </div>

                <!-- 필수 정보가 아닌 것들은 아코디언으로 펼쳐서 입력 가눙 -->
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                추가정보
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="mb-3">
                                    <label class="form-label">중량</label>
                                    <input type="number" class="form-control" min="0" v-model="productInfo.weight">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">제공단위</label>
                                    <input type="text" class="form-control" v-model="productInfo.unit">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">알레르기</label>
                                    <input type="text" class="form-control" v-model="productInfo.allergy">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">칼로리</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0" v-model="productInfo.calorie">
                                        <span class="input-group-text">kcal</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">나트륨</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0" v-model="productInfo.na">
                                        <span class="input-group-text">mg</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">탄수화물</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0" v-model="productInfo.carbo">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">당류</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0" v-model="productInfo.sugar">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">포화지방</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0" v-model="productInfo.sfat">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">단백질</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0" v-model="productInfo.protein">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center m-4">
                <button type="button" class="btn btn-outline-danger" @click="backToProductList">취소</button>
                <button type="button" class="btn btn-outline-warning"
                    @click="isUpdated ? productUpdate() : productInsert()">저장</button>
            </div>
        </div>
        <!-- /Product Information -->
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'AdminProductInsert',
    components: {},
    data() {
        return {
            productInfo: {
                product_code: '',
                category: '',
                product_name: '',
                product_price: 1500,
                stock_cnt: 0,
                product_display: 'f02',
                info_code: '',
                company: '',
                weight: 0,
                unit: '',
                allergy: '',
                calorie: 0,
                na: 0,
                carbo: 0,
                sugar: 0,
                sfat: 0,
                protein: 0,
                expire_date: '',
            },
            isUpdated: false,
        };
    },
    created() {
        let productCode = this.$route.query.pcode;
        if (productCode > 0) {
            // 수정
            this.getProductInfo(productCode);
            this.isUpdated = true;
        }
    },
    mounted() { },
    methods: {
        backToProductList() {
            this.$router.push({ path: '/admin/product' });
        },
        async productInsert() {
            if (!this.productInfo.category) {
                alert('카테고리를 선택해주세요.');
                this.$refs.category.focus();
                return '';
            } else if (!this.productInfo.product_name) {
                alert('상품명을 입력해주세요.');
                this.$refs.product_name.focus();
                return '';
            }else if(!this.productInfo.product_price){
                alert('상품 가격을 입력해주세요.');
                this.$refs.product_price.focus();
                return '';
            }

            let data = {
                param: {
                    category: this.productInfo.category,
                    product_name: this.productInfo.product_name,
                    product_price: this.productInfo.product_price,
                    stock_cnt: this.productInfo.stock_cnt,
                    product_display: this.productInfo.product_display,
                }
            };

            let result = await axios.post("/api/product", data)
                .catch(err => console.log(err));

            let info = result.data.affectedRows;
            if (info > 0) {
                alert('등록되었습니다.');
                this.$router.push({ path: '/admin/product' });
            }
        }
    }
}
</script>