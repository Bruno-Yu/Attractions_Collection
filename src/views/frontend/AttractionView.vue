<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/attractions">小吃集</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ currentPlace.name }}</li>
      </ol>
    </nav>
    <h2>{{ currentPlace.name }}</h2>
    <h4> <span class="fw-bold">地址:</span> {{ currentPlace.address }} </h4>
    <h5> <span class="fw-bold">Google 評價:</span> {{ currentPlace.GoogleRate }}</h5>
    <button type="button" v-if="login" class="d-block p-0" @click="editCollectionsBtn(currentPlace.id)">
      <p class="m-0">加入收藏 <svg v-if="collections.includes(currentPlace.id)" xmlns="http://www.w3.org/2000/svg"
          width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
          viewBox="0 0 16 16">
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </p>
    </button>
    <p><span class="fw-bold">描述:</span> {{ currentPlace.description }}</p>
  </div>
</template>

<script>
// import atrApi from '@/api/atrAPI';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: '',
      data: {},
    };
  },
  computed: {
    ...mapState('user', ['login', 'collections', 'currentPlace']),
  },
  methods: {
    ...mapActions('user', ['editCollectionsBtn', 'getAttraction']),
  },
  created() {
    this.id = this.$route.params.id;
    this.getAttraction(this.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getAttraction(to.params.id);
    next();
  },

};

</script>
