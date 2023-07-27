<template>
  <Navbar v-if="!isLoginPage" :logo="logo_src" :alt="app_name"/>
  <div id="application">
    <router-view/>
  </div>
</template>

<style>
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#application{
  position: relative;
  top: 70px;
}

body {
  background-image: url('@/../public/img/whiteAquarelleBackground.png');
}

.card {
  background-color: rgba(255, 255, 255, .55) !important;
}

.general-title-card{
  font-size: 0.85rem;
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
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    }
  }
}
</script>

