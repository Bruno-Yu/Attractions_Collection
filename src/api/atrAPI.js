import Api from '@/assets/js/api';
// import qs from 'qs';

const apiPrefix = import.meta.env.VITE_LOCAL_API;

// Api 自 Api 繼承所有屬性與方法
class atrApi extends Api {
  // 註冊
  static async signUp({
    email, password, nickName, roleId,
  }) {
    const params = {
      email, password, nickName, roleId,
    };
    const res = await this.callAxios('POST', `${apiPrefix}signup`, params, undefined, false);
    return res;
  }

  // 登入
  static async login({ email, password }) {
    const params = {
      email, password,
    };
    const res = await this.callAxios('POST', `${apiPrefix}login`, params, undefined, false);
    return res;
  }

  // 取得景點
  static async getAttractions() {
    // const params = {
    //   rocNumOrBan,
    // };
    const res = await this.callAxios('GET', `${apiPrefix}attractions`, null, undefined, false);
    return res;
  }

  // 取得單一景點
  static async getAttraction(id) {
    const res = await this.callAxios('GET', `${apiPrefix}attractions/${id}`, null, undefined, false);
    return res;
  }

  //  取得蒐藏
  static async getCollections(id) {
    const res = await this.callAxios('GET', `${apiPrefix}users/${id}/collections`, null, undefined, false);
    return res;
  }

  //  新增蒐藏
  static async editCollections(id, { attractionId }) {
    const params = {
      attractionId,
    };
    const res = await this.callAxios('PATCH', `${apiPrefix}collections/${id}`, params, undefined, true);

    return res;
  }
}

export default atrApi;