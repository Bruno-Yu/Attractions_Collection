<template>

  <div>
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header text-center">
            <h3 class="display-5">吃貨歸來</h3>
          </div>
          <div class="card-body">
            <label for="user">帳號</label>
            <input type="text" class="form-control form-control-sm" id="user" v-model="account" placeholder="請輸入帳號" />
            <label for="pass">密碼</label>
            <input type="password" class="form-control form-control-sm" id="password" v-model="password"
              placeholder="請輸入密碼" />
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary d-block w-100" id="login" @click="loginMember">登入</button>
          </div>
        </div>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
  <InformModal ref="modal" @confirm="confirm" />
</template>

<script>
import atrApi from '@/api/atrAPI';
import { mapState, mapMutations, mapActions } from 'vuex';
import InformModal from '@/components/informModal.vue';

export default {
  components: { InformModal },
  data() {
    return {
      account: '',
      password: '',
      loading: false,
    };
  },
  computed: {
    ...mapState('user', ['token', 'name', 'login', 'userId', 'collectionId']),
  },
  methods: {
    ...mapMutations('user', [
      'getToken']),
    ...mapActions('user', ['getAsyncToken', 'loginStatus', 'adminStatus', 'loginNameSetting', 'getUserIdSetting', 'getCollectionId']),
    async loginMember() {
      this.loading = true;
      const params = {
        email: this.account,
        password: this.password,
      };
      const res = await atrApi.login(params);
      if (res?.accessToken) {
        this.getAsyncToken(res.accessToken);
        this.loginStatus();
        this.adminStatus(res.user);
        this.getUserIdSetting(res.user.id);
        this.loginNameSetting(res.user.nickName);
        this.getCollectionId();
        this.loading = false;
        this.$refs.modal.openModal('登入成功');
      } else {
        this.loading = false;
        this.$refs.modal.openModal('登入失敗');
      }
    },
    confirm() {
      if (this.login) {
        this.$refs.modal.hideModal();
        this.$router.push('/');
      } else {
        this.$refs.modal.hideModal();
      }
    },
  },
};

</script>
