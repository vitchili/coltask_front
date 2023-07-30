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
import Swal from "sweetalert2";

export default {
  name: "app",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
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
    };
  },
  methods: {
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

          if (fileExtension) {
            editor.execute("imageInsert", { source: imageSrc });
              let fileNotImg = document.getElementsByTagName("img");
              for (let i = 0; i < fileNotImg.length; i++) {
                var srcNotImage = fileNotImg[i].getAttribute("src");
                if (srcNotImage && srcNotImage == imageSrc) {
                  fileNotImg[i].style.display = "none";
                }
              }
          }
          
          const envolvedDiv = document.createElement("div");
          envolvedDiv.id = 'div_' + file.name;
          envolvedDiv.style.position = 'relative';
          envolvedDiv.style.margin = '10px';
          envolvedDiv.style.cursor = 'pointer';
          envolvedDiv.style.display = 'inline-flex';
          attachmentsDiv.appendChild(envolvedDiv);

          const thumbnail = document.createElement("embed");
          thumbnail.id = 'embed_' + file.name;
          thumbnail.className = 'embeds';
          thumbnail.style.width = '150px';
          thumbnail.style.height = '150px';
          thumbnail.style.margin = '5px';
          thumbnail.src = imageSrc;
          thumbnail.className = 'file-thumbnail';
          envolvedDiv.appendChild(thumbnail);

          const thumbnailSpan = document.createElement("i");
          thumbnailSpan.id = 'i_' + file.name;
          thumbnailSpan.style.color = '#585858';
          thumbnailSpan.className = "fa-solid";
          thumbnailSpan.classList.add('fa-eye');
          envolvedDiv.appendChild(thumbnailSpan);
          
          const redXAttachment = document.createElement("i");
          redXAttachment.id = 'delete_' + file.name;
          redXAttachment.className = 'fa-solid';
          redXAttachment.classList.add('fa-x');
          redXAttachment.classList.add('fa-2xs');
          redXAttachment.style.color = '#ff0000';
          redXAttachment.style.cursor = 'pointer';
          redXAttachment.style.position = 'relative';
          redXAttachment.style.top = '-140px';
          redXAttachment.style.left = '-5px';
          attachmentsDiv.appendChild(redXAttachment);
          
          redXAttachment.onclick = function() {
            let divFileToRemove = document.getElementById('div_' + file.name);
            let embedFileToRemove = document.getElementById('embed_' + file.name);
            let eyeMiniatureToRemove = document.getElementById('i_' + file.name);
            let redXfileToRemove = document.getElementById('delete_' + file.name);
            envolvedDiv.removeChild(eyeMiniatureToRemove);
            envolvedDiv.removeChild(embedFileToRemove);
            attachmentsDiv.removeChild(redXfileToRemove);
            attachmentsDiv.removeChild(divFileToRemove);
            this.countAttachments--;

          };
          envolvedDiv.onclick = function(e) {
            var element = envolvedDiv.getElementsByTagName("embed")[0];
            var newThumbnail = document.createElement('embed');
            newThumbnail.style.width = '100%'; 
            newThumbnail.src = element.src;
            if(element.src.substring(5, 10) == 'image'){
              newThumbnail.style.maxWidth = '800px';
              newThumbnail.style.height = element.height;
            }else{
              newThumbnail.style.height = '600px';
            }
            Swal.fire({
              width: 900,
              html: newThumbnail,
              confirmButtonColor: "#56CEDD",
            });
          };

          this.countAttachments++;

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