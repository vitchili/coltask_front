<template>
  <div id="app">
    <ckeditor v-model="editorData" :editor="editor" @ready="onEditorReady"></ckeditor>
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
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;

        // Inserir a imagem no conteúdo do editor
        editor.execute("imageInsert", { source: imageSrc });

        // Aqui você pode fazer o que desejar com a imagem, por exemplo, exibir no console
        console.dir(imageSrc);

        // Insira o código necessário para enviar a imagem para o servidor aqui
      };

      reader.readAsDataURL(file);
    },
  },
};

</script>

<style>
.dropped-image {
  max-width: 100%;
}
</style>