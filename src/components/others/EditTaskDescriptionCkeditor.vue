<template>
  <div id="app">
    <ckeditor
      v-model="editorData"
      :editor="editor"
      @ready="onEditorReady"
    ></ckeditor>
    <div id="attachmentsDiv">
        <small style="font-size: 9pt;" v-show="countAttachments == 0">Nenhum arquivo anexado... Arraste e solte na descrição</small>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import axios from "axios";
import Swal from "sweetalert2";

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
            "redo",
          ],
        },
      },
      content: "",
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
    "task.description": {
      immediate: false,
      handler(newDescription) {
        if (this.editorData !== newDescription) {
          axios
            .get(
              `${process.env.VUE_APP_API_DOMAIN}/task/${this.task.id}/getBase64Attachments/attachments`,
              this.getHeaders()
            )
            .then((response) => {
              if (response) {
                this.attachmentFiles = response.data;
                var type = [];
                var thumbnail = [];
                var envolvedDiv = [];
                var thumbnailSpan = [];
                var redXAttachment = [];
                for (let i = 0; i < this.attachmentFiles.length; i++) {
                  var attachmentsDiv =
                    document.getElementById("attachmentsDiv");

                  if (this.attachmentFiles[i].extension == "pdf") {
                    type[i] = "application/";
                  } else {
                    type[i] = "image/";
                  }

                  envolvedDiv[i] = document.createElement("div");
                  envolvedDiv[i].id = "divAttachmentFileImg_" + i;
                  envolvedDiv[i].style.position = "relative";
                  envolvedDiv[i].style.margin = "10px";
                  envolvedDiv[i].style.cursor = "pointer";
                  envolvedDiv[i].style.display = "inline-flex";

                  attachmentsDiv.appendChild(envolvedDiv[i]);

                  thumbnail[i] = document.createElement("embed");
                  thumbnail[i].id = "attachmentFileImg_" + i;
                  thumbnail[i].style.width = "150px";
                  thumbnail[i].style.height = "150px";
                  thumbnail[i].style.margin = "5px";
                  thumbnail[i].src =
                    "data:" +
                    type[i] +
                    this.attachmentFiles[i].extension +
                    ";base64," +
                    this.attachmentFiles[i].file;
                  thumbnail[i].className = "file-thumbnail";
                  envolvedDiv[i].appendChild(thumbnail[i]);

                  thumbnailSpan[i] = document.createElement("i");
                  thumbnailSpan[i].id = "attachmentFileSpan_" + i;
                  thumbnailSpan[i].style.color = "#585858";
                  thumbnailSpan[i].className = "fa-solid";
                  thumbnailSpan[i].classList.add("fa-eye");
                  envolvedDiv[i].appendChild(thumbnailSpan[i]);

                  redXAttachment[i] = document.createElement("i");
                  redXAttachment[i].id = "redXAttachmentFile_" + i;
                  redXAttachment[i].className = "fa-solid";
                  redXAttachment[i].classList.add("fa-x");
                  redXAttachment[i].classList.add("fa-2xs");
                  redXAttachment[i].style.color = "#ff0000";
                  redXAttachment[i].style.cursor = "pointer";
                  redXAttachment[i].style.position = "relative";
                  redXAttachment[i].style.top = "-140px";
                  redXAttachment[i].style.left = "-5px";
                  attachmentsDiv.appendChild(redXAttachment[i]);


                  var taskId = this.task.id;
                  var headers = {
                    headers: { Authorization: `Bearer ${this.token}` },
                  }
                  redXAttachment[i].onclick = function () {
                    let divFileToRemove = document.getElementById("divAttachmentFileImg_" + i);
                    let embedFileToRemove = document.getElementById("attachmentFileImg_" + i);
                    let eyeMiniatureToRemove = document.getElementById("attachmentFileSpan_" + i);
                    let redXfileToRemove = document.getElementById("redXAttachmentFile_" + i);
                    envolvedDiv[i].removeChild(eyeMiniatureToRemove);
                    envolvedDiv[i].removeChild(embedFileToRemove);
                    attachmentsDiv.removeChild(redXfileToRemove);
                    attachmentsDiv.removeChild(divFileToRemove);

                    axios
                    .delete(`${process.env.VUE_APP_API_DOMAIN}/task/${taskId}/deleteTaskAttachment/attachments/${i}`, headers)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                    this.countAttachments--;
                  };

                  this.countAttachments++;
                }

                var newThumbnail = [];

                this.attachmentFiles.forEach(function (element, index) {
                  envolvedDiv[index].onclick = function (e) {
                    var element =
                      envolvedDiv[index].getElementsByTagName("embed")[0];
                    newThumbnail[index] = document.createElement("embed");
                    newThumbnail[index].style.width = "100%"; // Define a largura para preencher o pop-up
                    newThumbnail[index].src = element.src;

                    if (element.src.substring(5, 10) == "image") {
                      newThumbnail[index].style.maxWidth = "800px"; // Altura ajustável proporcionalmente à largura
                      newThumbnail[index].style.height = element.height; // Altura ajustável proporcionalmente à largura
                    } else {
                      newThumbnail[index].style.height = "600px";
                    }

                    Swal.fire({
                      width: 900,
                      html: newThumbnail[index],
                      confirmButtonColor: "#56CEDD",
                    });
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
  methods: {
    getHeaders() {
      return {
        headers: { Authorization: `Bearer ${this.token}` },
      };
    },
    onEditorReady(editor) {
      const editorElement = document.querySelector("#app .ck-editor__editable");

      editorElement.addEventListener("dragover", this.handleDragOver);
      editorElement.addEventListener(
        "drop",
        this.handleDrop.bind(this, editor)
      );

      const insertImageButton = document.querySelector(
        ".ck-button[data-cke-tooltip-text='Insert image']"
      );
      if (insertImageButton) {
        insertImageButton.style.display = "none";
      }

      editor.model.document.on("change:data", () => {
        this.content = editor.getData();
        this.content = this.content.replaceAll('"', "'");
        this.$emit("get-data-editor", this.content);
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
        envolvedDiv.id = "div_" + file.name;
        envolvedDiv.style.position = "relative";
        envolvedDiv.style.margin = "10px";
        envolvedDiv.style.cursor = "pointer";
        envolvedDiv.style.display = "inline-flex";
        attachmentsDiv.appendChild(envolvedDiv);

        const thumbnail = document.createElement("embed");
        thumbnail.id = "embed_" + file.name;
        thumbnail.className = "embeds";
        thumbnail.style.width = "150px";
        thumbnail.style.height = "150px";
        thumbnail.style.margin = "5px";
        thumbnail.src = imageSrc;
        thumbnail.className = "file-thumbnail";
        envolvedDiv.appendChild(thumbnail);

        const thumbnailSpan = document.createElement("i");
        thumbnailSpan.id = "i_" + file.name;
        thumbnailSpan.style.color = "#585858";
        thumbnailSpan.className = "fa-solid";
        thumbnailSpan.classList.add("fa-eye");
        envolvedDiv.appendChild(thumbnailSpan);

        const redXAttachment = document.createElement("i");
        redXAttachment.id = "delete_" + file.name;
        redXAttachment.className = "fa-solid";
        redXAttachment.classList.add("fa-x");
        redXAttachment.classList.add("fa-2xs");
        redXAttachment.style.color = "#ff0000";
        redXAttachment.style.cursor = "pointer";
        redXAttachment.style.position = "relative";
        redXAttachment.style.top = "-140px";
        redXAttachment.style.left = "-5px";
        attachmentsDiv.appendChild(redXAttachment);

        envolvedDiv.onclick = function (e) {
          var element = envolvedDiv.getElementsByTagName("embed")[0];
          var newThumbnail = document.createElement("embed");
          newThumbnail.style.width = "100%";
          newThumbnail.src = element.src;
          if (element.src.substring(5, 10) == "image") {
            newThumbnail.style.maxWidth = "800px";
            newThumbnail.style.height = element.height;
          } else {
            newThumbnail.style.height = "600px";
          }
          Swal.fire({
            width: 900,
            html: newThumbnail,
            confirmButtonColor: "#56CEDD",
          });
        };

        this.countAttachments++;

        // console.dir(imageSrc);
      };
      reader.readAsDataURL(file);
    },

    getFileExtension(filename) {
      return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    },
  },
  emits: ["get-data-editor"],
};
</script>

<style>
#attachmentsDiv {
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