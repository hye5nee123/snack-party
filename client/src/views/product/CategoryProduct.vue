<template>
    <div class="col-lg-9">
        <div class="row g-4 justify-content-center">
            <div class="col-md-6 col-lg-6 col-xl-4" :key="i" v-for="(product, i) in productList">
                <ProductCard />
            </div>
        </div>
        <div class="col-12">
            <div class="pagination d-flex justify-content-center mt-5">
                <a class="rounded">&laquo;</a>
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
            category: ''
        };
    },
    created() {
        this.category = this.$route.query.category;
        this.getProductList(this.cateProps);
    },
    watch : {
        cateProps(){
            this.getProductList(this.cateProps);
        }
    },
    methods: {
        async getProductList(scate) {
            if (scate == '') {
                let result = await axios.get(`/api/product/`)
                    .catch(err => console.log(err));
                this.productList = result.data;
            }
            else {
                let result = await axios.get(`/api/product/category/${scate}`)
                    .catch(err => console.log(err));
                this.productList = result.data;
            }
        },
    }
}
</script>