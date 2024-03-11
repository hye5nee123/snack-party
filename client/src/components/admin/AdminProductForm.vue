<template>
    <div class="col-12 col-lg-8">
        <!-- Product Information -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-tile mb-0">상품 등록</h5>
            </div>
            <div class="card-body">
                <form name="productForm">
                    <div class="mb-3">
                        <label class="form-label" for="product_code">상품코드(필수)</label>
                        <input type="text" class="form-control" id="product_code" placeholder="등록하면 자동으로 생성됩니다."
                            name="product_code" aria-label="product_code" v-model="productInfo.product_code" readonly>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="category">카테고리(필수)</label>
                        <div class="input-group">
                            <select ref="category" class="form-select text-capitalize w-150" name="category"
                                v-model="productInfo.category">
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
                        <input type="file" class="form-control" ref="thumbnail" accept="image/png, image/jpeg"
                            name="thumbnail" @change="getThumbnail($event.target.files)">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">상세사진</label>
                        <input type="file" class="form-control" accept="image/png, image/jpeg" name="detail">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="expire_date">유통기한</label>
                        <input type="date" class="form-control" ref="expire_date" v-model="productInfo.expire_date"
                            name="expire_date">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">공개유무</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="product_display" id="inlineRadio1"
                                value="f01" v-model="productInfo.product_display">
                            <label class="form-check-label" for="inlineRadio1">공개</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="product_display" id="inlineRadio2"
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
                                        <input type="number" class="form-control" min="0" v-model="productInfo.weight"
                                            name="weight">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">제공단위</label>
                                        <input type="text" class="form-control" v-model="productInfo.unit" name="unit">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">알레르기</label>
                                        <input type="text" class="form-control" v-model="productInfo.allergy"
                                            name="allergy">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">칼로리</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="0"
                                                v-model="productInfo.calorie" name="calorie">
                                            <span class="input-group-text">kcal</span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">나트륨</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="0" v-model="productInfo.na"
                                                name="na">
                                            <span class="input-group-text">mg</span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">탄수화물</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="0"
                                                v-model="productInfo.carbo" name="carbo">
                                            <span class="input-group-text">g</span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">당류</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="0"
                                                v-model="productInfo.sugar" name="sugar">
                                            <span class="input-group-text">g</span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">포화지방</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="0" v-model="productInfo.sfat"
                                                name="sfat">
                                            <span class="input-group-text">g</span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">단백질</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="0"
                                                v-model="productInfo.protein" name="protein">
                                            <span class="input-group-text">g</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
                thumbnail: '',
                path: '',
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
            } else if (!this.productInfo.product_price) {
                alert('상품 가격을 입력해주세요.');
                this.$refs.product_price.focus();
                return '';
            } if (!this.productInfo.path) {
                alert('대표사진을 설정해주세요.');
                return '';
            }

            const formData = new FormData(document.productForm);
            console.log(formData)

            let result = await axios.post("/api/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).catch(err => console.log(err));

            let info = result.data.affectedRows;
            console.log(info)
            if (info > 0) {
                alert('등록되었습니다.');
                this.$router.push({ path: '/admin/product' });
            }
        },
        async getThumbnail(files) {
            let fileName = files[0].name;
            this.productInfo.path = `product/${fileName}`;
            if (this.productInfo.path) {
                this.productInfo.thumbnail = 'n01';
            }
            console.log(this.productInfo.path);
            console.log(this.productInfo.thumbnail);
        },
    }
}
</script>