<template>
  <div class="content" style="max-height: 350px;">
    <div class="card" style="max-height: 350px;">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1">Tarefa #553230</span>
          <div>
            <span class="badge rounded-pill ms-2 text-bg-danger">
            Status: Em andamento  
            </span>
          </div>
        </div>
      </div>
      <div class="card-body" style="max-height: 350px; overflow-y: scroll;">
        <div class="row">
           <div class="form-group">
              <label for="fullName" class="title">Título</label>
              <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus facilis cumque aspernatur labore.</h5>
            </div>
        </div>
        <div class="row">
           <div class="form-group">
              <label for="fullName" class="description">Descrição</label>
              <p>Cinema Classics Movie Reviews</p>
              <p>Review: Basketball Dog (2018)</p>
              <p><i>4 out of 5 stars</i></p>
              <p>From director <b>Vicki Fleming</b> comes the heartwarming tale of a boy named Pete (Trent Dugson) and his dog Rover (voiced by Brinson Lumblebrunt). You may think a boy and his dog learning the true value of friendship sounds familiar, but a big twist sets this flick apart: Rover plays basketball, and he's doggone good at it.</p>
              <p>While it may not have been necessary to include all 150 minutes of Rover's championship game in real time, Basketball Dog will keep your interest for the entirety of its 4-hour runtime, and the end will have any dog lover in tears. If you love basketball or sports pets, this is the movie for you.</p>
              <p>Find the full cast listing at the Basketball Dog website.</p>
            </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskData",
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
.title, .description {
  display: block;
  border-bottom: .9px solid #efefef;
  color: #aaaaaa;
  font-size: .75rem;
}
p {
  font-size: .8rem;
}

.content {
  height: 400px;
}

.header-content {
  display: flex;
  justify-content: space-between;
}
</style>

