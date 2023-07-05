<template>
  <div class="content">
    <div class="container" style="position: relative; margin: 0;">
      <div class="row">
        <div class="col">
          <TasksForDistribution />
        </div>
        <div class="col">
          <TasksGraphics />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Kanban />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TasksGraphics from '@/components/distribution/TasksGraphics.vue';
import TasksForDistribution from "@/components/distribution/TasksForDistribution.vue";
import Kanban from "@/components/distribution/Kanban.vue";

export default {
  name: "Tasks",
  components: {
    TasksForDistribution,
    TasksGraphics,
    Kanban,
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
  align-content: space-between;
}

.row {
  margin: 20px 0;
}

</style>