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
            Criar tarefa
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
                    <span class="general-title-card">Envolvidos</span>
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
                          <option value="" selected>Selecione o cliente</option>
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
                          <option value="H">Ajuda</option>
                          <option value="E" selected>Correção de Erro</option>
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
                    <span class="general-title-card">Dados da Tarefa</span>
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
                        <CreateTaskDescriptionCkeditor @get-data-editor="getContentEditor"/>
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
                    <span class="general-title-card">Time de solução</span>
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
                        <option value="" selected>Selecione o setor</option>
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
                    <span class="general-title-card">Análise de Qualidade</span>
                  </div>
                </div>
                <div class="card-body" style="padding: 15px">
                  <div class="col-lg-12">
                    <div class="mb-3">
                      <select
                        class="form-select form-select-sm"
                        v-model="qa_id"
                      >
                        <option value="">Nenhum</option>
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
                    <span class="general-title-card">Prazos</span>
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
                        <option value="" selected>Selecione a prioridade</option>
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
                    <span class="general-title-card">Notificações por e-mail a cada etapa</span>
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
import CreateTaskDescriptionCkeditor from "../../components/others/CreateTaskDescriptionCkeditor.vue";
import SweetAlertFormError from "../../components/alerts/SweetAlertFormError.vue";
import router from "@/router";
import axios from "axios";
import { getAuthToken } from '../../../middlewares/authMiddleware'; 

export default {
  name: "CreateTask",
  data() {
    return {
      //Get data API
      clients: {},
      directions: {},
      priorities: {},
      sponsors: {},
      qas: {},

      //Form data
      outside_requester: localStorage.getItem("userName"),
      client_id: '',
      email_copy: null,
      dead_line: null,
      priority_id: '',
      title: '',
      description: '',
      direction_id: '',
      sponsor_id: '',
      qa_id: '',
      type: 'E',
      not_email_owner: 0,
      not_email_copies: 0,

      //Form Data Error
      errorMessage: "",
      showError: false,
      countAlert: 0,
    };
  },
  components: {
    CreateTaskDescriptionCkeditor,
    SweetAlertFormError,
  },
  methods: {
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
        not_email_owner: this.not_email_owner,
        not_email_copies: this.not_email_copies,
      };

      //Save data and create task
      axios
        .post(`${process.env.VUE_APP_API_DOMAIN}/task`, data, getAuthToken())
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
          getAuthToken()
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
    //Get Clients
    axios
      .get(`${process.env.VUE_APP_API_DOMAIN}/clients`, getAuthToken())
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
      .get(`${process.env.VUE_APP_API_DOMAIN}/directions`, getAuthToken())
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
      .get(`${process.env.VUE_APP_API_DOMAIN}/priorities`, getAuthToken())
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
        getAuthToken()
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