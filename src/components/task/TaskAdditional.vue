<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1">Diversos</span>
          <div>
            <router-link :to="'/task/new'">
              <i class="fa-solid fa-circle-plus" style="color: #212529"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body" style="padding: 5px;">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="tab-title nav-link active" aria-current="page" href="#">Comentários</a>
          </li>
          <li class="nav-item">
            <a class="tab-title nav-link" href="#">Histórico</a>
          </li>
          <li class="nav-item">
            <a class="tab-title nav-link" href="#">Apontamento de horas</a>
          </li>
        </ul>
        <div class="p-2">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TaskAdditional",
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
.content {
  margin-bottom: 20px;
}
.tab-title {
  font-size: .8rem;
  color: #212529;
}
p {
  font-size: .8rem;
  margin: 5px;
}

.gray-span {
  margin: 0 10px;
  color: #aaaaaa;
  font-size: .75rem;
}

a {
  margin: 0px 5px;
}

.card-body {
  position: relative;
  max-height: 300px;
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

