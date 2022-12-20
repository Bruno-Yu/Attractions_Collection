import atrApi from '@/api/atrAPI';

const user = {
  namespaced: true,
  state: {
    name: '導入vuex 成功',
    token: '',
    userId: 0,
    collectionId: 0,
    currentPlace: {},
    login: false,
    admin: false,
    loading: false,
    attractions: [],
    collections: [],
  },
  // 从state派生的一些状态，可以将该部分抽离出来成函数方便调用
  // getters: {
  //   getUserInfo: (state) => `${state.name}的职业是${state.profession}`,
  // },
  getters: {
    collections(state) {
      if (state.collections.length) {
        return state.attractions.filter((place) => state.collections.includes(place.id));
      }
      return [];
    },
  },
  mutations: {
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
    loadingStatus(state) {
      state.loading = !state.loading;
    },
    getAttractions(state, payload) {
      state.attractions = payload;
    },
    getCollections(state, payload) {
      state.collections = [...payload];
    },
    editCollectionsBtn(state, payload) {
      if (state.collections.includes(payload)) {
        console.log(' includes 觸發');
        state.collections = [...state.collections.filter((item) => item !== payload)];
      } else {
        console.log(' push 觸發');
        state.collections.push(payload);
      }
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
    async getAttractions(context) {
      context.commit('loadingStatus');
      const payload = await atrApi.getAttractions();
      context.commit('getAttractions', payload);
      context.commit('loadingStatus');
    },
    // async getAttractions(context) {
    //   context.commit('loadingStatus');
    //   const payload = await atrApi.getAttractions();
    //   context.commit('getAttraction', payload);
    //   context.commit('loadingStatus');
    // },
    async getCollectionId(context) {
      // getCollections(id)
      const res = await atrApi.getCollectionId(context.state.userId);
      const { id } = res[0];
      context.commit('getCollectionId', id);
    },
    async getCollections(context) {
      if (context.state.login) {
        const res = await atrApi.getCollections(context.state.collectionId);
        const { attractionId } = res;
        context.commit('getCollections', attractionId);
      }
    },
    async editCollections(context) {
      if (context.state.login) {
        const params = {
          attractionId: context.state.collections,
        };
        context.commit('loadingStatus');
        await atrApi.editCollections(context.state.collectionId, params);
        // console.log('編輯結果', res);
        context.commit('loadingStatus');
      }
    },
    async getAttraction(context, payload) {
      context.commit('loadingStatus');
      const res = await atrApi.getAttraction(payload);
      console.log(res.PromiseResult);
      context.state.currentPlace = { ...res };
      context.commit('loadingStatus');
    },
    editCollectionsBtn(context, payload) {
      context.commit('editCollectionsBtn', payload);
      context.dispatch('editCollections');
      context.dispatch('getCollections');
      // this.getCollections();
      // if (context.state.collections.includes(id)) {
      //   context.state.collections = [...context.state.collections.filter((item) => item !== id)];
      //   this.editCollections();
      //   this.getCollections();
      // } else {
      //   this.collections.push(id);
      //   this.editCollections();
      //   this.getCollections();
      // }
    },
  },
};

export default user;
