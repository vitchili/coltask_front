<template>
  <div class="content">
      <div class="card b-1 hover-shadow mb-20">
        <div class="media card-body">
          <router-link :to="`/task/${this.task.id}`">
            <div>
              <span class="fs-14">{{ this.task.id }} - </span>
              <span class="fs-14">{{ this.task.title }}</span>
            </div>
          </router-link>
        </div>

        <footer class="card-footer flexbox align-items-center">
          <div>
            <span>{{ formattedCreatedAt }}</span>
            <span class="badge rounded-pill text-bg-danger ms-2">{{
              this.task.direction.name
            }}</span>
          </div>
          <div class="card-hover-show">
            <i
              class="fa-solid fa-paper-plane fa-lg card-options"
              style="color: #13c9ef"
            ></i>
            <router-link :to="`/task/edit/${this.task.id}`">
              <i
                class="fa-solid fa-pen-to-square fa-lg card-options"
                style="color: #ffbb00"
              ></i>
            </router-link>
            <i
              class="fa-solid fa-ban fa-lg card-options"
              style="cursor: pointer; color: #ff0000"
              @click="cancelTask"
            ></i>
            <SweetAlertCancelTask
              :key="cancelTaskAlertKey"
              v-if="showCancelTaskAlert"
              :taskId="this.task.id"
            />
          </div>
        </footer>
      </div>
  </div>
</template>

<script>
import SweetAlertCancelTask from "../alerts/SweetAlertCancelTask.vue";

export default {
  name: "TaskCard",
  data() {
    return {
      showCancelTaskAlert: false,
      cancelTaskAlertKey: 0,
      formattedCreatedAt: 0,
    };
  },
  components: {
    SweetAlertCancelTask,
  },
  methods: {
    cancelTask() {
      this.showCancelTaskAlert = true;
      this.cancelTaskAlertKey++;
    },
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.task.title.length > 80) {
      this.task.title = this.task.title.substring(0, 80) + "...";
    }

    var date = new Date(this.task.created_at);
    this.formattedCreatedAt =
      date.getDate() +
      "/" +
      date.getMonth() +
      "/" +
      date.getFullYear() +
      " - " +
      date.getHours() +
      "h";
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.mb-20 {
  margin-bottom: 10px !important;
}

.b-1 {
  border: 1px solid #ebebeb !important;
}

.card {
  border: 0;
  border-radius: 0;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.media {
  padding: 5px 12px;
  -webkit-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;
}

.media {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
}

.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0.75rem;
}

.card-options {
  padding: 0 5px;
}

.media {
  flex-shrink: 0;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.fw-300 {
  font-weight: 300 !important;
}

small,
time,
.small {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #8b95a5;
}

.fs-14 {
  font-size: 14px !important;
}

.card-footer {
  background-color: #fcfdfe;
  border-top: 1px solid rgba(77, 82, 89, 0.07);
  color: #8b95a5;
}

.flexbox {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}

.card-footer {
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.card-footer {
  background-color: #fcfdfe;
  border-top: 1px solid rgba(77, 82, 89, 0.07);
  color: #8b95a5;
  font-size: 9pt;
}

.hover-shadow {
  -webkit-box-shadow: 0 0 35px rgba(0, 0, 0, 0.11);
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.11);
}
</style>

