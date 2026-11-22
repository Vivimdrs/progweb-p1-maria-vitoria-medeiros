import * as categoriaModel from '../models/categoriaModel.js';
import { criarErro } from '../utils/erro.js';

export function listar() {
  return categoriaModel.listarTodas();
}

export function buscarPorId(id) {
  const categoria = categoriaModel.buscarPorId(id);
  if (!categoria) throw criarErro(404, 'Categoria não encontrada.');
  return categoria;
}

export function criar({ nome, descricao }) {
  if (!nome || !descricao) {
    throw criarErro(400, 'Nome e descrição da categoria são obrigatórios.');
  }
  if (categoriaModel.buscarPorNome(nome)) {
    throw criarErro(409, 'Já existe uma categoria cadastrada com este nome.');
  }
  return categoriaModel.criar({ nome: nome.trim(), descricao: descricao.trim() });
}

export function atualizar(id, { nome, descricao }) {
  const existente = categoriaModel.buscarPorId(id);
  if (!existente) throw criarErro(404, 'Categoria não encontrada.');

  if (nome && nome.trim().toLowerCase() !== existente.nome.toLowerCase()) {
    if (categoriaModel.buscarPorNome(nome)) {
      throw criarErro(409, 'Já existe uma categoria cadastrada com este nome.');
    }
  }

  return categoriaModel.atualizar(id, {
    nome: nome ? nome.trim() : existente.nome,
    descricao: descricao ? descricao.trim() : existente.descricao
  });
}

export function remover(id) {
  const removida = categoriaModel.remover(id);
  if (!removida) throw criarErro(404, 'Categoria não encontrada.');
}