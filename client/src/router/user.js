import UserMain from '../views/UserMain.vue';
import Main from '../views/ShopMain.vue';
import ProductList from '../views/ProductList.vue';
import MemberInsert from '../views/member/SignUp.vue';
import Cart from '../views/order/CartView.vue';

export default {

  path: '/',
  name: 'home',
  component: UserMain,
  redirect: '/main',
  children: [
    {
      path: 'main',
      name: 'Main',
      component: Main,
    },
    {
      path: 'productlist',
      name: 'ProductList',
      component: ProductList,
    },
    {
      path: 'memberinsert',
      name: 'MemberInsert',
      component: MemberInsert,
    },
    {
      path: 'cart',
      name: 'Cart',
      component: Cart,
    }
  ]
}