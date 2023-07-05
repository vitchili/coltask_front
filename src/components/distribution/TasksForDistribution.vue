<template>
  <div class="content">
    <div class="card">
       <div class="card-header">
        <div class="header-content">
          <span>Tarefas a distribuir</span>
          <a data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
            <i class="fa-solid fa-circle-plus" style="color: #212529;"></i>
          </a>
        </div>
      </div>
      <div class="card-body" style="padding: 0">
        <div class="d-flex justify-content-between">
          <div class="input-group m-2">
            <button
              class="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtro
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Id</a></li>
              <li><a class="dropdown-item" href="#">Título</a></li>
              <li><a class="dropdown-item" href="#">Criado por:</a></li>
              <li><a class="dropdown-item" href="#">Data (dd-mm-YYYY):</a></li>
            </ul>
            <input
              type="text"
              class="form-control form-control-sm"
              aria-label="Text input with dropdown button"
            />
            <button
              class="btn btn-sm btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Pesquisar
            </button>
          </div>
        </div>
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "@/components/distribution/TaskCard.vue";

export default {
  name: "TasksForDistribution",
  components: {
    TaskCard,
  },
};
</script>

<style scoped>
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

