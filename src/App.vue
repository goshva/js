<template>
  <GlobeThree />
</template>

<script>
import GlobeThree from './components/GlobeThree.vue'

export default {
  name: 'App',
  components: { GlobeThree }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0a0a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
}
</style>