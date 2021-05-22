export default {
  userId(state) {
    return state.id;
  },
  isAuthenticated(state) {
    return !!state.accessToken;
  },
};
