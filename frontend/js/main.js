import * as categoriaService from './services/categoriaService.js';
import * as produtoService from './services/produtoService.js';
import { store } from './state/store.js';
import { mostrarAviso, limparAviso } from './ui/aviso.js';
import * as categoriaView from './ui/categoriaView.js';
import * as produtoView from './ui/produtoView.js';

const formCategoria = document.getElementById('form-categoria');
const btnCancelarCat = document.getElementById('btn-cancelar-cat');
const btnRecarregarCat = document.getElementById('btn-recarregar-cat');

const formProduto = document.getElementById('form-produto');
const btnCancelarProd = document.getElementById('btn-cancelar-prod');
const btnRecarregarProd = document.getElementById('btn-recarregar-prod');
const selectFiltroCategoria = document.getElementById('filtro-categoria');

async function carregarCategorias() {
  categoriaView.exibirCarregandoCategorias();
  try {
    store.categorias = await categoriaService.listarCategorias();
    categoriaView.renderizarCategorias(store.categorias, {
      onEditar: iniciarEdicaoCategoria,
      onRemover: excluirCategoria
    });
    produtoView.popularSelectsCategorias(store.categorias);
  } catch (erro) {
    categoriaView.exibirErroCategorias(`Falha ao carregar categorias: ${erro.message}`);
  }
}

function iniciarEdicaoCategoria(cat) {
  limparAviso();
  store.editandoCategoriaId = cat.id;
  categoriaView.preencherFormularioCategoria(cat);
}

function cancelarEdicaoCategoria() {
  store.editandoCategoriaId = null;
  categoriaView.limparFormularioCategoria();
}

async function excluirCategoria(id) {
  limparAviso();
  try {
    await categoriaService.removerCategoria(id);
    if (store.editandoCategoriaId === id) cancelarEdicaoCategoria();
    mostrarAviso('Categoria removida com sucesso.');
    await carregarCategorias();
    await carregarProdutos();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  }
}

formCategoria.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  limparAviso();

  const formData = new FormData(formCategoria);
  const dados = {
    nome: formData.get('nome').trim(),
    descricao: formData.get('descricao').trim()
  };

  try {
    if (store.editandoCategoriaId) {
      await categoriaService.atualizarCategoria(store.editandoCategoriaId, dados);
      mostrarAviso('Categoria atualizada com sucesso.');
    } else {
      await categoriaService.criarCategoria(dados);
      mostrarAviso('Categoria cadastrada com sucesso.');
    }
    cancelarEdicaoCategoria();
    await carregarCategorias();
    await carregarProdutos();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  }
});

btnCancelarCat.addEventListener('click', cancelarEdicaoCategoria);
btnRecarregarCat.addEventListener('click', carregarCategorias);

async function carregarProdutos() {
  produtoView.exibirCarregandoProdutos();
  try {
    store.produtos = await produtoService.listarProdutos(store.filtroCategoriaId);
    produtoView.renderizarProdutos(store.produtos, store.categorias, {
      onEditar: iniciarEdicaoProduto,
      onRemover: excluirProduto
    });
  } catch (erro) {
    produtoView.exibirErroProdutos(`Falha ao carregar produtos: ${erro.message}`);
  }
}

function iniciarEdicaoProduto(prod) {
  limparAviso();
  store.editandoProdutoId = prod.id;
  produtoView.preencherFormularioProduto(prod);
}

function cancelarEdicaoProduto() {
  store.editandoProdutoId = null;
  produtoView.limparFormularioProduto();
}

async function excluirProduto(id) {
  limparAviso();
  try {
    await produtoService.removerProduto(id);
    if (store.editandoProdutoId === id) cancelarEdicaoProduto();
    mostrarAviso('Produto removido com sucesso.');
    await carregarProdutos();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  }
}

formProduto.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  limparAviso();

  const formData = new FormData(formProduto);
  const precoRaw = formData.get('preco');
  const categoriaIdRaw = formData.get('categoriaId');

  const dados = {
    titulo: formData.get('titulo').trim(),
    preco: precoRaw !== '' ? Number(precoRaw) : undefined,
    condicao: formData.get('condicao'),
    categoriaId: categoriaIdRaw !== '' ? Number(categoriaIdRaw) : undefined
  };

  try {
    if (store.editandoProdutoId) {
      await produtoService.atualizarProduto(store.editandoProdutoId, dados);
      mostrarAviso('Produto atualizado com sucesso.');
    } else {
      await produtoService.criarProduto(dados);
      mostrarAviso('Produto cadastrado com sucesso.');
    }
    cancelarEdicaoProduto();
    await carregarProdutos();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  }
});

selectFiltroCategoria.addEventListener('change', async (evento) => {
  store.filtroCategoriaId = evento.target.value;
  await carregarProdutos();
});

btnCancelarProd.addEventListener('click', cancelarEdicaoProduto);
btnRecarregarProd.addEventListener('click', carregarProdutos);

await carregarCategorias();
await carregarProdutos();