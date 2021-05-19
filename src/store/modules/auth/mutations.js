export default {
  setUser(state, payload) {
    state.userName = payload.userName;
    state.userEmail = payload.userEmail;
  },
};
