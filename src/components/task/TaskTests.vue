<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1">Testes</span>
          <div>
            <router-link :to="'/task/new'">
              <i class="fa-solid fa-bars" style="color: #212529"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body" style="padding: 5px;">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" style="font-size: .8rem; color: #212529;">Casos de Teste</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="font-size: .8rem; color: #212529;">Histórico</a>
          </li>
        </ul>
        <div class="inside-tab p-2" style="">
          <div>
            <span class="gray-span">Caso #1</span>
             <div class="row">
               <div class="form-group">
                <p>Nenhum caso de teste cadastrado</p>
              </div>
            </div>
          </div>
          <hr>
          <div>
            <span class="gray-span">Ocorrido</span>
             <div class="row">
               <div class="form-group">
                <p>Nenhum caso de teste cadastrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TaskTests",
  components: {
  },
  props: {
    tasks: {
      type: Object,
      required: false,
    },
  }
};
</script>

<style scoped>
p {
  font-size: .8rem;
  margin: 5px;
}

.gray-span {
  margin: 0 10px;
  color: #aaaaaa;
  font-size: .75rem;
}

.inside-tab {
  position: relative; 
  background-color: #fff; 
  height: 100%;
}

a {
  margin: 0px 5px;
}

.card-body {
  position: relative;
  height: 300px;
  overflow-y: scroll;
}

.dropdown-item {
  font-size: 0.7rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
}




</style>

