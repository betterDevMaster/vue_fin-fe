import Vue from 'vue';

import types from './types';

const initialState = {};

const getters = {};

const mutations = {
  [types.mutations.simple]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.simple(body, title, config),
  [types.mutations.success]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.success(body, title, config),
  [types.mutations.info]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.info(body, title, config),
  [types.mutations.warning]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.warning(body, title, config),
  [types.mutations.error]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.error(body, title, config),
  [types.mutations.confirm]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.confirm(body, title, config),
  [types.mutations.prompt]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.prompt(body, title, config),
  [types.mutations.async]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.async(body, title, config),
  [types.mutations.html]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.html(body, title, config)
};

const actions = {
  [types.actions.confirm]: ({ commit }, { body, title, config }) =>
    Vue.prototype.$snotify.confirm(body, title, config)
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};
