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

    const user = {
      username: payload.username,
      userEmail: payload.email,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    };

    localStorage.setItem('user', JSON.stringify(user));

    context.commit('setUser', {
      username: payload.username,
      userEmail: payload.email,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    });
  },
  tryLogin(context) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      console.log(user);
      context.commit('setUser', {
        username: user.username,
        userEmail: user.email,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      userName: null,
      userEmail: null,
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem('user');
  },
};
