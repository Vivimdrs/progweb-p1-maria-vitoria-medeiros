import * as contaModel from '../models/contaModel.js';
import * as clienteModel from '../models/clienteModel.js';
import { criarErro } from '../utils/erro.js';

export function listar() {
  return contaModel.listarTodas();
}

export function buscarPorId(id) {
  const conta = contaModel.buscarPorId(id);
  if (!conta) throw criarErro(404, 'Conta não encontrada.');
  return conta;
}

export function criar({ numero, tipo, saldo = 0, clienteId }) {
  if (!numero || !tipo || !clienteId) {
    throw criarErro(400, 'Número, tipo e clienteId são obrigatórios.');
  }
  const cliente = clienteModel.buscarPorId(Number(clienteId));
  if (!cliente) {
    throw criarErro(404, 'Cliente informado não existe.');
  }
  if (contaModel.buscarPorNumero(numero)) {
    throw criarErro(409, 'Já existe uma conta cadastrada com este número.');
  }
  return contaModel.criar({
    numero,
    tipo,
    saldo: Number(saldo),
    clienteId: Number(clienteId)
  });
}

export function remover(id) {
  const existente = contaModel.buscarPorId(id);
  if (!existente) throw criarErro(404, 'Conta não encontrada.');
  contaModel.remover(id);
}