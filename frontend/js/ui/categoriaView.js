const elCarregando = document.getElementById('cat-estado-carregando');
const elErro = document.getElementById('cat-estado-erro');
const elVazio = document.getElementById('cat-estado-vazio');
const elSucesso = document.getElementById('cat-estado-sucesso');
const tbody = document.getElementById('tabela-categorias');

const form = document.getElementById('form-categoria');
const tituloForm = document.getElementById('cat-titulo-form');
const inputId = document.getElementById('categoria-id');
const inputNome = document.getElementById('cat-nome');
const inputDescricao = document.getElementById('cat-descricao');
const btnCancelar = document.getElementById('btn-cancelar-cat');

function esconderEstados() {
  elCarregando.classList.add('d-none');
  elErro.classList.add('d-none');
  elVazio.classList.add('d-none');
  elSucesso.classList.add('d-none');
}

export function exibirCarregandoCategorias() {
  esconderEstados();
  elCarregando.classList.remove('d-none');
}

export function exibirErroCategorias(mensagem) {
  esconderEstados();
  elErro.textContent = mensagem;
  elErro.classList.remove('d-none');
}

export function renderizarCategorias(categorias, { onEditar, onRemover }) {
  esconderEstados();

  if (!categorias || categorias.length === 0) {
    elVazio.classList.remove('d-none');
    return;
  }

  tbody.textContent = '';

  categorias.forEach((cat) => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = cat.id;

    const tdNome = document.createElement('td');
    tdNome.textContent = cat.nome;

    const tdDesc = document.createElement('td');
    tdDesc.textContent = cat.descricao;

    const tdAcoes = document.createElement('td');
    tdAcoes.className = 'text-end';

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'btn btn-sm btn-outline-secondary me-1';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => onEditar(cat));

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn btn-sm btn-outline-danger';
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', () => onRemover(cat.id));

    tdAcoes.append(btnEditar, btnRemover);
    tr.append(tdId, tdNome, tdDesc, tdAcoes);
    tbody.appendChild(tr);
  });

  elSucesso.classList.remove('d-none');
}

export function preencherFormularioCategoria(cat) {
  tituloForm.textContent = `Editar Categoria #${cat.id}`;
  inputId.value = cat.id;
  inputNome.value = cat.nome;
  inputDescricao.value = cat.descricao;
  btnCancelar.classList.remove('d-none');
}

export function limparFormularioCategoria() {
  form.reset();
  inputId.value = '';
  tituloForm.textContent = 'Nova Categoria';
  btnCancelar.classList.add('d-none');
}