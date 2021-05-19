import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      userId: null,
      userEmail: null,
      userName: null,
    };
  },
  mutations,
  actions,
  getters,
};
