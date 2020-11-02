<template>
    <div class="f-layout">
        <!-- <Fform></Fform> -->
        <Vuextest />
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