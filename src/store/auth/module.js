import ApiService from '@/services/api.service';
import JwtService from '@/services/jwt.service';

import { handleServerErrorResponse } from '@/store/utils/common';
import types from './types';

const initialState = {
  token: JwtService.getToken(),
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  [types.getters.token]: state => state.token,
  [types.getters.isAuthenticated]: state => state.isAuthenticated
};

const actions = {
  [types.actions.login]: ({ commit }, { username, password }) =>
    new Promise((resolve, reject) =>
      ApiService.post('access_token', {
        grant_type: process.env.VUE_APP_ACCESS_TOKEN_GRANT_TYPE,
        client_id: +process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        username,
        password
      })
        .then(({ data }) => {
          commit(types.mutations.setAuth, (data && data.access_token) || {});
          resolve(data);
        })
        .catch(({ response }) => {
          handleServerErrorResponse(commit, response);
          reject(response);
        })
    ),
  [types.actions.logout]: ({ commit }) => commit(types.mutations.purgeAuth),
  [types.actions.checkAuth]: ({ commit }) => {
    const token = JwtService.getToken();
    if (token) {
      commit(types.mutations.setAuth, token);
    } else {
      commit(types.mutations.purgeAuth);
    }
  }
};

const mutations = {
  [types.mutations.setAuth]: (state, token) => {
    state.isAuthenticated = true;
    state.token = token;
    state.errors = null;
    JwtService.saveToken(state.token);
  },
  [types.mutations.purgeAuth]: state => {
    state.isAuthenticated = false;
    state.token = null;
    state.errors = null;
    JwtService.destroyToken();
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};
