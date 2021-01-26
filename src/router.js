import Router from "./utils/vueRouter";
import Fform from "./components/Fform/index.vue";
import Test from "./components/vuex-test/index.vue";
import Vue from 'vue'
Vue.use(Router);
const routes = [{ 
    path: "/form",
    component: Fform
  },
  { 
    path: "/test",
    component: Test
  },
]
export default new Router({routes})
