import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import store from './stores';
import App from './App.vue';
import router from './router';

import './assets/scss/all.scss';

import 'bootstrap/dist/js/bootstrap';

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.component('LoadingView', Loading);
app.use(store);
app.mount('#app');
