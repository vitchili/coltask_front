<template>
  <div class="container-fluid">
    <form @submit.prevent="save">
      <div class="container">
        <!-- Title -->
        <div
          class="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row"
        >
          <h2 class="h5 mb-3 mb-lg-0">
            <a href="../../pages/admin/customers.html" class="text-muted"
              ><i class="bi bi-arrow-left-square me-2"></i
            ></a>
            Editar tarefa
          </h2>
          <div class="hstack gap-3">
            <router-link :to="'/tasks'">
              <button class="btn btn-secondary btn-sm btn-icon-text">
                <i class="bi bi-x"></i> <span class="text">Cancelar</span>
              </button>
            </router-link>
            <button class="btn btn-primary btn-sm btn-icon-text" type="submit">
              <i class="bi bi-save"></i> <span class="text">Salvar</span>
            </button>
          </div>
        </div>

        <!-- Main content -->
        <div class="row">
          <!-- Left side -->
          <div class="col-lg-8">
            <!-- Envolved -->
            <div class="card mb-4">
              <div class="card">
                <div class="card-header">
                  <div class="header-content">
                    <span>Envolvidos</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Solicitante</label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          v-model="outside_requester"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Cliente</label>
                        <select
                          class="form-select form-select-sm"
                          v-model="client_id"
                        >
                          <option selected disabled>{{client_name}}</option>
                          <option
                            v-for="(client, index) in clients"
                            :key="index"
                            :value="client.id"
                          >
                            {{ client.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">E-mails Cópia</label>
                        <input
                          type="email"
                          class="form-control form-control-sm"
                          placeholder="Separe os e-mails por ;"
                          v-model="email_copy"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Tipo de tarefa</label>
                        <select
                          class="form-select form-select-sm"
                          v-model="type"
                        >
                          <option selected disabled>{{this.type_name}}</option>
                          <option value="H">Ajuda</option>
                          <option value="E">Correção de Erro</option>
                          <option value="F">Nova Feature</option>
                          <option value="S">Serviço</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Task -->
            <div class="card mb-4">
              <div class="card">
                <div class="card-header">
                  <div class="header-content">
                    <span>Dados da Tarefa</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <label class="form-label">Título</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        v-model="title"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <label class="form-label">Descrição</label>
                      <div>
                        <EditCkeditor @get-data-editor="getContentEditor" :task="this.task"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Right side -->
          <div class="col-lg-4">
            <!-- Sponser -->
            <div class="card mb-4">
              <div class="card">
                <div class="card-header">
                  <div class="header-content">
                    <span>Time de solução</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <label class="form-label">Setor</label>
                      <select
                        class="form-select form-select-sm"
                        v-model="direction_id"
                        @change="getUsersFromSpecificDirection($event)"
                      >
                        <option selected disabled>{{this.direction_name}}</option>
                        <option
                          v-for="(direction, index) in directions"
                          :key="index"
                          :value="direction.id"
                        >
                          {{ direction.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <label class="form-label">Responsável</label>
                      <select
                          class="form-select form-select-sm"
                          v-model="sponsor_id"
                        >
                          <option value="">Nenhum</option>
                          <option :value="sponsor_id">{{sponsor_name}}</option>
                          <option
                            v-for="(sponsor, index) in sponsors"
                            :key="index"
                            :value="sponsor.id"
                          >
                            {{ sponsor.name }}
                          </option>
                        </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- QA -->
            <div class="card mb-4">
              <div class="card">
                <div class="card-header">
                  <div class="header-content">
                    <span>Análise de Qualidade</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <select
                        class="form-select form-select-sm"
                      >
                        <option selected disabled>{{this.qa_name}}</option>
                        <option
                          v-for="(qa, index) in qas"
                          :key="index"
                          :value="qa.id"
                        >
                          {{ qa.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Category -->
            <div class="card mb-4">
              <div class="card">
                <div class="card-header">
                  <div class="header-content">
                    <span>Prazos</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <label class="form-label">Data limite</label>
                      <input
                        type="datetime-local"
                        class="form-control form-control-sm"
                        v-model="dead_line"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Prioridade</label>
                      <select
                        class="form-select form-select-sm"
                        v-model="priority_id"
                      >
                        <option selected disabled>{{this.priority_name}}</option>
                        <option
                          v-for="(priority, index) in priorities"
                          :key="index"
                          :value="priority.id"
                        >
                          {{ priority.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Notification settings -->
            <div class="card mb-4">
              <div class="card">
                <div class="card-header">
                  <div class="header-content">
                    <span>Notificações por e-mail a cada etapa</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <ul class="list-group list-group-flush mx-n2">
                    <li
                      class="list-group-item px-0 d-flex justify-content-between align-items-start"
                    >
                      <div class="ms-2 me-auto">
                        <label class="form-label"
                          >Notificação para o autor</label
                        >
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          v-model="not_email_owner"
                          :checked="not_email_owner"
                        />
                      </div>
                    </li>
                    <li
                      class="list-group-item px-0 d-flex justify-content-between align-items-start"
                    >
                      <div class="ms-2 me-auto">
                        <label class="form-label"
                          >Notificação para as cópias</label
                        >
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          v-model="not_email_copies"
                          :checked="not_email_copies"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <SweetAlertFormError
      :key="countAlert"
      v-if="showError"
      :message="errorMessage"
    />
  </div>
</template>

<script>
import EditCkeditor from "../../components/others/EditCkeditor.vue";
import SweetAlertFormError from "../../components/alerts/SweetAlertFormError.vue";
import router from "@/router";
import axios from "axios";

export default {
  name: "EditTask",
  data() {
    return {
      //Auth
      token: localStorage.getItem("authToken"),

      //Get data API
      task: {},
      clients: {},
      directions: {},
      priorities: {},
      sponsors: {},
      qas: {},

      //Form data
      outside_requester: localStorage.getItem("userName"),
      client_id: '',
      client_name: '',
      email_copy: null,
      dead_line: null,
      priority_id: '',
      priority_name: '',
      direction_id: '',
      direction_name: '',
      title: '',
      description: '',
      sponsor_id: '',
      sponsor_name: '',
      qa_id: '',
      qa_name: '',
      type: '',
      type_name: '',
      not_email_owner: 'checked',
      not_email_copies: 0,

      //Form Data Error
      errorMessage: "",
      showError: false,
      countAlert: 0,
    };
  },
  components: {
    EditCkeditor,
    SweetAlertFormError,
  },
  methods: {
    getHeaders() {
      return {
        headers: { Authorization: `Bearer ${this.token}` },
      };
    },

    save() {
      var data = {
        outside_requester: this.outside_requester,
        client_id: this.client_id,
        email_copy: this.email_copy,
        dead_line: this.dead_line,
        title: this.title,
        description: this.description,
        direction_id: this.direction_id,
        priority_id: this.priority_id,
        sponsor_id: this.sponsor_id,
        qa_id: this.qa_id,
        type: this.type,
        notif_email_copies: this.notif_email_copies,
      };

      //Save data and create task
      axios
        .put(`${process.env.VUE_APP_API_DOMAIN}/task/${this.task.id}`, data, this.getHeaders())
        .then((response) => {
          if (response) {
            console.log(response);
            router.push({ name: "Tasks" });
          }
        })
        .catch((error) => {
          let data = error.response.data.errors;
          let strError = "";
          Object.keys(data).forEach(function (key) {
            strError += data[key] + "<br/>";
          });

          this.errorMessage = strError;
          this.showError = true;
          this.countAlert++;
        });
    },

    getUsersFromSpecificDirection(e) {
      //Get users from this direction
      axios
        .post(
          `${process.env.VUE_APP_API_DOMAIN}/usersFilter`,
          { direction_id: e.target.value },
          this.getHeaders()
        )
        .then((response) => {
          if (response) {
            this.sponsors = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getContentEditor(e){
      this.description = e;
    }
  },
  mounted() {
    //Get this task
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/task/${this.$route.params.id}`, this.getHeaders())
      .then((response) => {
        if (response) {
          this.task = response.data.data;
          this.outside_requester = this.task.outside_requester;
          this.client_id = this.task.client.id;
          this.client_name = this.task.client.name;
          this.email_copy = this.task.email_copy;
          this.type = this.task.type.id;
          this.type_name = this.task.type.name;
          this.title = this.task.title;
          this.description = this.task.description;
          this.dead_line = (this.task.dead_line).substring(0, 16);
          this.priority_id = this.task.priority.id;
          this.priority_name = this.task.priority.name;
          this.direction_id = this.task.direction.id;
          this.direction_name = this.task.direction.name;
          this.sponsor_id = this.task.sponsor.id ? this.task.sponsor.id : '';
          this.sponsor_name = this.task.sponsor.name != null ? this.task.sponsor.name : "Nenhum" ;
          this.qa_id = this.task.qa.id;
          this.qa_name = this.task.qa.name != null ? this.task.qa.name : "Nenhum" ;
          this.not_email_owner = this.task.not_email_owner;
          this.not_email_copies = this.task.not_email_copies;
        }
      })  
      .catch((error) => {
        console.log(error);
      });

    //Get Clients
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/clients`, this.getHeaders())
      .then((response) => {
        if (response) {
          this.clients = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Get Directions
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/directions`, this.getHeaders())
      .then((response) => {
        if (response) {
          this.directions = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Get Priorities
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/priorities`, this.getHeaders())
      .then((response) => {
        if (response) {
          this.priorities = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Get users from this direction
    axios
      .post(
        `${process.env.VUE_APP_API_DOMAIN}/usersFilter`,
        { direction_id: 2 },
        this.getHeaders()
      )
      .then((response) => {
        if (response) {
          this.qas = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });


  },
};
</script>


<style scoped>
.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0.5rem 1.5rem !important;
}

.card-header {
  background-color: #f6f6f6;
  border: 1px solid #cccccc;
}

label {
  font-size: 0.85rem;
}
</style>