<template>
  <div class="content">
    <div class="card">
      <h6 class="card-header">Gráfico de Tarefas</h6>
      <div class="card-body" style="padding: 0;">
        <div>
          <div class="d-flex justify-content-between filter">
            <div class="w-100 m-2">
              <select class="form-select" aria-label="Default select example">
                <option selected>Tarefas por mês</option>
              </select>
            </div>
          </div>
        </div>
        <div id="graphic-area">
          <DynamicGraphic :tasks="tasks"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import DynamicGraphic from './DynamicGraphic.vue';
export default {
  name: "TaskGraphics",
  components : {
    DynamicGraphic,
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
#graphic-area {
  padding: 0px 80px;
}

.filter {
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}
.form-control {
  font-size: 9pt;
}

.form-select {
  font-size: 9pt;
}

.card-body {
  position: relative;
  height: 300px;
  overflow-y: scroll;
}
</style>
