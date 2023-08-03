<template>
  <div class="content">
    <div class="container" style="position: relative; margin: 0;">
      <div class="row">
        <div class="col">
          <TasksForDistribution :tasks="tasks"/>
        </div>
        <div class="col">
          <TasksGraphics :tasks="tasks"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Kanban :tasks="tasks"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TasksGraphics from '@/components/distribution/TasksGraphics.vue';
import TasksForDistribution from "@/components/distribution/TasksForDistribution.vue";
import Kanban from "@/components/distribution/Kanban.vue";
import axios from "axios";
import { getAuthToken } from '../../../middlewares/authMiddleware'; 

export default {
  name: "Tasks",
  data(){
    return {
      tasks: null
    };
  },
  components: {
    TasksForDistribution,
    TasksGraphics,
    Kanban,
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/tasks`, getAuthToken())
      .then((response) => {
        if (response) {
          this.tasks = response.data.data;
        }
      })
      .catch((error) => {
          console.log(error);
      });
  }
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