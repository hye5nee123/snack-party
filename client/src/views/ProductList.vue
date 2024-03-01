<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Shop</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="/main">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Shop</li>
        </ol>
    </div>
    <!-- Single Page Header End -->


    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">Delicious snack shop</h1>
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <div class="input-group w-100 mx-auto d-flex">
                                <input type="search" class="form-control p-3" placeholder="keywords"
                                    aria-describedby="search-icon-1">
                                <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                            </div>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <div class="ps-3 py-3 rounded d-flex sort-text-align mb-4">
                                <label for="fruits">정렬:</label>
                                <select id="fruits" name="fruitlist" class="border-0 form-select-sm me-3" form="fruitform">
                                    <option value="name">상품명순</option>
                                    <option value="popular">인기순</option>
                                    <option value="new">신상품순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <h4>카테고리</h4>
                                        <ul class="list-unstyled fruite-categorie" :key="i"
                                            v-for="(category, i) in categoryList">
                                            <li>
                                                <div class="d-flex justify-content-between fruite-name">
                                                    <a @click="selectCategory(category.sub_code)"><i class="fa-solid fa-cookie"></i> {{ category.sub_codename }}</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CategoryProductList :cateProps="scategory"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fruits Shop End-->
</template>

<script>
import CategoryProductList from '@/components/CategoryProductList.vue';
import axios from 'axios';

export default {
    name: 'ProductList',
    components: {
        CategoryProductList
    },
    data() {
        return {
            categoryList: [],
            scategory: ''
        };
    },
    created() {
        this.getCategoryList();
    },
    methods: {
        async getCategoryList() {
            let result = await axios.get('/api/product/category')
                .catch(err => console.log(err));
            this.categoryList = result.data;
        },
        // getCategoryProductList(category) {
        //     this.$router.push({ path: '/productlist', query: { 'category': category } });
        // }
        selectCategory(category){
            this.scategory = category;
        }
    }
}
</script>