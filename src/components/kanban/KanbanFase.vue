<template>
  <div class="content m-2">
    <div class="card card-border-primary">
      <div class="card-header" :style="{'background-color': this.kanbanFase.hex_color}">
        <h6 class="card-title">{{this.kanbanFase.name}}</h6>
        <p class="card-subtitle text-muted">
          {{this.kanbanFase.description}}
        </p>
      </div>
      <div class="card-body p-3" style="max-height: 450px; overflow-y: scroll;">
        <div v-for="item in tasks" :key="item.id">
          <KanbanCard v-show="item.fase.id == this.kanbanFase.id" :task="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from "@/components/kanban/KanbanCard.vue";
export default {
  name: "KanbanFase",
  components: {
    KanbanCard,
  },
  props: {
    kanbanFase: {
      type: Object,
      required: true,
    },
    tasks: {
      type: Array,
      required: false,
    },
  }
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

