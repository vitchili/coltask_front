<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1">Tarefas na fila</span>
          <div>
            <a
              data-bs-toggle="collapse"
              href="#collapse-task-filter"
              role="button"
              aria-expanded="false"
              aria-controls="collapse-task-filter"
            >
              <i class="fa-solid fa-filter" style="color: #212529"></i>
            </a>
            <router-link :to="'/task/new'">
              <i class="fa-solid fa-circle-plus" style="color: #212529"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="collapse multi-collapse" id="collapse-task-filter">
        <TaskFilter />
      </div>
      <div class="card-body" style="padding: 5px">
        <div v-for="(task, index) in tasks" :key="index">
          <TaskCard :task="task"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "@/components/task/TaskCard.vue";
import TaskFilter from "@/components/task/TaskFilter.vue";

export default {
  name: "TasksForDistribution",
  components: {
    TaskCard,
    TaskFilter,
  },
  props: {
    tasks: {
      type: Array,
      required: false,
    },
  }
};
</script>

<style scoped>
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

