<template>
  <Navbar :logo="logo_src" :alt="app_name"/>
  <router-view/>
</template>

<style>
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #D8EAEE;
}

.content {
  position: relative;
}
</style>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components : {
    Navbar,
  },
  data() {
    return {
      logo_src: "/img/logo.png",
      app_name: "Coltask" 
    }
  }
}
</script>

