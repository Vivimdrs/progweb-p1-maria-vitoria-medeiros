import * as produtoModel from '../models/produtoModel.js';
import * as categoriaModel from '../models/categoriaModel.js';
import { criarErro } from '../utils/erro.js';

const CONDICOES_VALIDAS = ['Novo', 'Usado - Excelente', 'Usado - Bom', 'Usado - Regular'];

export function listar(categoriaId) {
  return produtoModel.listarTodos(categoriaId);
}

export function buscarPorId(id) {
  const produto = produtoModel.buscarPorId(id);
  if (!produto) throw criarErro(404, 'Produto não encontrado.');
  return produto;
}

export function criar({ titulo, preco, condicao, categoriaId }) {
  if (!titulo || preco === undefined || !condicao || !categoriaId) {
    throw criarErro(400, 'Título, preço, condição e categoriaId são obrigatórios.');
  }
  if (typeof preco !== 'number' || preco <= 0) {
    throw criarErro(400, 'O preço do produto deve ser um número maior que zero.');
  }
  if (!CONDICOES_VALIDAS.includes(condicao)) {
    throw criarErro(400, `Condição inválida. Use: ${CONDICOES_VALIDAS.join(', ')}.`);
  }
  const categoria = categoriaModel.buscarPorId(Number(categoriaId));
  if (!categoria) {
    throw criarErro(422, 'A categoria informada (categoriaId) não existe.');
  }

  return produtoModel.criar({
    titulo: titulo.trim(),
    preco,
    condicao,
    categoriaId: Number(categoriaId)
  });
}

export function atualizar(id, { titulo, preco, condicao, categoriaId }) {
  const existente = produtoModel.buscarPorId(id);
  if (!existente) throw criarErro(404, 'Produto não encontrado.');

  if (preco !== undefined && (typeof preco !== 'number' || preco <= 0)) {
    throw criarErro(400, 'O preço do produto deve ser um número maior que zero.');
  }
  if (condicao && !CONDICOES_VALIDAS.includes(condicao)) {
    throw criarErro(400, `Condição inválida. Use: ${CONDICOES_VALIDAS.join(', ')}.`);
  }
  if (categoriaId !== undefined) {
    const categoria = categoriaModel.buscarPorId(Number(categoriaId));
    if (!categoria) {
      throw criarErro(422, 'A categoria informada (categoriaId) não existe.');
    }
  }

  return produtoModel.atualizar(id, {
    titulo: titulo ? titulo.trim() : existente.titulo,
    preco: preco ?? existente.preco,
    condicao: condicao ?? existente.condicao,
    categoriaId: categoriaId !== undefined ? Number(categoriaId) : existente.categoriaId
  });
}

export function remover(id) {
  const removido = produtoModel.remover(id);
  if (!removido) throw criarErro(404, 'Produto não encontrado.');
}