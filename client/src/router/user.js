import UserMain from '../views/UserMain.vue';
import Main from '../views/ShopMain.vue';
import ProductList from '../views/ProductList.vue';
import SignUp from '../views/member/SignUp.vue';
import LoginView from '../views/member/LoginView.vue';
import Cart from '../views/order/CartView.vue';
import CheckOut from '../views/order/CheckOutView.vue';
import CheckOutTest from '../views/order/CheckOutTestView.vue';

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
    {
      path : 'productlist',
      name : 'ProductList',
      component : ProductList
    },
    {
      path : 'signup',
      name : 'SignUp',
      component : SignUp
    },
    {
      path : 'login',
      name : 'LoginView',
      component : LoginView
    },
    {
      path : 'cart',
      name : 'Cart',
      component : Cart
    },
    {
      path : 'checkout',
      name : 'CheckOut',
      component : CheckOut
    },
    {
      path : 'checkouttest',
      name : 'CheckOutTest',
      component : CheckOutTest
    }
  ]
}