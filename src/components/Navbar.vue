<template>
  <div class="content">
    <nav class="navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <router-link to="/" id="logo">
          <img :src="logo" :alt="alt" id="logo-img" />
        </router-link>
        <NotificationBell />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1">
              
              <hr/>
              <li class="nav-item">
                <i class="fa-solid fa-chart-line"></i>
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-list-check"></i>
                <router-link to="/tasks">Tarefas</router-link>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-arrows-spin"></i>
                <router-link to="/sprints">Sprints</router-link>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-eraser"></i>
                <router-link to="/tests">Testes</router-link>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-chart-gantt"></i>
                <router-link to="/roadmap">Roadmap</router-link>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-comment-dots"></i>
                <router-link to="/chat">Chat</router-link>
              </li>
              <hr />
              <li class="nav-item">
                <router-link to="/">Meu Perfil</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/logout">Sair</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import NotificationBell from '@/components/others/NotificationBell.vue';
export default {
  name: "Navbar",
  components: {
    NotificationBell
  },
  props: ["logo", "alt"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

nav {
  position: relative;
  height: 70px;
  align-content: center;
}

#nav #logo {
  margin: auto;
  margin-left: 0;
}

.nav-item,
a {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  margin: 20px;
  transition: 0.5s;
}

.nav-item:hover,
a:hover {
  color: #ffc676;
}

#logo-img {
  width: 30px;
}

.itens-profile {
  padding: 0 0 5px 0 ;
}

.offcanvas {
  width: 250px !important;
}

.offcanvas-body {
  padding: 0px !important;
}
</style>
