<template>
  <div class="home">
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form action="" @submit="sendData($event)">
              <div class="divider d-flex align-items-center my-4">
                <p class="text-center mx-3 mb-0">Insira seus dados</p>
              </div>

              <!-- Email input -->
              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  class="form-control"
                  placeholder="Insira seu e-mail"
                  v-model="email"
                />
                <label class="form-label" for="form3Example3"
                  >Email válido</label
                >
              </div>

              <!-- Password input -->
              <div class="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  class="form-control"
                  placeholder="Insira sua senha"
                  v-model="password"
                />
                <label class="form-label" for="form3Example4">Senha</label>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <a href="#!" class="text-body">Esqueceu sua senha?</a>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  class="btn btn-secondary"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                  Login
                </button>
              </div>
              <SweetAlertErrorLogin :key="countAlert" v-if="showError" :message="message" />
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import SweetAlertErrorLogin from '@/components/alerts/SweetAlertErrorLogin.vue'
import router from '../router'

export default {
  name: 'Login',
  data(){
    return {
      email: '',
      password: '',
      message: '',
      showError: false,
      countAlert: 0
    }
  },
  components: {
    SweetAlertErrorLogin
  },
  methods: {
    sendData(e){
      e.preventDefault();
      let data = {
        email: this.email,
        password: this.password

      };

      axios.post(`${process.env.VUE_APP_API_DOMAIN}/login`, data)
      .then(response => {
        if (response.data) {
          this.$cookies.set('token', response.data.token);
          this.$cookies.set('directions', response.data.directions);
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.name);
          localStorage.setItem('expires_at', response.data.expires_at);
          router.push({ name: 'Tasks'});
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message;
          this.showError = true;
          this.countAlert++;
        } else {
          this.message = 'Erro desconhecido';
          this.showError = true;
          this.countAlert++;
        }
      });
    }
  }, 
}
</script>


<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

.justify-content-between {
  justify-content: flex-end !important;
}
</style>