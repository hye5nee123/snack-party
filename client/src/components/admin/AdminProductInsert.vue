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
                        name="product_code" aria-label="product_code" readonly>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="category">카테고리(필수)</label>
                    <div class="input-group">
                        <select id="category" class="form-select text-capitalize w-150">
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
                    <input type="text" class="form-control" id="product_name" placeholder="상품명을 입력하세요."
                        name="product_name" aria-label="Product title" v-model="product_name">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="product_price">가격(필수)</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="product_price" min="0" value="1500"
                            name="product_price" aria-label="product_price">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="product_cnt">수량</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="product_cnt" min="0" value="100"
                            name="product_cnt" aria-label="product_cnt">
                        <span class="input-group-text">개</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="company">제조사</label>
                    <input type="text" class="form-control" id="company" placeholder="제조사를 입력하세요." name="company"
                        aria-label="company">
                </div>
                <div class="mb-3">
                    <label class="form-label">대표사진(필수)</label>
                    <input type="file" class="form-control" accept="image/png, image/jpeg">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="ecommerce-product-name">상세사진</label>
                    <input type="file" class="form-control" accept="image/png, image/jpeg">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="expire_date">유통기한</label>
                    <input type="date" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">공개유무</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                            value="f01">
                        <label class="form-check-label" for="inlineRadio1">공개</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                            value="f02">
                        <label class="form-check-label" for="inlineRadio2">비공개</label>
                    </div>
                </div>
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
                                    <input type="number" class="form-control" min="0">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">제공단위</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">알레르기</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">칼로리</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0">
                                        <span class="input-group-text">kcal</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">나트륨</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0">
                                        <span class="input-group-text">mg</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">탄수화물</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">당류</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">포화지방</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">단백질</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" min="0">
                                        <span class="input-group-text">g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Product Information -->
    </div>
</template>
<script>

export default {
    name: 'AdminProductInsert',
    components: {},
    data() {
        return {

        };
    },
    setup() { },
    created() { },
    mounted() { },
    unmounted() { },
    methods: {}
}
</script>