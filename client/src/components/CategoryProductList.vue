<template>
    <div class="col-lg-9">
        <div class="row g-4">
            <div class="col-md-6 col-lg-6 col-xl-4" :key="i" v-for="(product, i) in productList">
                <ProductCard :productInfo="product" />
            </div>
        </div>

        <!-- Pagination 컴포넌트 -->
        <PaginationComp :CURPAGE="curPage" :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION"
            :TOTAL_ARITCLES="TOTAL_ARITCLES" @change-page="onChangePage" />
    </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';
import PaginationComp from './PaginationComp.vue';

export default {
    props: ['cateProps', 'keyProps', 'sortProps'],
    components: {
        ProductCard,
        PaginationComp
    },
    data() {
        return {
            productList: [],
            curPage: 1,       // 현재 페이지
            offset: 0,      // offset에 전달할 페이징 데이터

            ITEM_PER_PAGE: 12,     // 한 페이지에 출력할 데이터 수
            PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
            TOTAL_ARITCLES: 0     // 전체 데이터 갯수
        };
    },
    created() {
        this.getListCount();
        this.getProductList();
    },
    watch: {
        cateProps() {
            this.getProductList();
            this.getListCount();
            this.curPage = 1;
        },
        keyProps() {
            this.getListCount();
            this.getProductList();
            this.curPage = 1;
        },
        sortProps() {
            this.getProductList();
        }
    },
    methods: {
        async getProductList() {
            let param = '';
            param = `?category=${this.cateProps}&keyword=${this.keyProps}&sort=${this.sortProps}&offset=${this.offset}&display=f01`;
            let result = await axios.get(`/api/product${param}`)
                .catch(err => console.log(err));
            this.productList = result.data;
        },
        // 페이지네이션 컴포넌트에서 전달되는 emit event
        onChangePage(data) {
            this.curPage = data;
            this.offset = (this.curPage - 1) * this.ITEM_PER_PAGE;
            this.getProductList();
        },
        // 전체 데이터 갯수
        async getListCount() {
            let param = '';
            param = `?category=${this.cateProps}&keyword=${this.keyProps}&display=f01`;
            let result = await axios.get(`/api/product/count${param}`)
                .catch(err => console.log(err));
            console.log('count : ', result.data[0].count);
            this.TOTAL_ARITCLES = result.data[0].count;
        },
    }
}

</script>