// store/index.js 内容

import { createStore } from 'vuex';
import user from './modules/user';
// import { test1 } from './modules/test1';

const store = createStore({
  // Vuex允许store分割成小的module,每个模块拥有自己的state、mutation、action、getter;
  // 访问test的状态：store.state.test
  modules: {
    user, // store模块1
  },
});

export default store;
