<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/attractions">小吃集</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ data.name }}</li>
      </ol>
    </nav>
    <h2>{{ data.name }}</h2>
    <h4> <span class="fw-bold">地址:</span> {{ data.address }} </h4>
    <h5> <span class="fw-bold">Google 評價:</span> {{ data.GoogleRate }}</h5>
    <button type="button" v-if="login" class="d-block p-0" @click="editCollectionsBtn(data.id)">
      <p class="m-0">加入收藏 <svg v-if="collections.includes(data.id)" xmlns="http://www.w3.org/2000/svg" width="16"
          height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
          viewBox="0 0 16 16">
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </p>
    </button>
    <p><span class="fw-bold">描述:</span> {{ data.description }}</p>
  </div>
</template>

<script>
import atrApi from '@/api/atrAPI';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: '',
      data: {},
      collections: [],
    };
  },
  computed: {
    ...mapState('user', ['login', 'userId', 'collectionId']),
  },
  methods: {
    ...mapActions('user', ['getCollectionIdSetting']),
    async getAttraction(id) {
      this.data = await atrApi.getAttraction(id);
    },
    async getCollections() {
      if (this.userId) {
        const res = await atrApi.getCollections(this.userId);
        this.collections = [...res[0].attractionId];
        this.getCollectionIdSetting(res[0].id);
        // console.log(res);
      }
    },
    async editCollections() {
      if (this.userId) {
        const params = {
          attractionId: this.collections,
        };
        await atrApi.editCollections(this.collectionId, params);
        // console.log('編輯結果', res);
      }
    },
    editCollectionsBtn(id) {
      if (this.collections.includes(id)) {
        this.collections = [...this.collections.filter((item) => item !== id)];
        this.editCollections();
        this.getCollections();
      } else {
        this.collections.push(id);
        this.editCollections();
        this.getCollections();
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getAttraction(this.id);
    this.getCollections();
  },

};

</script>
