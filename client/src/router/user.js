import UserMain from '../views/UserMain.vue';
import MainView from '../views/MainView.vue';

export default {

  path: '/',
  name: 'home',
  component: UserMain,
  children: [
    {
    path: '/main',
    name: 'userMain',
    component: MainView
    }
  ]
}