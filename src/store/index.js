import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SettingModule from './settings/setting';
import SettingPlugin from './plugins/setting';

import auth from '@/store/auth/module';
import notifications from '@/store/notifications/module';
import profile from '@/store/profile/module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting: SettingModule,
    auth,
    notifications,
    profile
  },
  plugins: [
    createPersistedState({
      reducer: persistedState => {
        const stateFilter = JSON.parse(JSON.stringify(persistedState)); // deep clone
        ['asideToggled', 'horizontal'] // states which we don't want to persist.
          .forEach(item => delete stateFilter.setting[item]);
        return stateFilter;
      }
    }),
    SettingPlugin
  ]
});
