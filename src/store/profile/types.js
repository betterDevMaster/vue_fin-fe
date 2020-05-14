import namespace from '@/store/utils/namespace';

export default namespace('profile', {
  getters: ['myProfile'],
  actions: ['fetchPersonalProfile', 'updatePersonalProfile', 'changePassword'],
  mutations: ['updateProfileData']
});
