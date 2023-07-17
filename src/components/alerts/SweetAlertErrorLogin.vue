<template>
    
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: 'SweetAlertErrorLogin',
    props: {
      message: String
    },
    mounted(){
      Swal.fire({
        icon: 'error',
        title: '',
        text: this.message
      })
    }
}
</script>