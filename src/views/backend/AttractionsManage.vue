<template>
      <LoadingView :active="loading" backgroundColor="#000" color="#fff" />
  <div>
    <h2 class="text-center">景點管理介面</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="70">編號</th>
          <th width="120">分類</th>
          <th>景點名稱</th>
          <th width="80">評價</th>
          <th width="400">地址</th>
          <th width="120">啟用</th>
          <th width="180">功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in attractions" :key="place.id">
          <td>{{ place.id }}</td>
          <td></td>
          <td>{{ place.name }}</td>
          <td>
            {{ place.GoogleRate }}
          </td>
          <td>
            {{ place.address }}
          </td>
          <td>
            <!-- <span v-if="true" class="text-success">啟用</span>
            <span v-else>未啟用</span> -->
            <div class="btn-group btn-toggle">
              <button class="btn btn-sm btn-success active">ON</button>
              <button class="btn btn-sm btn-default ">OFF</button>
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-around">
            <button class="btn btn-primary btn-sm" type="button" @click="openModal(true)">
                新增
              </button>
              <button class="btn btn-success btn-sm" type="button" @click="openModal(false, place)">
                編輯
              </button>
              <button class="btn btn-danger btn-sm" type="button" @click="openDelModal(place)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EditModal :place="chosenPlace" :isNew="isNew" ref="modal" @update-place="updatePlace"/>
  <informModal ref="delModal" @confirm="confirmDelete" />
</template>

<script>
import { mapActions } from 'vuex';
import atrApi from '@/api/atrAPI';
import EditModal from '@/components/editModal.vue';
import InformModal from '@/components/informModal.vue';

export default {
  components: { EditModal, InformModal },
  data() {
    return {
      attractions: [],
      chosenPlace: {},
      isNew: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions('user', ['getCollectionIdSetting']),
    async getAttractions() {
      this.loading = true;
      this.attractions = await atrApi.getAttractions();
      this.loading = false;
    },
    async editAttraction(id, params) {
      this.loading = true;
      const res = await atrApi.editAttraction(id, params);
      this.loading = false;
      console.log(res);
    },
    async addAttraction(params) {
      this.loading = true;
      const res = await atrApi.addAttraction(params);
      this.loading = false;
      console.log(res);
    },
    async deleteAttraction(id) {
      this.loading = true;
      const res = await atrApi.deleteAttraction(id);
      this.loading = false;
      console.log(res);
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (isNew) {
        this.chosenPlace = {};
      } else {
        this.chosenPlace = { ...item };
      }
      this.$refs.modal.openModal();
    },
    openDelModal(item) {
      this.chosenPlace = { ...item };
      const { name } = this.chosenPlace;
      this.$refs.delModal.openModal(`確認要刪除${name}這筆資料`, '刪除確認提示', ['confirm', 'cancel']);
    },
    confirmDelete() {
      const { id } = this.chosenPlace;
      this.deleteAttraction(id);
    },
    hideModal() {
      this.$refs.modal.hideModal();
    },
    updatePlace(temPlace) {
      if (!this.isNew) {
        const { id } = temPlace;
        this.editAttraction(id, temPlace);
      } else {
        this.addAttraction(temPlace);
      }
    },
  },
  mounted() {
    this.getAttractions();
  },
};

</script>

<style lang="scss" scoped>
// switch
</style>
