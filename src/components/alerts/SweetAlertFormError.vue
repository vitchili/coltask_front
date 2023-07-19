<template>
    
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: 'SweetAlertFormError',
    props: {
      message: String
    },
    mounted(){
      Swal.fire({
        position: 'top',
        color: '#AB7175',
        icon: false,
        showConfirmButton: false,
        title: '',
        background: '#F8D7D9',
        backdrop: 'rgba(255,255,255, .0)',
        html: "<div style='text-align: left; width: 90%; margin: auto; font-size: .9rem;'>" + this.message + "</div>"
      })
    }
}

</script>