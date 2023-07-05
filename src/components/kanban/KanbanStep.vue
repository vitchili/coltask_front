<template>
  <div class="content m-2">
    <div class="card card-border-primary">
      <div class="card-header">
        <h6 class="card-title">Upcoming</h6>
        <p class="card-subtitle text-muted">
          Nam pretium turpis et arcu. Duis arcu tortor.
        </p>
      </div>
      <div class="card-body p-3">
        <KanbanCard />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from "@/components/kanban/KanbanCard.vue";
export default {
  name: "KanbanStep",
  components: {
    KanbanCard,
  },
};
</script>

<style scoped>
.text-muted {
  font-size: .75rem;
}
.content {
  width: 250px;
}
</style>

