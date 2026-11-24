import { requisicao } from '../api.js';

export function listarClientes() {
  return requisicao('/clientes');
}

export function criarCliente(dados) {
  return requisicao('/clientes', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export function atualizarCliente(id, dados) {
  return requisicao(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  });
}

export function removerCliente(id) {
  return requisicao(`/clientes/${id}`, {
    method: 'DELETE'
  });
}