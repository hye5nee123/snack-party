import product from './product.js';

import UserMain from '../views/UserMain.vue';
import Main from '../views/ShopMain.vue';
import MemberInsert from '../views/MemberInsert.vue';
import Cart from '../views/order/CartView.vue';

export default {
  path: '/',
  name: 'home',
  component: UserMain,
  redirect : '/main',
  children : [
    {
      path : 'main',
      name : 'Main',
      component : Main,
    },
    product,
    {
      path : 'memberinsert',
      name : 'MemberInsert',
      component : MemberInsert
    },
    {
      path : 'cart',
      name : 'Cart',
      component : Cart
    }
  ]
}