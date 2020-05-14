import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VeeValidate from 'vee-validate';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import BootstrapVue from 'bootstrap-vue';
import VueI18Next from '@panter/vue-i18next';

import './vendor.js';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import i18next from '@/i18n.js';
import ApiService from '@/services/api.service';

Vue.config.productionTip = false;

sync(store, router);
Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.centerTop
  }
});

Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields' // fix issue with b-table
});
Vue.use(VueI18Next);

const i18n = new VueI18Next(i18next);

ApiService.init();

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');
