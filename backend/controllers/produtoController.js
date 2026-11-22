import * as produtoService from '../services/produtoService.js';

export function listar(req, res) {
  const categoriaId = req.query.categoriaId ? Number(req.query.categoriaId) : undefined;
  const produtos = produtoService.listar(categoriaId);
  res.json(produtos);
}

export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const produto = produtoService.buscarPorId(id);
  res.json(produto);
}

export function criar(req, res) {
  const novo = produtoService.criar(req.body);
  res.status(201).json(novo);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const atualizado = produtoService.atualizar(id, req.body);
  res.json(atualizado);
}

export function remover(req, res) {
  const id = Number(req.params.id);
  produtoService.remover(id);
  res.status(204).send();
}