import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './modules/router';
import store from './modules/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
