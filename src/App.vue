<template>
    <div class="f-layout">
        <!-- <Fform></Fform> -->
        <Vuextest />
    </div>
</template>
<script>
import Fform from './components/Fform/index.vue'
import Vuextest from './components/vuex-test'


export default {
    components: {Fform, Vuextest}
}
</script>
<style>
.f-layout {
    display: flex;
    justify-content: center;
}
</style>