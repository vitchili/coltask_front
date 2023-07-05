<template>
  <div class="content">
    <div class="card b-1 hover-shadow mb-20" >
          <div class="media card-body">
            <div>
              <span class="fs-14">Hossein Shams</span>
            </div>
          </div>
          <footer class="card-footer flexbox align-items-center">
            <div>
              <span>21 Jan, 2017</span>
            </div>
            <div class="card-hover-show">
              <i class="fa-solid fa-paper-plane fa-lg card-options" style="color: #13C9EF"></i>
              <i class="fa-solid fa-pen-to-square fa-lg card-options" style="color: #ffbb00;"></i>
              <i class="fa-solid fa-ban fa-lg card-options" style="cursor: pointer; color: #ff0000;" @click="cancelTask"></i>
              <SweetAlertCancelTaskVue :key="cancelTaskAlertKey" v-if="showCancelTaskAlert" />
            </div>
          </footer>
        </div>
  </div>
</template>

<script>
import SweetAlertCancelTaskVue from '../alerts/SweetAlertCancelTask.vue';

export default {
  name: "TaskCard",
  data() {
    return {
      showCancelTaskAlert : false,
      cancelTaskAlertKey : 0
    }
  },
  components : {
    SweetAlertCancelTaskVue
  },
  methods: {
    cancelTask() {
      this.showCancelTaskAlert = true;
      this.cancelTaskAlertKey++;
    },
  },
};
</script>

<style scoped>

.mb-20 {
    margin-bottom: 10px !important;
}

.b-1 {
    border: 1px solid #ebebeb !important;
}

.card {
    border: 0;
    border-radius: 0;
    -webkit-transition: .5s;
    transition: .5s;
}

.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.media {
    padding: 5px 12px;
    -webkit-transition: background-color .2s linear;
    transition: background-color .2s linear;
}

.media {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: start;
    align-items: flex-start;
}

.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: .75rem;
}

.card-options {
  padding: 0 5px;
}

.media {
    flex-shrink: 0;
}

.mb-2 {
    margin-bottom: .5rem!important;
}

.ls-1 {
    letter-spacing: 1px !important;
}

.fw-300 {
    font-weight: 300 !important;
}

small, time, .small {
    font-family: Roboto,sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #8b95a5;
}

.fs-14 {
    font-size: 14px !important;
}

.card-footer {
    background-color: #fcfdfe;
    border-top: 1px solid rgba(77,82,89,0.07);
    color: #8b95a5;
}

.flexbox {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}

.align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
}

.card-footer {
    background-color: rgba(0,0,0,.03);
    border-top: 1px solid rgba(0,0,0,.125);
}


.card-footer {
    background-color: #fcfdfe;
    border-top: 1px solid rgba(77, 82, 89, 0.07);
    color: #8b95a5;
    font-size: 9pt;
}

.hover-shadow {
    -webkit-box-shadow: 0 0 35px rgba(0, 0, 0, 0.11);
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.11)
}

.fs-10 {
    font-size: 10px !important;
}
</style>

