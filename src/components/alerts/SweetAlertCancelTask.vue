<template>
    
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: 'SweetAlertCancelTask',
    props: {
    taskId: {
      required: true
    }
  },
    mounted(){
        Swal.fire({
        title: "Deseja cancelar a tarefa?",
        text: "Para reverter, busque a tarefa no histórico!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Não",
        confirmButtonText: "Sim, cancelar!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Cancelada!", "A tarefa foi cancelada.", "success");
        }
      });
    }
}
</script>