<template>
  <LoadingView :active="loading" is-full-page="false" />
  <div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="collections" aria-labelledby="collectionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="collectionsLabel">吃貨收藏清單</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <template v-if="collections.length">
          <div>
            <div v-for="place in collections" :key="place.id" class="card">
              <div class="card-body">
                <h5 class="card-title">{{ place.name }}</h5>
                <p class="card-text">地址 {{ place.address }}</p>
                <p class="card-text">評價 {{ place.GoogleRate }}</p>
                <div class="d-flex justify-content-end">
                  <a href="#" class="btn btn-outline-primary me-3"
                    @click.prevent="$router.push(`/attractions/${place.id}`)" data-bs-dismiss="offcanvas">查看細節</a>
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
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['login', 'userId', 'collectionId', 'attractions', 'collections']),
    ...mapGetters('user', ['collections']),
  },
  methods: {
    ...mapActions('user', ['editCollectionsBtn']),
  },
};

</script>
