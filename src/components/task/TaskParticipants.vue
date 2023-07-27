<template>
  <div class="content" style="height: 350px;">
    <div class="card" style="height: 350px;">
      <div class="card-header" style="background-color: #57D0DF; color: #fff;">
        <div class="header-content">
          <span class="general-title-card">Informações</span>
        </div>
      </div>
      <div class="card-body" style="max-height: 350px; overflow-y: scroll;">
          <div class="row">
            <div class="form-group">
              <label for="fullName">Solicitante: </label>
              <span class="span-info">Cleiton Soares</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Cliente: </label>
              <span class="span-info">Unifique Sistemas LTDA</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Responsável: </label>
              <span class="span-info">Romário Senna</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Tipo da tarefa: </label>
              <span class="span-info">Correção de Bug</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Q.A.: </label>
              <span class="span-info">Larissa Manoela</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Data-limite: </label>
              <span class="span-info">13/09/2023 18:00</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Cópias do e-mail: </label>
              <span class="span-info">soares.eu@gmail.com</span>
            </div>
          </div>
        </div>
        
      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskParticipants",
  components: {},
  data() {
    return {
      token: localStorage.getItem("authToken"),
    };
  },
  props: {
    task: {
      type: Object,
      required: false,
    },
  },
  mounted() {},
};
</script>

<style scoped>
label {
  margin: 0 10px;
  color: #aaaaaa;
  font-size: .75rem;
}

.span-info {
  font-size: .75rem;
}

.form-group{
  margin-bottom: 15px;
  padding-left: 0;
  border-bottom: .5px solid #efefef;
}

.content {
  height: 400px;
}

.header-content {
  display: flex;
  justify-content: space-between;
}
</style>

