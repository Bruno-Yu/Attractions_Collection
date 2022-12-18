<template>
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
          <th width="120">功能</th>
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
              <button class="btn btn-success btn-sm" type="button" @click="openModal(false, item)">
                編輯
              </button>
              <button class="btn btn-danger btn-sm" type="button" @click="openDelProductModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import atrApi from '@/api/atrAPI';

export default {
  data() {
    return {
      attractions: [],
    };
  },
  methods: {
    ...mapActions('user', ['getCollectionIdSetting']),
    async getAttractions() {
      this.attractions = await atrApi.getAttractions();
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
