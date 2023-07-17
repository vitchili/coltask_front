<template>
  <div>
    <div class="d-flex justify-content-between task-filter">
      <div class="w-50 m-2">
        <label for="">ID</label>
        <input type="text" class="form-control form-control-sm" placeholder="Todos"/>
      </div>
      <div class="w-100 m-2">
        <label for="">Setor</label>
        <select name="" id="" class="form-select form-select-sm">
          <option value="">Todos</option>
        </select>
      </div>
      <div class="w-100 m-2">
        <label for="">Projeto</label>
        <select name="" id="" class="form-select form-select-sm">
          <option value="">Todos</option>
        </select>
      </div>
      <div class="w-100 m-2">
        <label for="">Equipe</label>
        <select name="" id="" class="form-select form-select-sm">
          <option value="">Todas</option>
        </select>
      </div>
       <div class="w-50 m-2">
        <button class="btn btn-sm btn-outline-secondary mt-4" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Pesquisar</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TaskFilter",
  data() {
    return {

    };
  },
};
</script>
<style scoped>

.task-filter {
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
}
.form-control, .form-select, label{
    font-size: 9pt;
}

.overwrite-style{
  font-size: .75rem !important;
  --ms-tag-bg: rgb(255, 205, 86);
  --ms-tag-color: #fff;
}

</style>

