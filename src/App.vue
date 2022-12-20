<template>
  <div class="container-fluid">
    <LoadingView :active="loading" backgroundColor="#000" color="#fff" />
    <RouterView />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['loading']),
  },
};

</script>
