<template>
    <div class="col-lg-12">
        <div class="row g-4">
            <div class="col-md-6 col-lg-4 col-xl-3" :key="i" v-for="(product, i) in productList">
                <ProductCard :productInfo="product" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import ProductCard from './ProductCard.vue';

export default {
    name: 'MainProductList',
    props: ['sort'],
    components: { ProductCard },
    data() {
        return {
            productList: []
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        async getProductList() {
            if(this.sort =='popular') {
                let result = await axios.get(`/api/main/popular`)
                    .catch(err => console.log(err));       
                    this.productList = result.data;
            }
            else {
                let result = await axios.get(`/api/main/new`)
                    .catch(err => console.log(err)); 
                    this.productList = result.data;
            }
        },
    }
}
</script>