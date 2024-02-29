<template>
    <div class="col-lg-9">
        <div class="row g-4 justify-content-center">
            <div class="col-md-6 col-lg-6 col-xl-4"  v-for="(product, i) in productList">
                <ProductCard />
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
    components: {
        ProductCard
    },
    data() {
        return {
            productList: []
        };
    },
    created() {
        let category = this.$route.query.category;
        this.getProductList(category);
    },
    methods: {
        async getProductList(category) {
            let result = await axios.get(`/api/product/category/${category}`)
                .catch(err => console.log(err));
            this.productList = result.data;
        },
    }
}
</script>