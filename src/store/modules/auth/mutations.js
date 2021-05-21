export default {
  setUser(state, payload) {
    state.userName = payload.userName;
    state.userEmail = payload.userEmail;
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },
};
