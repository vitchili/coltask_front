<template>
  <div class="content" style="height: 350px">
    <div class="card" style="height: 350px">
      <div class="card-header">
        <div class="header-content">
          <span class="general-title-card mt-1" v-if="task"
            >Tarefa #{{ task.id }}</span
          >
          <div class="d-flex justify-content-end">
            <span class="badge rounded-pill ms-2 text-bg-danger" v-if="task">
              Status: {{ task.fase.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="card-body" style="height: 350px; overflow-y: scroll">
        <div class="row">
          <div class="form-group">
            <label for="fullName" class="title">Título</label>
            <h5 v-if="task">{{ task.title }}</h5>
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <label for="fullName" class="description">Descrição</label>
            <div v-if="task" v-html="span(task.description)"></div>
          </div>
          <div id="attachmentsDiv">
            <label class="description"
              >Anexos:
              <small v-show="countAttachments == 0"
                >Nenhum arquivo anexado..</small
              ></label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { getAuthToken } from '../../../middlewares/authMiddleware'; 

export default {
  name: "TaskData",
  components: {},
  data() {
    return {
      countAttachments: 0,
    };
  },
  props: {
    task: {
      type: Object,
      required: false,
    },
  },
  methods: {
    span(description) {
      return `<div> ${description} </div>`;
    },
  },
  watch: {
    'task.description': {
      immediate: false,
      handler(newDescription) {
        if (this.editorData !== newDescription) {
          axios
            .get(`${process.env.VUE_APP_API_DOMAIN}/task/${this.task.id}/getBase64Attachments/attachments`, getAuthToken())
            .then((response) => {
              if (response) {
                
                this.attachmentFiles = response.data;
                var type = [];
                var thumbnail = [];
                var envolvedDiv = [];
                var thumbnailSpan = [];

                for(let i=0; i<(this.attachmentFiles).length; i++ ){
                  var attachmentsDiv = document.getElementById('attachmentsDiv');

                  if((this.attachmentFiles)[i].extension == 'pdf'){
                    type[i] = 'application/';
                  }else{
                    type[i] = 'image/';
                  }
                  
                  envolvedDiv[i] = document.createElement("div");
                  envolvedDiv[i].id = 'divAttachmentFileImg_' + (i);
                  envolvedDiv[i].style.position = 'relative';
                  envolvedDiv[i].style.margin = '10px';
                  envolvedDiv[i].style.cursor = 'pointer';
                  envolvedDiv[i].style.display = 'inline-flex';

                  attachmentsDiv.appendChild(envolvedDiv[i]);

                  thumbnail[i] = document.createElement("embed");
                  thumbnail[i].id = 'attachmentFileImg_' + (i);
                  thumbnail[i].style.width = '150px';
                  thumbnail[i].style.height = '150px';
                  thumbnail[i].style.margin = '5px';
                  thumbnail[i].src = "data:" + type[i] + (this.attachmentFiles)[i].extension + ";base64,"+ (this.attachmentFiles)[i].file;
                  thumbnail[i].className = 'file-thumbnail';
                  envolvedDiv[i].appendChild(thumbnail[i]);

                  thumbnailSpan[i] = document.createElement("i");
                  thumbnailSpan[i].id = 'attachmentFileSpan_' + i;
                  thumbnailSpan[i].style.color = '#585858';
                  thumbnailSpan[i].className = "fa-solid";
                  thumbnailSpan[i].classList.add('fa-eye');
                  envolvedDiv[i].appendChild(thumbnailSpan[i]);

                  this.countAttachments++;
                }

                var newThumbnail = [];

                this.attachmentFiles.forEach(function (element, index) {
                  envolvedDiv[index].onclick = function(e) {
                    var element = envolvedDiv[index].getElementsByTagName("embed")[0];
                    newThumbnail[index] = document.createElement('embed');
                    newThumbnail[index].style.width = '100%'; // Define a largura para preencher o pop-up
                    newThumbnail[index].src = element.src;

                    if(element.src.substring(5, 10) == 'image'){
                      newThumbnail[index].style.maxWidth = '800px'; // Altura ajustável proporcionalmente à largura
                      newThumbnail[index].style.height = element.height; // Altura ajustável proporcionalmente à largura
                    }else{
                      newThumbnail[index].style.height = '600px';
                    }

                    Swal.fire({
                      width: 900,
                      html: newThumbnail[index],
                      confirmButtonColor: "#56CEDD",
                    });

                    // var downloadLink = document.createElement('a');
                    // downloadLink.href = thumbnail.src;
                    // downloadLink.download = 'nome_do_arquivo.png'; // Substitua pelo nome do arquivo com a extensão desejada
                    // downloadLink.click();
                    // downloadLink.remove();
                  };
                });

              }
            })
            .catch((error) => {
              console.log(error);
            });
          this.editorData = newDescription;
        }
      },
    },
  },
  mounted() {
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
p {
  font-size: 0.8rem;
}

.content {
  height: 400px;
}

.header-content {
  display: flex;
  justify-content: space-between;
}

</style>

