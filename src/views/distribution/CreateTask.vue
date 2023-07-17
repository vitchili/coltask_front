<template>
  <div class="container-fluid">
    <div class="container">
      <!-- Title -->
      <div
        class="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row"
      >
        <h2 class="h5 mb-3 mb-lg-0">
          <a href="../../pages/admin/customers.html" class="text-muted"
            ><i class="bi bi-arrow-left-square me-2"></i
          ></a>
          Criar tarefa
        </h2>
        <div class="hstack gap-3">
          <router-link :to="'/tasks'">
            <button class="btn btn-secondary btn-sm btn-icon-text">
              <i class="bi bi-x"></i> <span class="text">Cancelar</span>
            </button>
          </router-link>
          <button class="btn btn-primary btn-sm btn-icon-text">
            <i class="bi bi-save"></i> <span class="text">Salvar</span>
          </button>
        </div>
      </div>

      <!-- Main content -->
      <div class="row">
        <!-- Left side -->
        <div class="col-lg-8">
          <!-- Envolved -->
          <div class="card mb-4">
            <div class="card">
              <div class="card-header">
                <div class="header-content">
                  <span>Envolvidos</span>
                </div>
              </div>
              <div class="card-body" style="padding: 15px">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label class="form-label">Solicitante</label>
                      <select class="form-select form-select-sm">
                        <option value="">Vitor Pimenta</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label class="form-label">Cliente</label>
                      <select class="form-select form-select-sm">
                        <option value="">Cliente 1</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label class="form-label">E-mails Cópia</label>
                      <input type="email" class="form-control form-control-sm" placeholder="Separe os e-mails por ;">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label class="form-label">Prazo</label>
                      <input type="datetime-local" class="form-control form-control-sm">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Task -->
          <div class="card mb-4">
            <div class="card">
              <div class="card-header">
                <div class="header-content">
                  <span>Dados da Tarefa</span>
                </div>
              </div>
              <div class="card-body" style="padding: 15px">
                <div class="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Título</label>
                    <input type="text" class="form-control form-control-sm">
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Descrição</label>
                    <textarea cols="30" rows="13" class="form-control form-control-sm"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right side -->
        <div class="col-lg-4">
          <!-- Sponser -->
          <div class="card mb-4">
            <div class="card">
              <div class="card-header">
                <div class="header-content">
                  <span>Time de solução</span>
                </div>
              </div>
              <div class="card-body" style="padding: 15px">
                <div class="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Setor</label>
                    <select class="form-select form-select-sm">
                      <option value="">Nenhum</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Responsável</label>
                    <select class="form-select form-select-sm">
                      <option value="">Nenhum</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- QA -->
          <div class="card mb-4">
            <div class="card">
              <div class="card-header">
                <div class="header-content">
                  <span>Análise de Qualidade</span>
                </div>
              </div>
              <div class="card-body" style="padding: 15px">
                <div class="col-lg-12">
                  <div class="mb-3">
                    <select class="form-select form-select-sm">
                      <option value="">Nenhum</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Category -->
          <div class="card mb-4">
            <div class="card">
              <div class="card-header">
                <div class="header-content">
                  <span>Categoria</span>
                </div>
              </div>
              <div class="card-body" style="padding: 15px">
                <div class="col-lg-12">
                  <div class="mb-3">
                    <label class="form-label">Tipo de tarefa</label>
                    <select class="form-select form-select-sm">
                      <option value="">Correção de bug</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Notification settings -->
          <div class="card mb-4">
            <div class="card">
              <div class="card-header">
                <div class="header-content">
                  <span>Notificações por e-mail a cada etapa</span>
                </div>
              </div>
              <div class="card-body" style="padding: 15px">
                <ul class="list-group list-group-flush mx-n2">
                  <li class="list-group-item px-0 d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                      <label class="form-label">Notificação para o solicitante</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch">
                    </div>
                  </li>
                  <li class="list-group-item px-0 d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                      <label class="form-label">Notificação para as cópias</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateTask",
  data() {
    return {};
  },
};
</script>


<style scoped>
.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem 1.5rem;
}

.card-header {
  background-color: #f6f6f6;
  border: 1px solid #cccccc;
}

label {
  font-size: .85rem;
}


</style>