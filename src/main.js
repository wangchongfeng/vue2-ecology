import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/less/app.less'
new Vue({
    store,
    render: h=> h(App)
}).$mount('#app')