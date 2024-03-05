<template>
    <div class="col-lg-9">
        <div class="row g-4">
            <div class="col-md-6 col-lg-6 col-xl-4" :key="i" v-for="(product, i) in productList">
                <ProductCard :productInfo="product" />
            </div>
        </div>
        <div class="col-12">
            <div class="pagination d-flex justify-content-center mt-5">
                <a href="#" class="rounded">&laquo;</a>
                <a href="#" class="active rounded">1</a>
                <a href="#" class="rounded">2</a>
                <a href="#" class="rounded">3</a>
                <a href="#" class="rounded">4</a>
                <a href="#" class="rounded">5</a>
                <a href="#" class="rounded">6</a>
                <a href="#" class="rounded">&raquo;</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue'

export default {
    props: ['cateProps', 'keyProps', 'sortProps'],
    components: {
        ProductCard
    },
    data() {
        return {
            productList: [],
        };
    },
    created() {
        this.getProductList();
    },
    watch: {
        cateProps() {
            this.getProductList();
        },
        keyProps() {
            this.getProductList();
        },
        sortProps(){
            this.getProductList();
        }
    },
    methods: {
        async getProductList() {
            let param = '';
            param = `?category=${this.cateProps}&keyword=${this.keyProps}&sort=${this.sortProps}`;
            let result = await axios.get(`/api/product${param}`)
                .catch(err => console.log(err));
            this.productList = result.data;
        }
    }
}

</script>