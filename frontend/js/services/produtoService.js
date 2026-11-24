import { requisicao } from '../api.js';

export function listarProdutos(categoriaId = '') {
  const query = categoriaId ? `?categoriaId=${encodeURIComponent(categoriaId)}` : '';
  return requisicao(`/produtos${query}`);
}

export function criarProduto(dados) {
  return requisicao('/produtos', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export function atualizarProduto(id, dados) {
  return requisicao(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  });
}

export function removerProduto(id) {
  return requisicao(`/produtos/${id}`, {
    method: 'DELETE'
  });
}