<template>
  <div>
    <button type="button" class="btn btn-link btn-sm">
      <small><i class="fa-solid fa-bell fa-lg" style="color: #f6f6f6;"></i></small>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        99+
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "NotificationBell",
};
</script>

<style scoped>
.btn-link {
    outline: none !important;
    text-decoration: none !important;
    color: #f6f6f6;
    font-family: Arial, Helvetica, sans-serif;
    font-size: .95rem;
    position: absolute;
    right: 100px;
    top: 25px;
}

.btn-link:hover {
    outline: none !important;
    text-decoration: none !important;
    color: white;
}

</style>

