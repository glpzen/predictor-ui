import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import { VuejsDatatableFactory } from 'vuejs-datatable';


Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});
Vue.use( VuejsDatatableFactory );

new Vue({
  render: h => h(App)
}).$mount('#app')
