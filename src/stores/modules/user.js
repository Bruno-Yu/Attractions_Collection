const user = {
  namespaced: true,
  state: {
    name: '導入vuex 成功',
    token: '',
    userId: 0,
    collectionId: 0,
    login: false,
    admin: false,
  },
  // 从state派生的一些状态，可以将该部分抽离出来成函数方便调用
  // getters: {
  //   getUserInfo: (state) => `${state.name}的职业是${state.profession}`,
  // },
  mutations: {
    testMutation1(state) {
      // 变更状态
      state.age += 1;
    },
    getUserId(state, payload) {
      state.userId = payload;
    },
    getCollectionId(state, payload) {
      state.collectionId = payload;
    },
    getToken(state, payload) {
      state.token = payload;
    },
    loginStatus(state) {
      state.login = !state.login;
    },
    loginName(state, payload) {
      state.name = payload;
    },
    adminStatus(state) {
      state.admin = !state.admin;
    },
  },
  actions: {
    getAsyncToken(context, payload) {
      context.commit('getToken', payload);
    },
    loginStatus(context) {
      context.commit('loginStatus');
    },
    loginNameSetting(context, payload) {
      context.commit('loginName', payload);
    },
    getUserIdSetting(context, payload) {
      context.commit('getUserId', payload);
    },
    getCollectionIdSetting(context, payload) {
      context.commit('getCollectionId', payload);
    },
    adminStatus(context, payload) {
      if (payload?.roleId === 1) {
        context.commit('adminStatus', payload);
      }
    },
  },
};

export default user;
