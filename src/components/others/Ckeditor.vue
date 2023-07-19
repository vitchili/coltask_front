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
      }
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

          if (fileExtension && fileExtension.match(/(png|jpe?g|gif)$/i)) {
            // Inserir a imagem no conteúdo do editor
            editor.execute("imageInsert", { source: imageSrc });
          }
          
            var attachmentsDiv = document.getElementById('attachmentsDiv');
            const thumbnail = document.createElement("span");
            thumbnail.innerText = file.name;
            thumbnail.className = "file-thumbnail";
            thumbnail.style.backgroundColor = "#f8f8f8"; // Substitua pelo caminho da imagem de ícone de arquivo
            attachmentsDiv.appendChild(thumbnail);

          // Aqui você pode fazer o que desejar com a imagem, por exemplo, exibir no console
          this.countAttachments++;
          console.dir(imageSrc);

          // Insira o código necessário para enviar a imagem para o servidor aqui
        };
        reader.readAsDataURL(file);
      },
      getFileExtension(filename) {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
      },
    },
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