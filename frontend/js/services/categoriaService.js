import { requisicao } from '../api.js';

export function listarCategorias() {
  return requisicao('/categorias');
}

export function criarCategoria(dados) {
  return requisicao('/categorias', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export function atualizarCategoria(id, dados) {
  return requisicao(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  });
}

export function removerCategoria(id) {
  return requisicao(`/categorias/${id}`, {
    method: 'DELETE'
  });
}