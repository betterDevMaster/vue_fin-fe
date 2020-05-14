import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import router from '@/router';
import store from '@/store';
import authTypes from '@/store/auth/types';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/v1`;

    // Request interceptor logic.
    Vue.axios.interceptors.request.use(
      config => {
        const token = store.state.auth.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor logic.
    Vue.axios.interceptors.response.use(
      response => response,
      error => {
        if (!error || !error.response) {
          return Promise.reject(error);
        }

        if (error.response.status === 403) {
          store.dispatch(authTypes.namespacedActions.logout).then(() =>
            router.push({
              name: 'Login',
              query: {
                redirectUrl: encodeURIComponent(store.state.route.fullPath)
              }
            })
          );
          return Promise.reject(error);
        }

        if (error.response.status === 500) {
          router.push({ name: '500' });
        }

        return Promise.reject(error);
      }
    );
  },

  query(resource, params) {
    return Vue.axios.get(resource, params);
  },

  get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource);
  },

  uploadFile(resource, params) {
    const headers = {};
    headers['Content-Type'] = 'multipart/form-data';
    return Vue.axios.post(`${resource}`, params, { headers });
  }
};

export default ApiService;
