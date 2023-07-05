<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <span>Kanban</span>
          <a data-bs-toggle="collapse" href="#collapse-kanban-filter" role="button" aria-expanded="false" aria-controls="collapse-kanban-filter">
            <i class="fa-solid fa-filter" style="color: #212529;"></i>
          </a>
        </div>
      </div>
      <div class="collapse multi-collapse" id="collapse-kanban-filter">
        <KanbanFilter />
      </div>
      <div class="card-body d-flex horizontal-queue">
        <KanbanStep />
        <KanbanStep />
        <KanbanStep />
        <KanbanStep />
        <KanbanStep />
        <KanbanStep />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanStep from '@/components/kanban/KanbanStep.vue';
import KanbanFilter from '@/components/kanban/KanbanFilter.vue';

export default {
  name: "Kanban",
  components: {
    KanbanStep,
    KanbanFilter
  }
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

