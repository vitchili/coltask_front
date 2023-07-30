<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1">Modificações</span>
          <div>
            <router-link :to="'/task/new'">
             <i
              class="fa-solid fa-bars card-options"
              style="color: #212529"
              ></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body" style="padding: 15px">
        <div class="col-lg-12">
          <div class="mb-3">
            <label class="title">Branch</label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-if="task"
              :value="task.branch"
            />
          </div>
        </div>
        <div class="col-lg-12">
          <div class="mb-3">
            <label class="description">Modificação</label>
            <div>
              <CreateCkeditor
                @get-data-editor="getContentEditor"
                :task="this.task"
              />
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-sm btn-icon-text" type="button" style="background-color: #57CFDE; color: #fff;">
                <i class="bi bi-save"></i> <span class="text">Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCkeditor from "@/components/others/CreateCkeditor.vue";
export default {
  name: "TaskChanges",
  data(){
    return {
      branch: '',
    };
  },
  mounted(){
    if(this.task){
      this.branch = this.task.branch;
    }
  },
  components: {
    CreateCkeditor,
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
.title, .description {
  display: block;
  border-bottom: .9px solid #efefef;
  color: #aaaaaa;
  font-size: .75rem;
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

