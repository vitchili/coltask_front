import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Multiselect from '@vueform/multiselect'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VueCookies from 'vue-cookies';

//Middlewares
import authMiddleware from '../middlewares/authMiddleware';
router.beforeEach(authMiddleware);

const app = createApp(App);
app.use(VueCookies);
app.component('Multiselect', Multiselect)
app.use(router);
app.mount("#app");