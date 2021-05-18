import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import './assets/styles/tailwind.css';

import BaseCard from './components/ui/BaseCard';
import BaseButton from './components/ui/BaseButton';

const app = createApp(App);
app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

app.mount('#app');
