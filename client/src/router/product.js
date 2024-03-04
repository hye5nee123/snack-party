import ProductList from '../views/ProductList.vue';
import AllProduct from '../views/product/AllProduct.vue';
import CategoryProduct from '../views/product/CategoryProduct.vue';

export default {
    path: '/productlist',
    name: 'ProductList',
    component: ProductList,
    redirect: '/productlist/all',
    children: [
        {
            path: 'all',
            name: 'AllProduct',
            component: AllProduct,
        },
        {
            path: 'category',
            name: 'CategoryProduct',
            component: CategoryProduct
        },
    ]
}