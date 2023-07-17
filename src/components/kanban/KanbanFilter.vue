<template>
  <div>
    <div class="d-flex justify-content-between kanban-filter">
      <div class="w-100 m-2 d-flex">
        <Multiselect
          v-model="projects.value"
          v-bind="projects"
          class="overwrite-style"
        ></Multiselect>
      </div>
      <div class="w-100 m-2">
        <Multiselect
          v-model="teams.value"
          v-bind="teams"
          class="overwrite-style"
        ></Multiselect>
      </div>
      <div class="w-100 m-2">
        <Multiselect
          v-model="sprints.value"
          v-bind="sprints"
          class="overwrite-style"
        ></Multiselect>
      </div>
      <div class="w-100 m-2">
        <Multiselect
          v-model="users.value"
          v-bind="users"
          class="overwrite-style"
        ></Multiselect>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "KanbanFilter",
  data() {
    return {
      projects: {
        mode: 'tags',
        value: [],
        closeOnSelect: false,
        options: [
          { value: 'all', label: 'Todos' },
          { value: 'batman', label: 'Batman' },
          { value: 'robin', label: 'Robin' },
          { value: 'joker', label: 'Joker' },
        ],
        searchable: true,
        createOption: true,
        placeholder: 'Selecione o projeto'
      },

      teams: {
        mode: 'tags',
        value: [],
        closeOnSelect: false,
        options: [
          { value: 'all', label: 'Todos' },
          { value: 'batman', label: 'Batman' },
          { value: 'robin', label: 'Robin' },
          { value: 'joker', label: 'Joker' },
        ],
        searchable: true,
        createOption: true,
        placeholder: 'Selecione a equipe'
      },

      sprints: {
        mode: 'tags',
        value: [],
        closeOnSelect: false,
        options: [
          { value: 'all', label: 'Todos' },
          { value: 'batman', label: 'Batman' },
          { value: 'robin', label: 'Robin' },
          { value: 'joker', label: 'Joker' },
        ],
        searchable: true,
        createOption: true,
        placeholder: 'Selecione a sprint'
      },

      users: {
        mode: 'tags',
        value: [],
        closeOnSelect: false,
        options: [
          { value: 'all', label: 'Todos' },
          { value: 'batman', label: 'Batman' },
          { value: 'robin', label: 'Robin' },
          { value: 'joker', label: 'Joker' },
        ],
        searchable: true,
        createOption: true,
        placeholder: 'Selecione o usuário'
      },

      
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>

.kanban-filter {
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
}
.form-control{
    font-size: 9pt;
}

.form-select{
    font-size: 9pt;
}

.overwrite-style{
  font-size: .75rem !important;
  --ms-tag-bg: rgb(255, 205, 86);
  --ms-tag-color: #fff;
}

</style>

