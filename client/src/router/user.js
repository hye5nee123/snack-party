import UserMain from '../views/UserMain.vue';
import Main from '../views/ShopMain.vue';
import ProductList from '../views/ProductList.vue';
import SignUp from '../views/SignUp.vue';

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
    }
  ]
}