<template>
  <nav>
    <nav class="navbar navbar-expand-lg bg-light">
      <a class="navbar-brand" href="#">台南吃透透 後台介面</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
          </li>
          <li v-if="login" class="nav-item">
            <RouterLink to="/" class="nav-link">登出</RouterLink>
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
</template>

<script >

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('user', [
      'login',
    ]),
  },

};

</script>
