import * as clienteModel from '../models/clienteModel.js';
import { criarErro } from '../utils/erro.js';
import * as contaModel from '../models/contaModel.js';

export function listar() {
  return clienteModel.listarTodos();
}

export function buscarPorId(id) {
  const cliente = clienteModel.buscarPorId(id);
  if (!cliente) throw criarErro(404, 'Cliente não encontrado.');
  return cliente;
}

export function criar({ nome, cpf, email }) {
  if (!nome || !cpf || !email) {
    throw criarErro(400, 'Nome, CPF e e-mail são obrigatórios.');
  }
  if (cpf.length !== 11) {
    throw criarErro(400, 'CPF deve conter 11 dígitos.');
  }
  if (clienteModel.buscarPorCpf(cpf)) {
    throw criarErro(409, 'Já existe um cliente cadastrado com este CPF.');
  }
  return clienteModel.criar({ nome, cpf, email });
}

export function atualizar(id, { nome, cpf, email }) {
  const existente = clienteModel.buscarPorId(id);
  if (!existente) throw criarErro(404, 'Cliente não encontrado.');

  if (cpf && cpf !== existente.cpf) {
    if (cpf.length !== 11) {
      throw criarErro(400, 'CPF deve conter 11 dígitos.');
    }
    if (clienteModel.buscarPorCpf(cpf)) {
      throw criarErro(409, 'Já existe um cliente cadastrado com este CPF.');
    }
  }

  return clienteModel.atualizar(id, {
    nome: nome ?? existente.nome,
    cpf: cpf ?? existente.cpf,
    email: email ?? existente.email
  });
}

export function remover(id) {
  const existente = clienteModel.buscarPorId(id);
  if (!existente) throw criarErro(404, 'Cliente não encontrado.');

  const contasDoCliente = contaModel.buscarPorClienteId(id);
  if (contasDoCliente.length > 0) {
    throw criarErro(409, 'Não é possível remover cliente que possui contas vinculadas.');
  }

  clienteModel.remover(id);
}