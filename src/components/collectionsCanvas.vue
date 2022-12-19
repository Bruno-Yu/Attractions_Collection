<template>
  <LoadingView :active="loading" is-full-page="false" />
  <div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="collections" aria-labelledby="collectionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="collectionsLabel">吃貨收藏清單</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <template v-if="collectAttractions.length">
          <div>
            <div v-for="place in collectAttractions" :key="place.id" class="card">
              <div class="card-body">
                <h5 class="card-title">{{ place.name }}</h5>
                <p class="card-text">地址 {{ place.address }}</p>
                <p class="card-text">評價 {{ place.GoogleRate }}</p>
                <div class="d-flex justify-content-end">
                  <a href="#" class="btn btn-outline-primary me-3"
                    @click.prevent="$router.push(`/attractions/${place.id}`)">查看細節</a>
                  <a href="#" class="btn btn-danger" @click.prevent="editCollectionsBtn(place.id)">取消收藏</a>
                </div>
              </div>
            </div>
          </div>
        </template>
        <p v-else> 目前尚無蒐藏喔! </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import atrApi from '@/api/atrAPI';

export default {
  data() {
    return {
      attractions: [],
      collections: [],
      loading: false,
    };
  },

  computed: {
    ...mapState('user', ['login', 'userId']),
    collectAttractions() {
      if (this.collections.length > 0) {
        return this.attractions.map((place) => !this.collections.includes(place.id));
      }
      return [];
    },
  },
  methods: {
    ...mapActions('user', ['getCollectionIdSetting']),
    async getAttractions() {
      this.loading = true;
      this.attractions = await atrApi.getAttractions();
      this.loading = false;
    },
    async getCollections() {
      if (this.userId) {
        this.loading = true;
        const res = await atrApi.getCollections(this.userId);
        this.collections = [...res[0].attractionId];
        this.getCollectionIdSetting(res[0].id);
        // console.log(res);
        this.loading = false;
      }
    },
    sliceWords(str, num) {
      if (str.length > num) {
        return `${str.slice(0, num)}...`;
      }
      return `${str}...`;
    },
    editCollectionsBtn(id) {
      if (this.collections.includes(id)) {
        this.collections = [...this.collections.filter((item) => item !== id)];
        this.editCollections();
        this.getCollections();
      } else {
        this.collections = [...this.collections.push(id)];
        this.editCollections();
        this.getCollections();
      }
    },
  },

  mounted() {
    this.getAttractions();
    this.getCollections();
  },
};

</script>
