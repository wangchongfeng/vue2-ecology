<template>
    <div class="f-layout">
        <!-- <Fform></Fform> -->
        <ul>
            <router-link  to="#/form">form</router-link>
            <router-link  to="#/test">Test</router-link>
        </ul>
        
        <router-view></router-view>
    </div>
</template>
<script>
import Fform from './components/Fform/index.vue'
import Vuextest from './components/vuex-test'
import './assets/less/app.less'

export default {
    components: {Fform, Vuextest}
}
</script>
<style>

</style>