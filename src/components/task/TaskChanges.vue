<template>
  <div class="content">
    <form @submit.prevent="save">
      <div class="card">
        <div class="card-header">
          <div class="header-content">
            <span class="general-title-card mt-1">Modificações</span>
            <div>
              <div class="dropdown">
                <a
                  class="dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style="color: #212529;"
                >
                  <i
                    class="fa-solid fa-bars card-options"
                    style="color: #212529;"
                  >
                  </i>
                </a>
                <ul class="dropdown-menu">
                  <li><a @click="evolveTask(9)" class="dropdown-item" href="#">Cancelar tarefa</a></li>
                  <li><a @click="evolveTask(4)" class="dropdown-item" href="#">Enviar para teste</a></li>
                  <li><a @click="evolveTask(8)" class="dropdown-item" href="#">Finalizar via suporte</a></li>
                  <li><a @click="evolveTask(10)" class="dropdown-item" href="#">Inativar - Solicitar feedback</a></li>
                  <li><a @click="evolveTask(11)" class="dropdown-item" href="#">Inativar - Outros motivos</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body" style="padding: 15px">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label class="title">Branch local</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-if="task"
                  v-model="branch"
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label class="title">Link do merge request</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-if="task"
                  v-model="link_merge_request"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="mb-3">
              <label class="description">Modificação</label>
              <div>
                <CreateTaskChangesCkeditor
                  @get-data-editor="getContentEditor"
                  :task="this.task"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-icon-text"
              type="submit"
              style="background-color: #57cfde; color: #fff"
            >
              <i class="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;<span
                class="text"
                >Salvar</span
              >
            </button>
          </div>
        </div>
      </div>
      <SweetAlertFormError
        :key="countAlert"
        v-if="showError"
        :message="errorMessage"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SweetAlertFormError from "../../components/alerts/SweetAlertFormError.vue";
import CreateTaskChangesCkeditor from "@/components/others/CreateTaskChangesCkeditor.vue";
import { getAuthToken } from "../../../middlewares/authMiddleware";

export default {
  name: "TaskChanges",
  data() {
    return {
      branch: "",
      link_merge_request: "",
      modification: "",

      //Form Data Error
      errorMessage: "",
      showError: false,
      countAlert: 0,
    };
  },
  components: {
    CreateTaskChangesCkeditor,
    SweetAlertFormError,
  },
  methods: {
    getContentEditor(e) {
      this.modification = e;
    },
    save() {
      var data = {
        branch: this.branch,
        link_merge_request: this.link_merge_request,
        modification: this.modification,
      };

      //Save data and create task
      axios
        .put(
          `${process.env.VUE_APP_API_DOMAIN}/task/changes/${this.task.id}`,
          data,
          getAuthToken()
        )
        .then((response) => {
          if (response) {
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
    evolveTask(e){
      console.log(e);
    }
  },
  watch: {
    task: {
      immediate: false,
      handler(task) {
        this.branch = task.branch;
        this.modification = task.modification;
        this.link_merge_request = task.link_merge_request;
      },
    },
  },
  props: {
    task: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
.title,
.description {
  display: block;
  border-bottom: 0.9px solid #efefef;
  color: #aaaaaa;
  font-size: 0.75rem;
}

a {
  margin: 0px 5px;
}

.card-body {
  position: relative;
  height: 300px;
  overflow-y: scroll;
}

.dropdown-item {
  font-size: 0.7rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
}
</style>

