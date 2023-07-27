<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1">Kanban</span>
          <a data-bs-toggle="collapse" href="#collapse-kanban-filter" role="button" aria-expanded="false" aria-controls="collapse-kanban-filter">
            <i class="fa-solid fa-filter" style="color: #212529;"></i>
          </a>
        </div>
      </div>
      <div class="collapse multi-collapse" id="collapse-kanban-filter">
        <KanbanFilter />
      </div>
      <div class="card-body d-flex horizontal-queue">
        <div v-for="(kanbanFase, index) in kanbanFases" :key="index">
          <KanbanFase :kanbanFase="kanbanFase" :tasks="tasks"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanFase from '@/components/kanban/KanbanFase.vue';
import KanbanFilter from '@/components/kanban/KanbanFilter.vue';
import axios from "axios";

export default {
  name: "Kanban",
  components: {
    KanbanFase,
    KanbanFilter
  },
  data(){
    return {
      token: localStorage.getItem('authToken'),
      kanbanFases: null
    };
  },
  props: {
    tasks: {
      type: Array,
      required: false,
    },
  },
  mounted() {
    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
    };

    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/fases`, config)
      .then((response) => {
        if (response) {
          this.kanbanFases = response.data.data;
        }
      })
      .catch((error) => {
          console.log(error);
      });
  },
};
</script>

<style scoped>
.horizontal-queue {
  max-width: 100%;
  overflow-x: scroll;
}

.header-content {
  display: flex;
  justify-content: space-between;
}

</style>

