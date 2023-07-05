import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Multiselect from '@vueform/multiselect'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App);
app.component('Multiselect', Multiselect)
app.use(router);
app.mount("#app");
//createApp(App).use(router).mount('#app')