<template>
  <div>
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header text-center">
            <h3 class="display-5">加入南部吃貨</h3>
          </div>
          <div class="card-body">
            <label for="user">暱稱</label>
            <input type="text" class="form-control form-control-sm" v-model="nickName" id="nickName"
              placeholder="請輸入稱謂" />
            <label for="user">帳號</label>
            <input type="text" class="form-control form-control-sm" v-model="account" id="account"
              placeholder="請輸入註冊郵箱" />
            <label for="pass">密碼</label>
            <input type="password" class="form-control form-control-sm" v-model="password" id="password"
              placeholder="請輸入註冊密碼" />
            <div class="mt-3 form-check">
              <input type="checkbox" class="form-check-input" v-model="admin" id="admin">
              <label class="form-check-label" for="admin">加入管理員權限</label>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary d-block w-100" id="signup" @click="signUp">註冊</button>
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
import InformModal from '@/components/informModal.vue';

export default {
  components: { InformModal },
  data() {
    return {
      account: '',
      password: '',
      nickName: '',
      signUpResult: false,
    };
  },
  methods: {
    async signUp() {
      const params = {
        email: this.account,
        password: this.password,
        nickName: this.nickName,
        roleId: this.admin ? 1 : 2,
      };
      const res = await atrApi.signUp(params);
      if (res?.accessToken) {
        this.signUpResult = true;
        const { id } = res.user;
        await atrApi.signAddCollection({ userId: id });
        this.$refs.modal.openModal('註冊成功，請重新登入!');
      } else {
        this.$refs.modal.openModal('註冊失敗');
      }
    },
    confirm() {
      if (this.signUpResult) {
        this.$refs.modal.hideModal();
        this.$router.push('/login');
      } else {
        this.$refs.modal.hideModal();
      }
    },
  },
};

</script>
