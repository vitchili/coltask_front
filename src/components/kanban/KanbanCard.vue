<template>
  <div class="content">
    <router-link :to="`/task/${task.id}`">
      <div class="card mb-3 bg-light">
        <div class="card-body p-3">
          <div class="float-right mr-n2">
            <label class="custom-control custom-checkbox">
              <span class="custom-control-label fs-13">#{{task.id}} - </span>
              <span class="custom-control-label fs-13">{{task.title}}</span>
            </label>
          </div>
          <div class="row">
            <div class="col">
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="user" class="avatar-img rounded-circle" style="width: 15px"/>
                &nbsp;
                <span class="text-body fs-12">-</span>
                &nbsp;
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" class="avatar-img rounded-circle" style="width: 15px"/>
            </div>
            <div class="col">
              <span class="badge rounded-pill text-bg-secondary fs-9">Prazo: {{new Date(task.dead_line).getDate() + '/' + new Date(task.dead_line).getMonth() + '/' + new Date(task.dead_line).getFullYear()}}</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "KanbanCard",
  props: {
    task: {
      type: Object,
      required: true,
    }
  }
};

</script>

<style scoped>
a {
  text-decoration: none;
}
.card-body {
  padding: 10px !important;
}
.fw-500 {
    font-weight: 550 !important;
    font-size: .9rem;
}

.text-body {
  font-size: .85rem;
}
.content {
  position: relative;
  max-width: 100%;
}
.card {
  position: relative;
  background-color: aqua;
}

.fs-13 {
  font-size: 13px !important;
}

.fs-12 {
  font-size: 12px !important;
}

.fs-9 {
  font-size: 9px !important;
}

</style>

