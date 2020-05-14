import Vue from 'vue';
import { handleServerErrorResponse } from '@/store/utils/common';
import ApiService from '@/services/api.service';
import types from './types';
import notificationTypes from '@/store/notifications/types';

const initialState = {
  myProfile: {
    username: null,
    email: null,
    fname: null,
    lname: null,
    phone: null,
    country: null,
    skype: null,
    facebook: null,
    twitter: null,
    verified: false,
    has2fa: false,
    regDate: null
  }
};

const getters = {
  [types.getters.myProfile]: state => state.myProfile
};

const actions = {
  [types.actions.fetchPersonalProfile]: ({ commit }) =>
    new Promise((resolve, reject) => {
      ApiService.query('member/profile/personal')
        .then(({ data }) => {
          commit(types.mutations.updateProfileData, data);
          resolve(data);
        })
        .catch(({ response }) => {
          handleServerErrorResponse(commit, response);
          reject(response);
        });
    }),
  [types.actions.updatePersonalProfile]: ({ commit }, profileData) =>
    new Promise((resolve, reject) => {
      ApiService.put('user', profileData)
        .then(({ data }) => {
          commit(types.mutations.updateProfileData, profileData);
          commit(
            notificationTypes.namespacedMutations.success,
            {
              body: 'Profile successfuly updated.',
              title: 'Success'
            },
            { root: true }
          );
          resolve(profileData);
        })
        .catch(({ response }) => {
          handleServerErrorResponse(commit, response);
          reject(response);
        });
    }),
  [types.actions.changePassword]: ({ commit }, passwordData) =>
    new Promise((resolve, reject) => {
      const update = {
        password: passwordData.password,
        new_password: passwordData.newPassword,
        new_password_verify: passwordData.confirmNew
      };

      ApiService.put('user', update)
        .then(({ data }) => {
          commit(
            notificationTypes.namespacedMutations.success,
            {
              body: 'Password successfuly updated.',
              title: 'Success'
            },
            { root: true }
          );
          resolve();
        })
        .catch(({ response }) => {
          handleServerErrorResponse(commit, response);
          reject(response);
        });
    })
};

const mutations = {
  [types.mutations.updateProfileData]: (state, profileData) => {
    const update = { ...profileData };

    if (profileData.verified) {
      update.verified == !!profileData.verified;
    }

    if (profileData.has_tfa) {
      update.has2fa = !!profileData.has_tfa;
      delete update.has_tfa;
    }

    if (profileData.reg_date) {
      profileData.regDate = profileData.reg_date;
      delete update.reg_date;
    }

    Vue.set(state, 'myProfile', update);
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};
