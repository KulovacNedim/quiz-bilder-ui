import serverAPI from '../../../axios-api';

export default {
  async login(context, payload) {
    const response = await serverAPI.post('/token/', {
      email: payload.email,
      password: payload.password,
    });

    if (response.status !== 200) {
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }

    context.commit('setUser', {
      username: payload.username,
      userEmail: payload.email,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    });
    localStorage.setItem('access-token', response.data.access);
    localStorage.setItem('refresh-token', response.data.refresh);
  },
  async signup({ dispatch }, payload) {
    const response = await serverAPI.post('/user/create/', {
      email: payload.email,
      user_name: payload.username,
      password: payload.password,
    });

    if (response.status !== 201) {
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }

    await dispatch('login', {
      email: payload.email,
      password: payload.password,
      username: payload.username,
    });
  },
  logout(context) {
    context.commit('setUser', {
      userName: null,
      userEmail: null,
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  },
};
