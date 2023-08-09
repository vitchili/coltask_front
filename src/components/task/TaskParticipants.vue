<template>
  <div class="content" style="max-height: 350px; overflow-y: scroll;">
    <div class="card" style="max-height: 350px; overflow-y: scroll;">
      <div class="card-header" style="background-color: #57D0DF; color: #fff;">
        <div class="header-content">
          <span class="general-title-card mt-1">Informações</span>
           <div class="justify-content-end">
            <router-link :to="`/task/edit/${this.$route.params.id}`">
                <i
                  class="fa-solid fa-pen-to-square"
                  style="color: #fff"
                ></i>
              </router-link> 
           </div>
        </div>
      </div>
      <div class="card-body" style="max-height: 350px;">
          <div class="row">
            <div class="form-group">
              <label for="fullName">Solicitante: </label>
              <span class="span-info" v-if="task">{{task.outside_requester}}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Cliente: </label>
              <span class="span-info" v-if="task">{{task.client.name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Responsável: </label>
              <span class="span-info" v-if="task">{{task.sponsor.name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Tipo da tarefa: </label>
              <span class="span-info" v-if="task">{{task.type.name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Q.A.: </label>
              <span class="span-info" v-if="task">{{task.qa.name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Data-limite: </label>
              <span class="span-info" v-if="task">{{task.dead_line}}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label for="fullName">Cópias do e-mail: </label>
              <span class="span-info" v-if="task">{{task.email_copy}}</span>
            </div>
          </div>
        </div>
        
      
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskParticipants",
  components: {},
  data() {
    return {
      
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

