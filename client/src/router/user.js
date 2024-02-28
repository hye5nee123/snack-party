import UserMain from '../views/UserMain.vue';
import Main from '../views/ShopMain.vue';
import ProductList from '../views/ProductList.vue';

export default {

  path: '/',
  name: 'home',
  component: UserMain,
  redirect : '/main/main',
  children : [
    {
      path : 'main',
      name : 'Main',
      component : Main,
    },
    {
      path : 'list',
      name : 'ProductList',
      component : ProductList
    }
  ]
}