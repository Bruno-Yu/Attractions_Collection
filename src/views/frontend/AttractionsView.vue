<template>
  <LoadingView :active="loading" backgroundColor="#000" color="#fff" />
  <div>
    <h2>景點列表</h2>
    <div class="container text-center">
      <div class="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
        <template v-if="attractions.length">
          <div v-for="(place, index) in attractions" :key="index" class="col">
            <div class="p-3 border bg-light">
              <!-- card -->
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img :src="place.image" class="img-fluid rounded-start" :alt="place.name">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title position-relative">{{ place.name }}
                        <button v-if="login" type="button" class="p-0  position-absolute end-0 top-0 heart"
                          @click="editCollectionsBtn(place.id)">
                          <svg v-if="collections.includes(place.id)" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-heart" viewBox="0 0 16 16">
                            <path
                              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                          </svg>
                        </button>
                      </h5>
                      <p class="card-text text-start"> 說明: {{ sliceWords(place.description, 40) }}</p>
                      <p class="card-text text-start"> 地址: {{ place.address }}</p>
                      <p class="card-text text-start"><small class="text-muted">評價: {{ place.GoogleRate }} </small></p>
                      <RouterLink to="" class="text-end d-block"
                        @click.prevent="$router.push(`/attractions/${place.id}`)">查看細節
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <p v-else> 尚在為您載入資料中，還請稍待 </p>
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
    ...mapState('user', ['login', 'userId', 'collectionId']),
    collectAttractions() {
      return this.attractions.map((place) => !this.collections.includes(place.id));
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
    async editCollections() {
      if (this.userId) {
        const params = {
          attractionId: this.collections,
        };
        this.loading = true;
        await atrApi.editCollections(this.collectionId, params);
        // console.log('編輯結果', res);
        this.loading = false;
      }
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
    sliceWords(str, num) {
      if (str.length > num) {
        return `${str.slice(0, num)}...`;
      }
      return `${str}...`;
    },
  },
  mounted() {
    this.getAttractions();
    this.getCollections();
    console.log(this.$store.state.user.token);
  },
};

</script>

<style lang="scss" scoped>
.heart {
  width: 20px;
  height: 20px;
}
</style>
