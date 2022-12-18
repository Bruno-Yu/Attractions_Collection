<template>
  <nav>
    <nav class="navbar navbar-expand-lg bg-light">
      <a class="navbar-brand" href="#">台南吃透透</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        @click="$router.push('/')">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/attractions" class="nav-link active" aria-current="page">小吃集</RouterLink>
          </li>
          <li v-if="admin" class="nav-item">
            <RouterLink to="/admin" class="nav-link">前往後台</RouterLink>
          </li>
          <li v-if="login" class="nav-item">
            <RouterLink to="/member/content" class="nav-link">Hello! {{ name }}</RouterLink>
          </li>
          <li v-if="login" class="nav-item">
            <RouterLink to="/member/collections" class="nav-link">收藏</RouterLink>
          </li>
          <li v-else class="nav-item">
            <RouterLink to="login" class="nav-link">登入</RouterLink>
          </li>
          <li v-if="login" class="nav-item">
            <RouterLink to="" class="nav-link" @click.prevent="logout">登出</RouterLink>
          </li>
          <li v-else class="nav-item">
            <RouterLink to="/signup" class="nav-link">註冊</RouterLink>
          </li>
        </ul>
      </div>
    </nav>

  </nav>
  <main class="container-xl mx-auto">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <RouterView />
  </main>
  <footer>
    <p class="mx-auto py-5 border border-top text-center">
      台南吃透透 @copyRight
    </p>
  </footer>
  <!-- modal -->
</template>

<script >
// import { RouterView, RouterLink } from 'vue-router';
import { mapState } from 'vuex';

export default {
  // components: { RouterView, RouterLink },
  computed: {
    ...mapState('user', ['login', 'admin', 'name']),
  },
  methods: {
    logout() {
      window.location.reload();
    },
  },
};

</script>
