<template>
  <div>
    <p>now count is {{$store.state.count}}</p>
    <p>now double count is {{ $store.getters.doubleCount}}</p>
    <button @click="add">add</button>
  </div>
</template>
<script>
  export default {
    methods: {
      add() {
        this.$store.dispatch('add', 3)      
      }
    }
  }
</script>