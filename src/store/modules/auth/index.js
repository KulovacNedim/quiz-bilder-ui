import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      id: null,
      userEmail: null,
      userName: null,
      firstName: null,
      lastName: null,
      accessToken: null,
      refreshToken: null,
    };
  },
  mutations,
  actions,
  getters,
};
