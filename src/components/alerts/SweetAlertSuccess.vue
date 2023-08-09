<template>
    
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: 'SweetAlertSuccess',
    mounted(){
      Swal.fire({
        icon: 'success',
        title: 'Operação realizada com sucesso.',
        showConfirmButton: false,
        timer: 1000
      })
    }
}
</script>