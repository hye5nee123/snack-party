<template>
    <div class="col-lg-9">
        <div class="row g-4 justify-content-center">
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
    props: ['cateProps'],
    components: {
        ProductCard
    },
    data() {
        return {
            productList: [],
            keyword: ''
        };
    },
    created() {
        if(this.$route.query.keyword){
            this.keyword = this.$route.query.keyword;
        }
        this.getProductList(this.cateProps, this.keyword);
    },
    watch: {
        cateProps() {
            this.getProductList(this.cateProps, this.keyword);
        },
        keyword (){
            this.getProductList(this.cateProps, this.keyword);
        }
    },
    methods: {
        async getProductList(scate, skeyword) {
            let param = '';
            if (scate != '') {
                param = `?category=${scate}`;
            }
            if(skeyword != ''){
                param += `&keyword=${skeyword}`;
            }
            let result = await axios.get(`/api/product${param}`)
                .catch(err => console.log(err));
            this.productList = result.data;
        }
    }
}

</script>