const elCarregando = document.getElementById('prod-estado-carregando');
const elErro = document.getElementById('prod-estado-erro');
const elVazio = document.getElementById('prod-estado-vazio');
const elSucesso = document.getElementById('prod-estado-sucesso');
const tbody = document.getElementById('tabela-produtos');

const form = document.getElementById('form-produto');
const tituloForm = document.getElementById('prod-titulo-form');
const inputId = document.getElementById('produto-id');
const inputTitulo = document.getElementById('prod-titulo');
const inputPreco = document.getElementById('prod-preco');
const selectCondicao = document.getElementById('prod-condicao');
const selectCategoria = document.getElementById('prod-categoriaId');
const selectFiltroCategoria = document.getElementById('filtro-categoria');
const btnCancelar = document.getElementById('btn-cancelar-prod');

function esconderEstados() {
  elCarregando.classList.add('d-none');
  elErro.classList.add('d-none');
  elVazio.classList.add('d-none');
  elSucesso.classList.add('d-none');
}

export function exibirCarregandoProdutos() {
  esconderEstados();
  elCarregando.classList.remove('d-none');
}

export function exibirErroProdutos(mensagem) {
  esconderEstados();
  elErro.textContent = mensagem;
  elErro.classList.remove('d-none');
}

export function popularSelectsCategorias(categorias) {
  const valorAtualForm = selectCategoria.value;
  const valorAtualFiltro = selectFiltroCategoria.value;

  selectCategoria.textContent = '';
  const optPadrao = document.createElement('option');
  optPadrao.value = '';
  optPadrao.textContent = 'Selecione uma categoria...';
  selectCategoria.appendChild(optPadrao);

  selectFiltroCategoria.textContent = '';
  const optTodas = document.createElement('option');
  optTodas.value = '';
  optTodas.textContent = 'Todas as categorias';
  selectFiltroCategoria.appendChild(optTodas);

  categorias.forEach((cat) => {
    const optForm = document.createElement('option');
    optForm.value = cat.id;
    optForm.textContent = `${cat.id} — ${cat.nome}`;
    selectCategoria.appendChild(optForm);

    const optFiltro = document.createElement('option');
    optFiltro.value = cat.id;
    optFiltro.textContent = cat.nome;
    selectFiltroCategoria.appendChild(optFiltro);
  });

  if (valorAtualForm) selectCategoria.value = valorAtualForm;
  if (valorAtualFiltro) selectFiltroCategoria.value = valorAtualFiltro;
}

export function renderizarProdutos(produtos, categorias, { onEditar, onRemover }) {
  esconderEstados();

  if (!produtos || produtos.length === 0) {
    elVazio.classList.remove('d-none');
    return;
  }

  const mapaCategorias = new Map(categorias.map((c) => [c.id, c.nome]));
  tbody.textContent = '';

  produtos.forEach((prod) => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = prod.id;

    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = prod.titulo;

    const tdPreco = document.createElement('td');
    tdPreco.textContent = `R$ ${Number(prod.preco).toFixed(2).replace('.', ',')}`;

    const tdCondicao = document.createElement('td');
    tdCondicao.textContent = prod.condicao;

    const tdCategoria = document.createElement('td');
    tdCategoria.textContent = mapaCategorias.get(prod.categoriaId) || `ID #${prod.categoriaId}`;

    const tdAcoes = document.createElement('td');
    tdAcoes.className = 'text-end';

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'btn btn-sm btn-outline-secondary me-1';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => onEditar(prod));

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn btn-sm btn-outline-danger';
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', () => onRemover(prod.id));

    tdAcoes.append(btnEditar, btnRemover);
    tr.append(tdId, tdTitulo, tdPreco, tdCondicao, tdCategoria, tdAcoes);
    tbody.appendChild(tr);
  });

  elSucesso.classList.remove('d-none');
}

export function preencherFormularioProduto(prod) {
  tituloForm.textContent = `Editar Produto #${prod.id}`;
  inputId.value = prod.id;
  inputTitulo.value = prod.titulo;
  inputPreco.value = prod.preco;
  selectCondicao.value = prod.condicao;
  selectCategoria.value = prod.categoriaId;
  btnCancelar.classList.remove('d-none');
}

export function limparFormularioProduto() {
  form.reset();
  inputId.value = '';
  tituloForm.textContent = 'Novo Produto';
  btnCancelar.classList.add('d-none');
}