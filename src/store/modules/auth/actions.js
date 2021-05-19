import serverAPI from '../../../axios-api';

export default {
  login() {},
  async signup(context, payload) {
    const response = await serverAPI.post('/api/user/create/', {
      email: payload.email,
      user_name: payload.username,
      password: payload.password,
    });

    if (response.status !== 201) {
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }
    context.commit('setUser', {
      userName: response.userName,
      userEmail: response.userEmail,
    });
  },
};
