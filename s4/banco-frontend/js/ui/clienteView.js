const elCarregando = document.getElementById('estado-carregando');
const elErro = document.getElementById('estado-erro');
const elVazio = document.getElementById('estado-vazio');
const elSucesso = document.getElementById('estado-sucesso');
const tbody = document.getElementById('tabela-clientes');

const form = document.getElementById('form-cliente');
const tituloForm = document.getElementById('titulo-form');
const inputId = document.getElementById('cliente-id');
const inputNome = document.getElementById('nome');
const inputCpf = document.getElementById('cpf');
const inputEmail = document.getElementById('email');
const btnCancelar = document.getElementById('btn-cancelar');

function esconderTodosEstados() {
  elCarregando.classList.add('d-none');
  elErro.classList.add('d-none');
  elVazio.classList.add('d-none');
  elSucesso.classList.add('d-none');
}

export function exibirCarregando() {
  esconderTodosEstados();
  elCarregando.classList.remove('d-none');
}

export function exibirErro(mensagem) {
  esconderTodosEstados();
  elErro.textContent = mensagem;
  elErro.classList.remove('d-none');
}

export function renderizarClientes(clientes, { onEditar, onRemover }) {
  esconderTodosEstados();

  if (!clientes || clientes.length === 0) {
    elVazio.classList.remove('d-none');
    return;
  }

  tbody.textContent = '';

  clientes.forEach((cliente) => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = cliente.id;

    const tdNome = document.createElement('td');
    tdNome.textContent = cliente.nome;

    const tdCpf = document.createElement('td');
    tdCpf.textContent = cliente.cpf;

    const tdEmail = document.createElement('td');
    tdEmail.textContent = cliente.email;

    const tdAcoes = document.createElement('td');
    tdAcoes.className = 'text-end';

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'btn btn-sm btn-outline-secondary me-1';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => onEditar(cliente));

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn btn-sm btn-outline-danger';
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', () => onRemover(cliente.id));

    tdAcoes.append(btnEditar, btnRemover);
    tr.append(tdId, tdNome, tdCpf, tdEmail, tdAcoes);
    tbody.appendChild(tr);
  });

  elSucesso.classList.remove('d-none');
}

export function preencherFormulario(cliente) {
  tituloForm.textContent = `Editar Cliente #${cliente.id}`;
  inputId.value = cliente.id;
  inputNome.value = cliente.nome;
  inputCpf.value = cliente.cpf;
  inputEmail.value = cliente.email;
  btnCancelar.classList.remove('d-none');
}

export function limparFormulario() {
  form.reset();
  inputId.value = '';
  tituloForm.textContent = 'Novo Cliente';
  btnCancelar.classList.add('d-none');
}