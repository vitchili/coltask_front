<template>
  <div class="content">
    <form @submit.prevent="save">
      <div class="card">
        <div class="card-header">
          <div class="header-content">
            <span class="general-title-card mt-1">Testes</span>
          </div>
        </div>
        <div class="card-body" style="padding: 15px">
          <div class="row">
            <div class="d-flex justify-content-between fs-9">
              <span class="gray-span">Observações do teste realizado</span>
              <div class="mb-2">
                <i
                  id="thumb-up"
                  class="fa-solid fa-thumbs-up fa-xl m-2"
                  style="color: #bbb; cursor: pointer;"
                  @click="approveAction"
                ></i>
                <i
                  id="thumb-down"
                  class="fa-solid fa-thumbs-down fa-xl m-2"
                  style="color: #bbb; cursor: pointer"
                  @click="repproveAction"
                ></i>
              </div>
            </div>
            <div>
              <CreateTaskTestsCkeditor
                @get-data-editor="getContentEditor"
                :task="this.task"
              />
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
    </form>
    <SweetAlertFormError
      :key="countAlert"
      v-if="showError"
      :message="errorMessage"
    />
    <SweetAlertSuccess 
      :key="countSuccess"
      v-if="showSuccess"
    />
  </div>
</template>

<script>
import axios from "axios";
import SweetAlertFormError from "../../components/alerts/SweetAlertFormError.vue";
import SweetAlertSuccess from "../../components/alerts/SweetAlertSuccess.vue";
import CreateTaskTestsCkeditor from "@/components/others/CreateTaskTestsCkeditor.vue";
import { getAuthToken } from '../../../middlewares/authMiddleware'; 
import { getUserDirections } from '../../../middlewares/authMiddleware'; 

export default {
  name: "TaskTests",
  components: {
    CreateTaskTestsCkeditor,
    SweetAlertFormError,
    SweetAlertSuccess,
  },
  data() {
    return {
      qa_id: "",
      test_ocorrency: "",
      approved_or_failed: "",

      //Form Data Error
      errorMessage: "",
      showError: false,
      countAlert: 0,

      //Form Success
      showSuccess: false,
      countSuccess: 0,
    };
  },
  methods: {
    getContentEditor(e) {
      this.test_ocorrency = e;
    },
    save() {
      var keyQA = 0;
      getUserDirections().forEach(function (element){
        if(element.slang == "QA"){
          keyQA = element.pivot.user_id;
        }
      });

      var data = {
        qa_id: keyQA,
        approved_or_failed: this.approved_or_failed,
        test_ocorrency: this.test_ocorrency,
      };

      axios
        .put(
          `${process.env.VUE_APP_API_DOMAIN}/task/tests/${this.task.id}`,
          data,
          getAuthToken()
        )
        .then((response) => {
          if (response) {
            this.showSuccess = true;
            this.countSuccess++;
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
    approveAction(){
        var thumbUp = document.getElementById('thumb-up');
        var thumbDown = document.getElementById('thumb-down');
        thumbUp.style.color = '#5ecf71';
        thumbDown.style.color = '#bbb';
        this.approved_or_failed = 'A';
    },
    repproveAction(){
        var thumbDown = document.getElementById('thumb-down');
        var thumbUp = document.getElementById('thumb-up');
        thumbDown.style.color = '#ec3c3c';
        thumbUp.style.color = '#bbb';
        this.approved_or_failed = 'F';
    },
    getThumbColor(){
      var thumbUp = document.getElementById('thumb-up');
      var thumbDown = document.getElementById('thumb-down');
      
      if(this.approved_or_failed == 'A'){
        thumbUp.style.color = '#5ecf71';
        thumbDown.style.color = '#bbb';
      }else if(this.approved_or_failed == 'F'){
        thumbDown.style.color = '#ec3c3c';
        thumbUp.style.color = '#bbb';
      }else{
        thumbUp.style.color = '#bbb';
        thumbDown.style.color = '#bbb';
      }
    }
  },
  watch: {
    "task": {
      immediate: false,
      handler(task) {
        this.qa_id = task.qa_id;
        this.approved_or_failed = task.approved_or_failed;
        this.test_ocorrency = task.test_ocorrency;
        this.getThumbColor();
      }
    }
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
.fs-9 {
  font-size: 0.8rem;
}

.gray-span {
  color: #aaaaaa;
  font-size: 0.75rem;
}

.inside-tab {
  position: relative;
  background-color: #fff;
  height: 100%;
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

