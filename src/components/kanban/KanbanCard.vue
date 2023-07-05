<template>
  <div class="content">
    <div class="card mb-3 bg-light">
      <div class="card-body p-3">
        <div class="float-right mr-n2">
          <label class="custom-control custom-checkbox">
            <span class="custom-control-label fw-600">Teste aqui</span>
          </label>
        </div>
        <p class="text-body">
          Curabitur ligula sapien, tincidunt non, euismod vitae, posuere
          imperdiet, leo. Maecenas malesuada.
        </p>
        <a class="btn btn-outline-primary btn-sm" href="#">View</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanbanCard",
};
</script>

<style scoped>
.fw-600 {
    font-weight: 600 !important;
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

</style>

