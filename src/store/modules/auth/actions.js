import serverAPI from '../../../axios-api';

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = '/token/';
    let fields = {
      email: payload.email,
      password: payload.password,
    };

    if (mode === 'signup') {
      url = '/user/create/';
      fields = {
        email: payload.email,
        user_name: payload.username,
        password: payload.password,
      };
    }
    const response = await serverAPI.post(url, fields);
    if (mode === 'signup') {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    }

    localStorage.setItem('access-token', response.data.access);
    localStorage.setItem('refresh-token', response.data.refresh);

    const { data } = await serverAPI.get('/user/');

    const user = {
      id: data.id,
      username: data.user_name,
      firstName: data.first_name,
      lastName: data.last_name,
      userEmail: data.email,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    };

    localStorage.setItem('user', JSON.stringify(user));

    context.commit('setUser', {
      id: data.id,
      username: data.user_name,
      firstName: data.first_name,
      lastName: data.last_name,
      userEmail: data.email,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    });
  },
  async tryLogin(context) {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');
    if (!accessToken) {
      return;
    }

    try {
      const { data } = await serverAPI.get('/user/');
      context.commit('setUser', {
        id: data.id,
        username: data.user_name,
        firstName: data.first_name,
        lastName: data.last_name,
        userEmail: data.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      return context.dispatch('logout');
    }
  },
  logout(context) {
    context.commit('setUser', {
      id: null,
      userName: null,
      firstName: null,
      lastName: null,
      userEmail: null,
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  },
};
