import namespace from '@/store/utils/namespace';

export default namespace('auth', {
  getters: ['token', 'isAuthenticated'],
  actions: ['login', 'logout', 'checkAuth'],
  mutations: ['setAuth', 'purgeAuth']
});
