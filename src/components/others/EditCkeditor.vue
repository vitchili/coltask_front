<template>
  <div id="app">
    <ckeditor
      v-model="editorData"
      :editor="editor"
      @ready="onEditorReady"
    ></ckeditor>
    <div id="attachmentsDiv">
        <label class="form-label">Anexos: <small v-show="countAttachments == 0">Nenhum arquivo anexado. Arraste e solte na descrição.</small></label>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      token: localStorage.getItem("authToken"),
      countAttachments: 0,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "undo",
            "redo"
          ]
        }
      },
      content: '',
      editorInstance: null,
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  watch: {
    'task.description': {
      immediate: false,
      handler(newDescription) {
        if (this.editorData !== newDescription) {
          axios
            .get(`${process.env.VUE_APP_API_DOMAIN}/task/${this.task.id}/getBase64Attachments`, this.getHeaders())
            .then((response) => {
              if (response) {
                
                this.attachmentFiles = response.data;
  
                for(let i=0; i<(this.attachmentFiles).length; i++ ){
                  var attachmentsDiv = document.getElementById('attachmentsDiv');

                  const spaceBetween = document.createElement("div");
                  spaceBetween.style.display = 'block';
                  attachmentsDiv.appendChild(spaceBetween);

                  if((this.attachmentFiles)[i].extension == 'pdf'){
                    var type = 'application/';
                  }else{
                    var type = 'image/';
                  }
                  const thumbnail = document.createElement("embed");
                  thumbnail.id = 'attachmentFileImg_' + (i+1);
                  thumbnail.style.width = '150px';
                  thumbnail.style.height = '150px';
                  thumbnail.style.margin = '5px';
                  thumbnail.src = "data:" + type + (this.attachmentFiles)[i].extension + ";base64,"+ (this.attachmentFiles)[i].file;
                  thumbnail.className = 'file-thumbnail';
                  attachmentsDiv.appendChild(thumbnail);

                  const thumbnailSpan = document.createElement("span");
                  thumbnailSpan.id = 'attachmentFileSpan_' + (i+1);
                  thumbnailSpan.innerText = 'anexo_' + (i+1) + '.' + (this.attachmentFiles)[i].extension;
                  thumbnailSpan.className = "file-thumbnail";
                  thumbnailSpan.style.backgroundColor = "#f8f8f8"; 
                  attachmentsDiv.appendChild(thumbnailSpan);

                  const redXAttachment = document.createElement("i");
                  redXAttachment.id = 'delete_' + 'anexo_' + (i+1);
                  redXAttachment.className = 'fa-solid';
                  redXAttachment.classList.add('fa-x');
                  redXAttachment.classList.add('fa-2xs');
                  redXAttachment.style.color = '#ff0000';
                  attachmentsDiv.appendChild(redXAttachment);

                  redXAttachment.onclick = function() {
                    let fileToRemove = document.getElementById('attachmentFileSpan_' + (i+1));
                    let redXfileToRemove = document.getElementById('delete_' + 'anexo_' + (i+1));
                    let miniatureToRemove = document.getElementById('attachmentFileImg_' + (i+1));
                    attachmentsDiv.removeChild(fileToRemove);
                    attachmentsDiv.removeChild(redXfileToRemove);
                    attachmentsDiv.removeChild(miniatureToRemove);
                  };
                  
                  this.countAttachments++;
                }
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
  methods: {
    getHeaders() {
      return {
        headers: { Authorization: `Bearer ${this.token}` },
      };
    },
    onEditorReady(editor) {
      const editorElement = document.querySelector("#app .ck-editor__editable");

      editorElement.addEventListener("dragover", this.handleDragOver);
      editorElement.addEventListener("drop", this.handleDrop.bind(this, editor));

      // Ocultar o botão "Insert Image" após o editor ser carregado
      const insertImageButton = document.querySelector(
        ".ck-button[data-cke-tooltip-text='Insert image']"
      );
      if (insertImageButton) {
        insertImageButton.style.display = "none";
      }

      editor.model.document.on('change:data', () => {
        this.content = editor.getData();
        this.content = (this.content).replaceAll('"', "'");
        this.$emit('get-data-editor', this.content);
        console.log(this.content);
      });


    },

    handleDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    },

    handleDrop(editor, event) {
      event.preventDefault();

      const file = event.dataTransfer.files[0];
      const fileExtension = this.getFileExtension(file.name);
      
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target.result;

            // Inserir a imagem no conteúdo do editor
          if (fileExtension /*&& fileExtension.match(/(png|jpe?g|gif)$/i)*/) {
            editor.execute("imageInsert", { source: imageSrc });
            // if(! fileExtension.match(/(png|jpe?g|gif)$/i)){
              let fileNotImg = document.getElementsByTagName("img");
              for (let i = 0; i < fileNotImg.length; i++) {
                var srcNotImage = fileNotImg[i].getAttribute("src");
                if (srcNotImage && srcNotImage == imageSrc) {
                  fileNotImg[i].style.display = "none";
                }
              }
            // }
          }

          const spaceBetween = document.createElement("div");
          spaceBetween.style.display = 'block';
          attachmentsDiv.appendChild(spaceBetween);

          const thumbnail = document.createElement("embed");
          thumbnail.id = 'attachmentFileImg_' + file.name;
          thumbnail.style.width = '150px';
          thumbnail.style.height = '150px';
          thumbnail.className = 'file-thumbnail';
          thumbnail.style.margin = '5px';
          thumbnail.src = imageSrc;
          attachmentsDiv.appendChild(thumbnail);
          
          const thumbnailSpan = document.createElement("span");
          thumbnailSpan.id = 'attachmentFileSpan_' + file.name;
          thumbnailSpan.innerText = 'anexo_' + file.name;
          thumbnailSpan.className = "file-thumbnail";
          thumbnailSpan.style.backgroundColor = "#f8f8f8"; 
          attachmentsDiv.appendChild(thumbnailSpan);
          
          const redXAttachment = document.createElement("i");
          redXAttachment.id = 'delete_' + 'anexo_' + file.name;
          redXAttachment.className = 'fa-solid';
          redXAttachment.classList.add('fa-x');
          redXAttachment.classList.add('fa-2xs');
          redXAttachment.style.color = '#ff0000';
          attachmentsDiv.appendChild(redXAttachment);
          
          redXAttachment.onclick = function() {
            let fileToRemove = document.getElementById('attachmentFileSpan_' + file.name);
            let redXfileToRemove = document.getElementById('delete_' + 'anexo_' + file.name);
            let miniatureToRemove = document.getElementById('attachmentFileImg_' + file.name);
            attachmentsDiv.removeChild(fileToRemove);
            attachmentsDiv.removeChild(redXfileToRemove);
            attachmentsDiv.removeChild(miniatureToRemove);

            // const images = document.getElementsByTagName("img");
            // for (let i = 0; i < images.length; i++) {
              // var srcImage = images[i].getAttribute("src");
              // if (srcImage && srcImage == imageSrc) {
                // images[i].style.display = "none";
              // }
            // }

          };
          
            
          this.countAttachments++;

          // console.dir(imageSrc);

        };
        reader.readAsDataURL(file);
      },
      
      getFileExtension(filename) {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
      }
  },
  emits: ['get-data-editor']
};

</script>

<style>
#attachmentsDiv{
  margin: 10px 0px; 
}

.dropped-image {
  max-width: 100%;
}

.file-thumbnail {
  display: inline-block;
  padding: 2px 4px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  margin: 0 2px;
  vertical-align: middle;
}

label {
  font-size: 0.85rem;
}
</style>