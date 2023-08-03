<template>
  <div class="content">
    <div class="container" style="position: relative; margin: 0;">
      <div class="row" >
        <div class="col-9">
          <TaskData :task="task"/>
        </div>
        <div class="col-3">
          <TaskParticipants :task="task"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <TaskChanges :task="task"/>
        </div>
        <div class="col">
          <TaskTests :task="task"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <TaskAdditional :task="task"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskData from '@/components/task/TaskData.vue';
import TaskParticipants from '@/components/task/TaskParticipants.vue';
import TaskChanges from "@/components/task/TaskChanges.vue";
import TaskTests from "@/components/task/TaskTests.vue";
import TaskAdditional from "@/components/task/TaskAdditional.vue";
import axios from "axios";
import { getAuthToken } from '../../../middlewares/authMiddleware'; 

export default {
  name: "TaskDetails",
  data(){
    return {
      task: null
    };
  },
  components: {
    TaskData,
    TaskParticipants,
    TaskChanges,
    TaskTests,
    TaskAdditional
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/task/${this.$route.params.id}`, getAuthToken())
      .then((response) => {
        if (response) {
          this.task = response.data.data;
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